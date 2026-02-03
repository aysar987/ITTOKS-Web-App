package service

import (
	"context"
	"errors"

	"ittoks-backend/internal/domain"
)

type AssessmentRepository interface {
	Create(ctx context.Context, studentID string, a *domain.Assessment) error
	ListByStudent(ctx context.Context, studentID string) ([]domain.Assessment, error)
	Update(ctx context.Context, studentID, assessmentID string, a *domain.Assessment) error
	Delete(ctx context.Context, studentID, assessmentID string) error
}

type AssessmentService struct {
	repo AssessmentRepository
}

func NewAssessmentService(repo AssessmentRepository) *AssessmentService {
	return &AssessmentService{repo: repo}
}

func (s *AssessmentService) Create(
	ctx context.Context,
	studentID string,
	a *domain.Assessment,
) error {

	if studentID == "" {
		return errors.New("student id required")
	}
	if a.Category == "" || a.Aspect == "" {
		return errors.New("invalid assessment data")
	}

	return s.repo.Create(ctx, studentID, a)
}
func (s *AssessmentService) ListByStudent(
	ctx context.Context,
	studentID string,
) ([]domain.Assessment, error) {

	if studentID == "" {
		return nil, errors.New("student id required")
	}

	return s.repo.ListByStudent(ctx, studentID)
}

func (s *AssessmentService) Update(
	ctx context.Context,
	studentID, assessmentID string,
	score float64,
) error {
	a := &domain.Assessment{
		Score: score,
	}
	return s.repo.Update(ctx, studentID, assessmentID, a)
}

func (s *AssessmentService) Delete(
	ctx context.Context,
	studentID, assessmentID string,
) error {
	return s.repo.Delete(ctx, studentID, assessmentID)
}
