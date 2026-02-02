package repository

import (
	"context"

	"ittoks-backend/internal/domain"

	"cloud.google.com/go/firestore"
)

type SiswaRepository struct {
	db *firestore.Client
}

func NewSiswaRepository(db *firestore.Client) *SiswaRepository {
	return &SiswaRepository{db: db}
}

func (r *SiswaRepository) Create(ctx context.Context, s *domain.Siswa) error {
	_, _, err := r.db.Collection("students").Add(ctx, s)
	return err
}

func (r *SiswaRepository) Find(ctx context.Context, kelas, tahun, semester string) ([]domain.Siswa, error) {
	q := r.db.Collection("students").Query

	if kelas != "" {
		q = q.Where("kelas_id", "==", kelas)
	}
	if tahun != "" {
		q = q.Where("tahun_ajar", "==", tahun)
	}
	if semester != "" {
		q = q.Where("semester", "==", semester)
	}

	docs, err := q.Documents(ctx).GetAll()
	if err != nil {
		return nil, err
	}

	var result []domain.Siswa
	for _, d := range docs {
		var s domain.Siswa
		d.DataTo(&s)
		s.ID = d.Ref.ID
		result = append(result, s)
	}

	return result, nil
}

func (r *SiswaRepository) Delete(ctx context.Context, id string) error {
	_, err := r.db.Collection("students").Doc(id).Delete(ctx)
	return err
}
