package domain

type DashboardSummary struct {
	TotalStudents int                 `json:"total_students"`
	TotalClasses  int                 `json:"total_classes"`
	AverageScore  float64             `json:"average_score"`
	ClassStats    []ClassContribution `json:"class_contribution"`
	LastUpdated   string              `json:"last_updated"`
}

type ClassContribution struct {
	ClassName string `json:"class_name"`
	Count     int    `json:"count"`
}
