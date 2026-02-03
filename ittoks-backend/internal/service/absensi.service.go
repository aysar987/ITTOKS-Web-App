package service

import (
	"context"
	"time"

	"ittoks-backend/internal/domain"
	"ittoks-backend/internal/repository"
)

type AbsensiService struct {
	repo *repository.AbsensiRepository
}

func NewAbsensiService(r *repository.AbsensiRepository) *AbsensiService {
	return &AbsensiService{r}
}

func (s *AbsensiService) Create(ctx context.Context, a *domain.Absensi) error {
	a.CreatedAt = time.Now()
	return s.repo.Create(ctx, a)
}

func (s *AbsensiService) List(ctx context.Context, kelas, tanggal string) ([]domain.Absensi, error) {
	return s.repo.List(ctx, kelas, tanggal)
}

func (s *AbsensiService) Update(ctx context.Context, id, status string) error {
	return s.repo.Update(ctx, id, status)
}
