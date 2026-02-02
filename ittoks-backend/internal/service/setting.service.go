package service

import (
	"errors"
	"ittoks-backend/internal/domain"
	"ittoks-backend/internal/repository"
)

type SettingService struct {
	repo *repository.SettingRepository
}

func NewSettingService(r *repository.SettingRepository) *SettingService {
	return &SettingService{r}
}

func (s *SettingService) SetGradingWeight(w domain.GradingWeight) error {
	total := w.Kognitif + w.Afektif + w.Psikomotor
	if total != 100 {
		return errors.New("total weight must be 100")
	}
	return s.repo.SetGradingWeight(w)
}
