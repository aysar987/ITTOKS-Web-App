package domain

import "time"

type Siswa struct {
	ID        string    `json:"id" firestore:"-"`
	NIS       string    `json:"nis" firestore:"nis"`
	Nama      string    `json:"nama" firestore:"nama"`
	Gender    string    `json:"gender" firestore:"gender"`
	KelasID   string    `json:"kelas_id" firestore:"kelas_id"`
	TahunAjar string    `json:"tahun_ajar" firestore:"tahun_ajar"`
	Semester  string    `json:"semester" firestore:"semester"`
	CreatedAt time.Time `json:"created_at" firestore:"created_at"`
}
