package domain

type Absensi struct {
	ID      string `json:"id"`
	SiswaID string `json:"siswa_id"`
	Tanggal string `json:"tanggal"`
	Status  string `json:"status"`
	ClassID string `json:"class_id"`
}
