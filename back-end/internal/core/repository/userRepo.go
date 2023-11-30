package repository

import (
	mysql2 "back-end/database/mysql"
	"back-end/internal/core/model"
)

type UserRepository struct {
	masterDB *mysql2.MasterDB
}

func NewUserRepository(mdb *mysql2.MasterDB) *UserRepository {
	return &UserRepository{masterDB: mdb}
}

func (r *UserRepository) FindByUsername(username string) (model.User, error) {
	query := "SELECT id, username, password, role FROM user WHERE username = ?"
	user := model.User{}
	err := r.masterDB.DB.QueryRow(query, username).Scan(&user.ID, &user.Username, &user.Password, &user.Role)
	if err != nil {
		return model.User{}, err
	}
	return user, nil
}

func (r *UserRepository) AddUser(user model.User) (int64, error) {
	query := "INSERT INTO user (username, password, role) VALUES (?, ?, ?)"
	result, err := r.masterDB.DB.Exec(query, user.Username, user.Password, user.Role)
	if err != nil {
		return 0, err
	}
	id, _ := result.LastInsertId()
	return id, nil
}
