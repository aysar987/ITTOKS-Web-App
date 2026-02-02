package repository

import (
	"context"
	"ittoks-backend/internal/domain"

	"cloud.google.com/go/firestore"
)

type SettingRepository struct {
	db *firestore.Client
}

func NewSettingRepository(db *firestore.Client) *SettingRepository {
	return &SettingRepository{db}
}

func (r *SettingRepository) SetAcademicYear(data domain.AcademicYear) error {
	_, err := r.db.Collection("academic_year").Doc(data.ID).Set(context.Background(), data)
	return err
}

func (r *SettingRepository) SetSemester(data domain.Semester) error {
	_, err := r.db.Collection("semester").Doc(data.ID).Set(context.Background(), data)
	return err
}

func (r *SettingRepository) SetGradingWeight(data domain.GradingWeight) error {
	_, err := r.db.Collection("grading_weight").Doc(data.ID).Set(context.Background(), data)
	return err
}
