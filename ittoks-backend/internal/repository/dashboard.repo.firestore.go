package repository

import (
	"context"
	"sort"
	"time"

	"ittoks-backend/internal/domain"

	"cloud.google.com/go/firestore"
)

type DashboardRepository struct {
	db *firestore.Client
}

func NewDashboardRepository(db *firestore.Client) *DashboardRepository {
	return &DashboardRepository{db: db}
}

func (r *DashboardRepository) GetSummary(ctx context.Context) (*domain.DashboardSummary, error) {

	studentDocs, err := r.db.Collection("students").Documents(ctx).GetAll()
	if err != nil {
		return nil, err
	}
	totalStudents := len(studentDocs)

	classSet := make(map[string]bool)
	for _, d := range studentDocs {
		if kelas, ok := d.Data()["kelas_id"].(string); ok {
			classSet[kelas] = true
		}
	}
	totalClasses := len(classSet)

	nilaiDocs, err := r.db.Collection("nilai").Documents(ctx).GetAll()
	if err != nil {
		return nil, err
	}

	var totalScore float64
	var count int

	for _, d := range nilaiDocs {
		if score, ok := d.Data()["nilai"].(float64); ok {
			totalScore += score
			count++
		}
	}

	averageScore := 0.0
	if count > 0 {
		averageScore = totalScore / float64(count)
	}

	studentClass := make(map[string]string)
	for _, d := range studentDocs {
		if kelas, ok := d.Data()["kelas_id"].(string); ok {
			studentClass[d.Ref.ID] = kelas
		}
	}

	kelasScores := make(map[string][]float64)

	for _, d := range nilaiDocs {
		data := d.Data()

		siswaID, ok1 := data["siswa_id"].(string)
		score, ok2 := data["nilai"].(float64)
		if !ok1 || !ok2 {
			continue
		}

		kelasID := studentClass[siswaID]
		kelasScores[kelasID] = append(kelasScores[kelasID], score)
	}

	var classContribution []domain.ClassContribution
	for kelas, scores := range kelasScores {
		var sum float64
		for _, s := range scores {
			sum += s
		}

		classContribution = append(classContribution, domain.ClassContribution{
			KelasID:      kelas,
			AverageScore: sum / float64(len(scores)),
		})
	}

	studentInfo := make(map[string]struct {
		Nama    string
		KelasID string
	})

	for _, d := range studentDocs {
		data := d.Data()
		nama, _ := data["nama"].(string)
		kelas, _ := data["kelas_id"].(string)

		studentInfo[d.Ref.ID] = struct {
			Nama    string
			KelasID string
		}{
			Nama:    nama,
			KelasID: kelas,
		}
	}

	studentScores := make(map[string][]float64)

	for _, d := range nilaiDocs {
		data := d.Data()
		siswaID, ok1 := data["siswa_id"].(string)
		score, ok2 := data["nilai"].(float64)
		if !ok1 || !ok2 {
			continue
		}

		studentScores[siswaID] = append(studentScores[siswaID], score)
	}

	var ranking []domain.StudentRanking

	for siswaID, scores := range studentScores {
		var sum float64
		for _, s := range scores {
			sum += s
		}

		info := studentInfo[siswaID]

		ranking = append(ranking, domain.StudentRanking{
			SiswaID:      siswaID,
			Nama:         info.Nama,
			KelasID:      info.KelasID,
			AverageScore: sum / float64(len(scores)),
		})
	}

	sort.Slice(ranking, func(i, j int) bool {
		return ranking[i].AverageScore > ranking[j].AverageScore
	})

	return &domain.DashboardSummary{
		TotalStudents:     totalStudents,
		TotalClasses:      totalClasses,
		AverageScore:      averageScore,
		ClassContribution: classContribution,
		Ranking:           ranking,
		LastUpdated:       time.Now(),
	}, nil

}

func (r *DashboardRepository) GetCharts(
	ctx context.Context,
) (*domain.DashboardCharts, error) {

	// =============================
	// AVG SCORE PER CLASS (FIXED)
	// =============================

	// 1. ambil students → map siswa_id ke kelas_id
	studentDocs, err := r.db.Collection("students").Documents(ctx).GetAll()
	if err != nil {
		return nil, err
	}

	studentClass := make(map[string]string)
	for _, d := range studentDocs {
		if kelas, ok := d.Data()["kelas_id"].(string); ok {
			studentClass[d.Ref.ID] = kelas
		}
	}

	// 2. ambil nilai
	nilaiDocs, err := r.db.Collection("nilai").Documents(ctx).GetAll()
	if err != nil {
		return nil, err
	}

	type acc struct {
		sum   float64
		count int
	}

	classMap := map[string]*acc{}

	for _, d := range nilaiDocs {
		data := d.Data()

		siswaID, ok1 := data["siswa_id"].(string)
		nilai, ok2 := data["nilai"].(float64)
		kelas, ok3 := studentClass[siswaID]

		if !ok1 || !ok2 || !ok3 {
			continue
		}

		if _, ok := classMap[kelas]; !ok {
			classMap[kelas] = &acc{}
		}

		classMap[kelas].sum += nilai
		classMap[kelas].count++
	}

	var avgPerClass []domain.AvgScorePerClass
	for kelas, v := range classMap {
		if v.count == 0 {
			continue
		}
		avgPerClass = append(avgPerClass, domain.AvgScorePerClass{
			KelasID:      kelas,
			AverageScore: v.sum / float64(v.count),
		})
	}

	// =============================
	// ATTENDANCE SUMMARY
	// =============================
	absenDocs, err := r.db.Collection("absensi").Documents(ctx).GetAll()
	if err != nil {
		return nil, err
	}

	attendance := domain.AttendanceSummary{}

	for _, d := range absenDocs {
		if status, ok := d.Data()["status"].(string); ok {
			switch status {
			case "H":
				attendance.H++
			case "I":
				attendance.I++
			case "S":
				attendance.S++
			case "A":
				attendance.A++
			}
		}
	}

	return &domain.DashboardCharts{
		AvgScorePerClass:  avgPerClass,
		AttendanceSummary: attendance,
	}, nil
}
