package service

import (
	"ittoks-backend/internal/domain"
	"ittoks-backend/internal/repository"
)

type NilaiService struct {
	repo repository.NilaiRepository
}

func NewNilaiService(r repository.NilaiRepository) *NilaiService {
	return &NilaiService{repo: r}
}

func (s *NilaiService) CreateNilai(n domain.Nilai) error {
	return s.repo.Create(n)
}
