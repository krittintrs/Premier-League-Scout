package handlers

import (
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"net/http"

	"back-end/internal/core/model"
	"back-end/internal/core/ports"
)

// UserHandler handles HTTP requests related to users.
type UserHandler struct {
	UserService ports.UserService
}

// NewUserHandler creates a new instance of UserHandler.
func NewUserHandler(userService ports.UserService) *UserHandler {
	return &UserHandler{UserService: userService}
}

func (h *UserHandler) SetupUserRoutes(router *mux.Router) {
	router.HandleFunc("/user/{username}", h.GetUserByUsername).Methods("GET")
	router.HandleFunc("/signup", h.Signup).Methods("POST")
	router.HandleFunc("/login", h.Login).Methods("POST")
}

func (h *UserHandler) Signup(w http.ResponseWriter, r *http.Request) {
	var newUser model.User

	err := json.NewDecoder(r.Body).Decode(&newUser)
	if err != nil {
		fmt.Println("Error decoding JSON:", err)
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	_, err = h.UserService.RegisterUser(&newUser)
	if err != nil {
		http.Error(w, "Failed to register user", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
}

func (h *UserHandler) GetUserByUsername(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)

	username := vars["username"]
	if username == "" {
		http.Error(w, "Username parameter is required", http.StatusBadRequest)
		return
	}

	user, err := h.UserService.GetUserByUsername(username)
	if err != nil {
		http.Error(w, "User not found", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(user)
}

func (h *UserHandler) Login(w http.ResponseWriter, r *http.Request) {
	var credentials model.User

	if err := json.NewDecoder(r.Body).Decode(&credentials); err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	_, err := h.UserService.AuthenticateUser(credentials.Username, credentials.Password)
	if err != nil {
		http.Error(w, "Invalid username or password", http.StatusUnauthorized)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Login successful!"))
}
