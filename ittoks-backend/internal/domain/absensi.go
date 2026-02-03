package domain

import "time"

type Absensi struct {
	ID        string    `json:"id" firestore:"-"`
	SiswaID   string    `json:"siswa_id" firestore:"siswa_id"`
	KelasID   string    `json:"kelas_id" firestore:"kelas_id"`
	Tanggal   string    `json:"tanggal" firestore:"tanggal"`
	Status    string    `json:"status" firestore:"status"`
	CreatedAt time.Time `json:"created_at" firestore:"created_at"`
}
