package domain

type Semester struct {
	ID       string `json:"id" firestore:"id"`
	Name     string `json:"name" firestore:"name"`
	IsActive bool   `json:"is_active" firestore:"is_active"`
}
