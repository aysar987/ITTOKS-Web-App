package repository

import (
	"context"

	"ittoks-backend/internal/domain"

	"cloud.google.com/go/firestore"
	"google.golang.org/api/iterator"
)

type SiswaFirestoreRepo struct {
	db *firestore.Client
}

func NewSiswaFirestoreRepo(db *firestore.Client) *SiswaFirestoreRepo {
	return &SiswaFirestoreRepo{db: db}
}

/* ================= CREATE ================= */

func (r *SiswaFirestoreRepo) Create(
	ctx context.Context,
	s *domain.Siswa,
) error {
	_, _, err := r.db.Collection("students").Add(ctx, s)
	return err
}

/* ================= LIST ================= */

func (r *SiswaFirestoreRepo) List(
	ctx context.Context,
	kelasID, tahunAjar, semester string,
) ([]domain.Siswa, error) {

	query := r.db.Collection("students").Query

	if kelasID != "" {
		query = query.Where("kelas_id", "==", kelasID)
	}
	if tahunAjar != "" {
		query = query.Where("tahun_ajar", "==", tahunAjar)
	}
	if semester != "" {
		query = query.Where("semester", "==", semester)
	}

	iter := query.Documents(ctx)
	defer iter.Stop()

	var result []domain.Siswa
	for {
		doc, err := iter.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return nil, err
		}

		var s domain.Siswa
		if err := doc.DataTo(&s); err != nil {
			return nil, err
		}
		s.ID = doc.Ref.ID
		result = append(result, s)
	}

	return result, nil
}

/* ================= DELETE ================= */

func (r *SiswaFirestoreRepo) Delete(
	ctx context.Context,
	id string,
) error {
	_, err := r.db.Collection("students").Doc(id).Delete(ctx)
	return err
}

func (r *SiswaFirestoreRepo) Update(
	ctx context.Context,
	id string,
	input map[string]interface{},
) error {

	_, err := r.db.
		Collection("students").
		Doc(id).
		Set(ctx, input, firestore.MergeAll)

	return err
}
