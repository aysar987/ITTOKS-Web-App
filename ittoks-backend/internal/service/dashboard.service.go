package service

import (
	"context"

	"ittoks-backend/internal/domain"
)

type DashboardRepository interface {
	GetSummary(ctx context.Context) (*domain.DashboardSummary, error)
	GetCharts(ctx context.Context) (*domain.DashboardCharts, error)
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

func (s *DashboardService) GetCharts(ctx context.Context) (*domain.DashboardCharts, error) {
	return s.repo.GetCharts(ctx)
}
