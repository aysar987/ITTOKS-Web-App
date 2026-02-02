package domain

import "time"

type Nilai struct {
	ID        string    `json:"id" firestore:"-"`
	SiswaID   string    `json:"siswa_id" firestore:"siswa_id"`
	Jenis     string    `json:"jenis" firestore:"jenis"`
	Nilai     float64   `json:"nilai" firestore:"nilai"`
	Semester  string    `json:"semester" firestore:"semester"`
	TahunAjar string    `json:"tahun_ajar" firestore:"tahun_ajar"`
	CreatedAt time.Time `json:"created_at" firestore:"created_at"`
}
