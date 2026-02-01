package service

import (
	"ittoks-backend/internal/domain"
	"ittoks-backend/internal/repository"
)

type SiswaService struct {
	repo repository.SiswaRepository
}

func NewSiswaService(r repository.SiswaRepository) *SiswaService {
	return &SiswaService{repo: r}
}

func (s *SiswaService) CreateSiswa(siswa domain.Siswa) error {
	return s.repo.Create(siswa)
}
