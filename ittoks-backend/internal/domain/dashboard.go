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
