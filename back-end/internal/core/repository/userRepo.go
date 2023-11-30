package repository

import (
	"back-end/internal/core/model"
	"database/sql"
)

type UserRepository struct {
	DB *sql.DB
}

func NewUserRepository(db *sql.DB) *UserRepository {
	return &UserRepository{DB: db}
}

func (r *UserRepository) FindByUsername(username string) (model.User, error) {
	query := "SELECT id, username, password, role FROM user WHERE username = ?"
	user := model.User{}
	err := r.DB.QueryRow(query, username).Scan(&user.ID, &user.Username, &user.Password, &user.Role)
	if err != nil {
		return model.User{}, err
	}
	return user, nil
}

func (r *UserRepository) AddUser(user model.User) (int64, error) {
	query := "INSERT INTO user (username, password, role) VALUES (?, ?, ?)"
	result, err := r.DB.Exec(query, user.Username, user.Password, user.Role)
	if err != nil {
		return 0, err
	}
	id, _ := result.LastInsertId()
	return id, nil
}
