package repository

import (
	"context"
	"time"

	"ittoks-backend/internal/domain"

	"cloud.google.com/go/firestore"
)

type NilaiRepository interface {
	Create(ctx context.Context, nilai *domain.Nilai) error
	FindBySiswa(ctx context.Context, siswaID string) ([]domain.Nilai, error)
}

type nilaiFirestoreRepo struct {
	db *firestore.Client
}

func NewNilaiRepository(db *firestore.Client) NilaiRepository {
	return &nilaiFirestoreRepo{db}
}

func (r *nilaiFirestoreRepo) Create(ctx context.Context, nilai *domain.Nilai) error {
	nilai.CreatedAt = time.Now()
	_, _, err := r.db.Collection("nilai").Add(ctx, nilai)
	return err
}

func (r *nilaiFirestoreRepo) FindBySiswa(ctx context.Context, siswaID string) ([]domain.Nilai, error) {
	iter := r.db.Collection("nilai").
		Where("siswa_id", "==", siswaID).
		Documents(ctx)

	var result []domain.Nilai
	for {
		doc, err := iter.Next()
		if err != nil {
			break
		}
		var n domain.Nilai
		doc.DataTo(&n)
		n.ID = doc.Ref.ID
		result = append(result, n)
	}
	return result, nil
}
