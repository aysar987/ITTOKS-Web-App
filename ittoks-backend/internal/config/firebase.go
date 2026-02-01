package config

import (
	"context"
	"os"
	"strings"

	firebase "firebase.google.com/go"
	"google.golang.org/api/option"
)

var FirebaseApp *firebase.App

func InitFirebase() error {
	privateKey := strings.ReplaceAll(
		os.Getenv("FIREBASE_PRIVATE_KEY"),
		"\\n",
		"\n",
	)

	opt := option.WithCredentialsJSON([]byte(`{
		"type": "service_account",
		"project_id": "` + os.Getenv("FIREBASE_PROJECT_ID") + `",
		"private_key": "` + privateKey + `",
		"client_email": "` + os.Getenv("FIREBASE_CLIENT_EMAIL") + `"
	}`))

	app, err := firebase.NewApp(context.Background(), nil, opt)
	if err != nil {
		return err
	}

	FirebaseApp = app
	return nil
}
