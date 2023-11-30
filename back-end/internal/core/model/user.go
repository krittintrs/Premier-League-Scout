package model

import "errors"

type User struct {
	ID       int      `json:"id"`
	Username string   `json:"username"`
	Password string   `json:"password"`
	Role     UserRole `json:"role"`
}

type UserRole string

const (
	ADMIN_ROLE UserRole = "admin"
	USER_ROLE  UserRole = "user"
)

func (r UserRole) IsValid() bool {
	switch r {
	case ADMIN_ROLE, USER_ROLE:
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
