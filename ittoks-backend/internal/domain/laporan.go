package domain

type LaporanSiswa struct {
	SiswaID string `json:"siswa_id"`
	Nama    string `json:"nama"`
	KelasID string `json:"kelas_id"`

	AverageScore float64 `json:"average_score"`

	Hadir int `json:"hadir"`
	Alpha int `json:"alpha"`
	Izin  int `json:"izin"`
	Sakit int `json:"sakit"`

	PersentaseHadir float64 `json:"persentase_hadir"`
}
