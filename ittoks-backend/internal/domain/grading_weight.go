package domain

type GradingWeight struct {
	ID         string  `json:"id" firestore:"id"`
	Kognitif   float64 `json:"kognitif" firestore:"kognitif"`
	Afektif    float64 `json:"afektif" firestore:"afektif"`
	Psikomotor float64 `json:"psikomotor" firestore:"psikomotor"`
}
