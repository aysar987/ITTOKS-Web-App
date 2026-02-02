package domain

type Nilai struct {
	ID      string `json:"id" firestore:"id"`
	SiswaID string `json:"siswa_id" firestore:"siswa_id"`
	Mapel   string `json:"mapel" firestore:"mapel"`
	Nilai   int    `json:"nilai" firestore:"nilai"`
}
