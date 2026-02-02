package domain

type Predicate struct {
	ID       string `json:"id" firestore:"id"`
	MinScore int    `json:"min_score" firestore:"min_score"`
	MaxScore int    `json:"max_score" firestore:"max_score"`
	Label    string `json:"label" firestore:"label"` // A, B, C
}
