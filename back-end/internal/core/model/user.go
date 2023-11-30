package model

import "errors"

type User struct {
	ID       int      `json:"id"`
	Username string   `json:"username"`
	Password []byte   `json:"password"`
	Role     UserRole `json:"role"`
}

type UserRole string

const (
	ADMIN UserRole = "Admin"
	USER  UserRole = "User"
)

func (r UserRole) IsValid() bool {
	switch r {
	case ADMIN, USER:
		return true
	default:
		return false
	}
}

func (u *User) Validate() error {
	if !u.Role.IsValid() {
		return errors.New("invalid user role")
	}
	return nil
}
