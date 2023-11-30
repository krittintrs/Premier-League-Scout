package services

import (
	"errors"
	"golang.org/x/crypto/bcrypt"

	"back-end/internal/core/model"
	"back-end/internal/core/ports"
)

type UserService struct {
	UserRepository ports.UserRepository
}

func NewUserService(userRepo ports.UserRepository) *UserService {
	return &UserService{UserRepository: userRepo}
}

// GetUserByUsername retrieves a user by their username
func (s *UserService) GetUserByUsername(username string) (model.User, error) {
	user, err := s.UserRepository.FindByUsername(username)
	if err != nil {
		return model.User{}, err
	}
	return user, nil
}

// RegisterUser registers a new user
func (s *UserService) RegisterUser(user *model.User) (int64, error) {
	// Hash the user's password before storing it
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		return 0, err
	}

	// Replace the plain text password with the hashed version
	user.Password = hashedPassword

	if user.Role == "" {
		user.Role = model.USER
	}

	return s.UserRepository.AddUser(*user)
}

func (s *UserService) AuthenticateUser(username string, password []byte) (model.User, error) {
	// Retrieve user from the database based on the username
	user, err := s.UserRepository.FindByUsername(username)
	if err != nil {
		return model.User{}, errors.New("User not found")
	}

	// Compare the provided password with the hashed password in the database
	err = bcrypt.CompareHashAndPassword(user.Password, []byte(password))
	if err != nil {
		return model.User{}, errors.New("Invalid password")
	}

	return user, nil
}
