package config

import (
	"context"
	"encoding/json"
	"os"
	"strings"

	firebase "firebase.google.com/go"
	"google.golang.org/api/option"
)

var FirebaseApp *firebase.App

type firebaseCred struct {
	Type        string `json:"type"`
	ProjectID   string `json:"project_id"`
	PrivateKey  string `json:"private_key"`
	ClientEmail string `json:"client_email"`
}

func InitFirebase() error {
	privateKey := strings.ReplaceAll(
		os.Getenv("FIREBASE_PRIVATE_KEY"),
		"\\n",
		"\n",
	)

	cred := firebaseCred{
		Type:        "service_account",
		ProjectID:   os.Getenv("FIREBASE_PROJECT_ID"),
		PrivateKey:  privateKey,
		ClientEmail: os.Getenv("FIREBASE_CLIENT_EMAIL"),
	}

	b, err := json.Marshal(cred)
	if err != nil {
		return err
	}

	opt := option.WithCredentialsJSON(b)

	app, err := firebase.NewApp(context.Background(), nil, opt)
	if err != nil {
		return err
	}

	FirebaseApp = app
	return nil
}
