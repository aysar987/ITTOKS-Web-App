package repository

import (
	"context"

	"cloud.google.com/go/firestore"
)

type DashboardRepository struct {
	db *firestore.Client
}

func NewDashboardRepository(db *firestore.Client) *DashboardRepository {
	return &DashboardRepository{db: db}
}

func (r *DashboardRepository) CountStudents(ctx context.Context) (int, error) {
	docs, err := r.db.Collection("students").Documents(ctx).GetAll()
	return len(docs), err
}

func (r *DashboardRepository) CountClasses(ctx context.Context) (int, error) {
	docs, err := r.db.Collection("classes").Documents(ctx).GetAll()
	return len(docs), err
}
