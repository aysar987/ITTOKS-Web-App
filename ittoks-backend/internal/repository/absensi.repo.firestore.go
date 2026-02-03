package repository

import (
	"context"

	"ittoks-backend/internal/domain"

	"cloud.google.com/go/firestore"
)

type AbsensiRepository struct {
	db *firestore.Client
}

func NewAbsensiRepository(db *firestore.Client) *AbsensiRepository {
	return &AbsensiRepository{db}
}

func (r *AbsensiRepository) Create(ctx context.Context, a *domain.Absensi) error {
	_, _, err := r.db.Collection("absensi").Add(ctx, a)
	return err
}

func (r *AbsensiRepository) List(ctx context.Context, kelas, tanggal string) ([]domain.Absensi, error) {
	q := r.db.Collection("absensi").Query

	if kelas != "" {
		q = q.Where("kelas_id", "==", kelas)
	}
	if tanggal != "" {
		q = q.Where("tanggal", "==", tanggal)
	}

	docs, err := q.Documents(ctx).GetAll()
	if err != nil {
		return nil, err
	}

	var result []domain.Absensi
	for _, d := range docs {
		var a domain.Absensi
		d.DataTo(&a)
		a.ID = d.Ref.ID
		result = append(result, a)
	}

	return result, nil
}

func (r *AbsensiRepository) Update(ctx context.Context, id, status string) error {
	_, err := r.db.Collection("absensi").Doc(id).Update(ctx, []firestore.Update{
		{Path: "status", Value: status},
	})
	return err
}
