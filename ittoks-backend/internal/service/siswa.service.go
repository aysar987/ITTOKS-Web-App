package service

import (
	"context"
	"errors"
	"time"

	"ittoks-backend/internal/domain"
)

/* ================= INTERFACE ================= */

type SiswaRepository interface {
	Create(ctx context.Context, s *domain.Siswa) error
	List(ctx context.Context, kelasID, tahunAjar, semester string) ([]domain.Siswa, error)
	Delete(ctx context.Context, id string) error
	Update(ctx context.Context, id string, input map[string]interface{}) error
}

/* ================= SERVICE ================= */

type SiswaService struct {
	repo SiswaRepository
}

func NewSiswaService(repo SiswaRepository) *SiswaService {
	return &SiswaService{repo: repo}
}

/* ================= METHODS ================= */

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
	if id == "" {
		return errors.New("id is required")
	}
	return s.repo.Delete(ctx, id)
}

func (s *SiswaService) Update(
	ctx context.Context,
	id string,
	input map[string]interface{},
) error {
	input["updated_at"] = time.Now()
	return s.repo.Update(ctx, id, input)
}
