package domain

type Class struct {
	ID   string `json:"id" firestore:"id"`
	Name string `json:"name" firestore:"name"` // X IPA 1
}
