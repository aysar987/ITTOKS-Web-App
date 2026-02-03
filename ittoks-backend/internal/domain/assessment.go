package domain

import "time"

type Assessment struct {
	ID        string    `json:"id" firestore:"-"`
	StudentID string    `json:"student_id" firestore:"student_id"`
	Category  string    `json:"category" firestore:"category"` // kognitif|afektif|psikomotor
	Aspect    string    `json:"aspect" firestore:"aspect"`
	Type      string    `json:"type" firestore:"type"`
	Score     float64   `json:"score" firestore:"score"`
	CreatedAt time.Time `json:"created_at" firestore:"created_at"`
	UpdatedAt time.Time `json:"updated_at" firestore:"updated_at"`
}
