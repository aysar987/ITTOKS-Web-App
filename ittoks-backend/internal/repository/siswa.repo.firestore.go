package repository

import (
	"context"

	"ittoks-backend/internal/domain"

	"cloud.google.com/go/firestore"
)

type SiswaFirestoreRepo struct {
	db *firestore.Client
}

func NewSiswaFirestoreRepo(db *firestore.Client) *SiswaFirestoreRepo {
	return &SiswaFirestoreRepo{db}
}

func (r *SiswaFirestoreRepo) Create(s domain.Siswa) error {
	_, err := r.db.Collection("siswa").Doc(s.ID).Set(context.Background(), s)
	return err
}

func (r *SiswaFirestoreRepo) FindAll() ([]domain.Siswa, error) {
	docs, err := r.db.Collection("siswa").Documents(context.Background()).GetAll()
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
