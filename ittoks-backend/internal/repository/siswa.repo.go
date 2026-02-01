package repository

import "ittoks-backend/internal/domain"

type SiswaRepository interface {
	Create(siswa domain.Siswa) error
	FindAll() ([]domain.Siswa, error)
}
