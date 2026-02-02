package service

import (
	"context"
	"time"

	"ittoks-backend/internal/domain"
	"ittoks-backend/internal/repository"
)

type DashboardService struct {
	repo *repository.DashboardRepository
}

func NewDashboardService(repo *repository.DashboardRepository) *DashboardService {
	return &DashboardService{repo: repo}
}

func (s *DashboardService) GetSummary(ctx context.Context) (*domain.DashboardSummary, error) {
	students, err := s.repo.CountStudents(ctx)
	if err != nil {
		return nil, err
	}

	classes, err := s.repo.CountClasses(ctx)
	if err != nil {
		return nil, err
	}

	return &domain.DashboardSummary{
		TotalStudents: students,
		TotalClasses:  classes,
		AverageScore:  0, // nanti isi
		ClassStats:    []domain.ClassContribution{},
		LastUpdated:   time.Now().Format(time.RFC3339),
	}, nil
}
