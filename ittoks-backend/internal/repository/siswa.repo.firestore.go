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
	return &SiswaFirestoreRepo{db}
}

func (r *SiswaFirestoreRepo) Create(s domain.Siswa) error {
	_, err := r.db.Collection("students").Doc(s.ID).Set(context.Background(), s)
	return err
}

func (r *SiswaFirestoreRepo) FindAll() ([]domain.Siswa, error) {
	docs, err := r.db.Collection("students").Documents(context.Background()).GetAll()
	if err != nil {
		return nil, err
	}

	var result []domain.Siswa
	for _, d := range docs {
		var s domain.Siswa
		d.DataTo(&s)
		result = append(result, s)
	}
	return result, nil
}

func (r *SiswaRepository) List(
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
		doc.DataTo(&s)
		s.ID = doc.Ref.ID
		result = append(result, s)
	}

	return result, nil
}
