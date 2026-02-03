package repository

import (
	"context"
	"time"

	"ittoks-backend/internal/domain"

	"google.golang.org/api/iterator"

	"cloud.google.com/go/firestore"
)

type AssessmentFirestoreRepo struct {
	db *firestore.Client
}

func NewAssessmentRepo(db *firestore.Client) *AssessmentFirestoreRepo {
	return &AssessmentFirestoreRepo{db: db}
}

func (r *AssessmentFirestoreRepo) Create(
	ctx context.Context,
	studentID string,
	a *domain.Assessment,
) error {

	a.CreatedAt = time.Now()
	a.StudentID = studentID

	_, _, err := r.db.
		Collection("students").
		Doc(studentID).
		Collection("assessments").
		Add(ctx, a)

	return err
}
func (r *AssessmentFirestoreRepo) ListByStudent(
	ctx context.Context,
	studentID string,
) ([]domain.Assessment, error) {

	iter := r.db.
		Collection("students").
		Doc(studentID).
		Collection("assessments").
		OrderBy("created_at", firestore.Desc).
		Documents(ctx)

	defer iter.Stop()

	var result []domain.Assessment

	for {
		doc, err := iter.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return nil, err
		}

		var a domain.Assessment
		doc.DataTo(&a)
		a.ID = doc.Ref.ID

		result = append(result, a)
	}

	return result, nil
}

func (r *AssessmentFirestoreRepo) Update(
	ctx context.Context,
	studentID string,
	assessmentID string,
	a *domain.Assessment,
) error {
	a.UpdatedAt = time.Now()

	_, err := r.db.
		Collection("students").
		Doc(studentID).
		Collection("assessments").
		Doc(assessmentID).
		Set(ctx, a, firestore.MergeAll)

	return err
}

func (r *AssessmentFirestoreRepo) Delete(
	ctx context.Context,
	studentID, assessmentID string,
) error {
	_, err := r.db.
		Collection("students").
		Doc(studentID).
		Collection("assessments").
		Doc(assessmentID).
		Delete(ctx)

	return err
}
