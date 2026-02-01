package domain

type User struct {
	UID   string `json:"uid"`
	Email string `json:"email"`
	Role  string `json:"role"`
}
