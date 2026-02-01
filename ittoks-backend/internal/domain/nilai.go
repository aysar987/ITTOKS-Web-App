package domain

type Nilai struct {
	ID      string `json:"id"`
	SiswaID string `json:"siswa_id"`
	Mapel   string `json:"mapel"`
	Nilai   int    `json:"nilai"`
}
