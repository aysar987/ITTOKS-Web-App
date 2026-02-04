package repository

import (
	"context"

	"ittoks-backend/internal/domain"

	"cloud.google.com/go/firestore"
)

type LaporanRepository struct {
	db *firestore.Client
}

func NewLaporanRepository(db *firestore.Client) *LaporanRepository {
	return &LaporanRepository{db}
}

func (r *LaporanRepository) GetRekap(
	ctx context.Context,
	kelas, tahun, semester string,
) ([]domain.LaporanSiswa, error) {

	siswaQ := r.db.Collection("students").Query
	if kelas != "" {
		siswaQ = siswaQ.Where("kelas_id", "==", kelas)
	}

	siswaDocs, err := siswaQ.Documents(ctx).GetAll()
	if err != nil {
		return nil, err
	}

	type siswaInfo struct {
		Nama  string
		Kelas string
	}
	siswaMap := map[string]siswaInfo{}
	for _, d := range siswaDocs {
		data := d.Data()
		siswaMap[d.Ref.ID] = siswaInfo{
			Nama:  data["nama"].(string),
			Kelas: data["kelas_id"].(string),
		}
	}

	nilaiDocs, _ := r.db.Collection("nilai").Documents(ctx).GetAll()
	nilaiMap := map[string][]float64{}
	for _, d := range nilaiDocs {
		data := d.Data()
		sid, ok1 := data["siswa_id"].(string)
		n, ok2 := data["nilai"].(float64)
		if ok1 && ok2 {
			nilaiMap[sid] = append(nilaiMap[sid], n)
		}
	}

	absenDocs, _ := r.db.Collection("absensi").Documents(ctx).GetAll()
	type absenCount struct{ H, A, I, S int }
	absenMap := map[string]*absenCount{}
	for _, d := range absenDocs {
		data := d.Data()
		sid, ok := data["siswa_id"].(string)
		if !ok {
			continue
		}
		if absenMap[sid] == nil {
			absenMap[sid] = &absenCount{}
		}
		switch data["status"] {
		case "H":
			absenMap[sid].H++
		case "A":
			absenMap[sid].A++
		case "I":
			absenMap[sid].I++
		case "S":
			absenMap[sid].S++
		}
	}

	var result []domain.LaporanSiswa
	for sid, info := range siswaMap {
		var avg float64
		if scores := nilaiMap[sid]; len(scores) > 0 {
			var sum float64
			for _, v := range scores {
				sum += v
			}
			avg = sum / float64(len(scores))
		}

		ac := absenMap[sid]
		if ac == nil {
			ac = &absenCount{}
		}

		result = append(result, domain.LaporanSiswa{
			SiswaID:      sid,
			Nama:         info.Nama,
			KelasID:      info.Kelas,
			AverageScore: avg,
			Hadir:        ac.H,
			Alpha:        ac.A,
			Izin:         ac.I,
			Sakit:        ac.S,
		})
	}

	return result, nil
}
