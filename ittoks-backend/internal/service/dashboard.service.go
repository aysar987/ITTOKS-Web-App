package service

import (
	"context"

	"ittoks-backend/internal/domain"
)

type DashboardRepository interface {
	GetSummary(ctx context.Context) (*domain.DashboardSummary, error)
}

type DashboardService struct {
	repo DashboardRepository
}

func NewDashboardService(repo DashboardRepository) *DashboardService {
	return &DashboardService{repo: repo}
}

func (s *DashboardService) GetSummary(ctx context.Context) (*domain.DashboardSummary, error) {
	return s.repo.GetSummary(ctx)
}
