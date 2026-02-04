package domain

import "time"

type DashboardSummary struct {
	TotalStudents     int                 `json:"total_students"`
	TotalClasses      int                 `json:"total_classes"`
	AverageScore      float64             `json:"average_score"`
	ClassContribution []ClassContribution `json:"class_contribution"`
	LastUpdated       time.Time           `json:"last_updated"`
	Ranking           []StudentRanking    `json:"ranking"`
}

type ClassContribution struct {
	KelasID      string  `json:"kelas_id"`
	AverageScore float64 `json:"average_score"`
}

type StudentRanking struct {
	SiswaID      string  `json:"siswa_id"`
	Nama         string  `json:"nama"`
	KelasID      string  `json:"kelas_id"`
	AverageScore float64 `json:"average_score"`
}
type ChartData struct {
	Label string  `json:"label"`
	Value float64 `json:"value"`
}

type AvgScorePerClass struct {
	KelasID      string  `json:"kelas_id"`
	AverageScore float64 `json:"average_score"`
}

type AttendanceSummary struct {
	H int `json:"H"`
	I int `json:"I"`
	S int `json:"S"`
	A int `json:"A"`
}

type DashboardCharts struct {
	AvgScorePerClass  []AvgScorePerClass `json:"avg_score_per_class"`
	AttendanceSummary AttendanceSummary  `json:"attendance_summary"`
}
