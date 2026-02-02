package domain

type AcademicYear struct {
	ID       string `json:"id" firestore:"id"`
	Name     string `json:"name" firestore:"name"`
	IsActive bool   `json:"is_active" firestore:"is_active"`
}
