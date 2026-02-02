package service

import (
	"context"
	"time"

	"ittoks-backend/internal/domain"
	"ittoks-backend/internal/repository"
)

type SiswaService struct {
	repo *repository.SiswaRepository
}

func NewSiswaService(repo *repository.SiswaRepository) *SiswaService {
	return &SiswaService{repo: repo}
}

func (s *SiswaService) Create(ctx context.Context, siswa *domain.Siswa) error {
	siswa.CreatedAt = time.Now()
	return s.repo.Create(ctx, siswa)
}

func (s *SiswaService) List(
	ctx context.Context,
	kelasID, tahunAjar, semester string,
) ([]domain.Siswa, error) {
	return s.repo.List(ctx, kelasID, tahunAjar, semester)
}

func (s *SiswaService) Delete(ctx context.Context, id string) error {
	return s.repo.Delete(ctx, id)
}
