package services

import (
	"errors"
	"golang.org/x/crypto/bcrypt"

	"back-end/internal/core/model"
	"back-end/internal/core/ports"
)

type userService struct {
	userRepository ports.UserRepository
}

func NewUserService(userRepo ports.UserRepository) *userService {
	return &userService{userRepository: userRepo}
}

// GetUserByUsername retrieves a user by their username
func (s *userService) GetUserByUsername(username string) (model.User, error) {
	user, err := s.userRepository.FindByUsername(username)
	if err != nil {
		return model.User{}, err
	}
	return user, nil
}

// RegisterUser registers a new user
func (s *userService) RegisterUser(user *model.User) (int64, error) {
	// Hash the user's password before storing it
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		return 0, err
	}

	// Replace the plain text password with the hashed version
	user.Password = string(hashedPassword)

	if user.Role == "" {
		user.Role = model.USER_ROLE
	}

	return s.userRepository.AddUser(*user)
}

func (s *userService) AuthenticateUser(username string, password string) (model.User, error) {
	// Retrieve user from the database based on the username
	user, err := s.userRepository.FindByUsername(username)
	if err != nil {
		return model.User{}, errors.New("User not found")
	}

	// Compare the provided password with the hashed password in the database
	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
	if err != nil {
		return model.User{}, errors.New("Invalid password")
	}

	return user, nil
}
