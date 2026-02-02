package domain

type Siswa struct {
	ID    string `json:"id" firestore:"id"`
	Nama  string `json:"nama" firestore:"nama"`
	Kelas string `json:"kelas" firestore:"kelas"`
}
