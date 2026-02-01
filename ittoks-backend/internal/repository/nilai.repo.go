package repository

import "ittoks-backend/internal/domain"

type NilaiRepository interface {
	Create(nilai domain.Nilai) error
	FindBySiswaID(siswaID string) ([]domain.Nilai, error)
}
