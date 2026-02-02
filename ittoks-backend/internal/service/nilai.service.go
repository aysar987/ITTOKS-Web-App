package service

import (
	"context"
	"errors"

	"ittoks-backend/internal/domain"
	"ittoks-backend/internal/repository"
)

type NilaiService interface {
	Create(ctx context.Context, nilai *domain.Nilai) error
	GetBySiswa(ctx context.Context, siswaID string) ([]domain.Nilai, error)
}

type nilaiService struct {
	repo repository.NilaiRepository
}

func NewNilaiService(r repository.NilaiRepository) NilaiService {
	return &nilaiService{r}
}

func (s *nilaiService) Create(ctx context.Context, nilai *domain.Nilai) error {
	if nilai.Nilai < 0 || nilai.Nilai > 100 {
		return errors.New("nilai harus antara 0–100")
	}
	return s.repo.Create(ctx, nilai)
}

func (s *nilaiService) GetBySiswa(ctx context.Context, siswaID string) ([]domain.Nilai, error) {
	return s.repo.FindBySiswa(ctx, siswaID)
}
