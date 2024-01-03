package handlers

import (
	"back-end/internal/core/ports"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
)

type playerHandler struct {
	playerSrv ports.PlayerService
}

func NewPlayerHandler(playerSrv ports.PlayerService) *playerHandler {
	return &playerHandler{
		playerSrv: playerSrv,
	}
}

func (playerhdl *playerHandler) SetupPlayerRoutes(router *mux.Router) {
	// Use a consistent trailing slash for paths
	router.HandleFunc("/player/{id}", playerhdl.GetPlayerByID).Methods("GET")
	router.HandleFunc("/player/team/{teamID}", playerhdl.GetPlayerByTeamID).Methods("GET")
	router.HandleFunc("/player", playerhdl.PostPlayer).Methods("POST")
}

func (playerhdl *playerHandler) GetPlayerByID(w http.ResponseWriter, r *http.Request) {
	// get player info
	w.Header().Set("Content-Type", "application/json")
	vars := mux.Vars(r)
	id := vars["id"]

	player, err := playerhdl.playerSrv.GetPlayerByID(id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	json.NewEncoder(w).Encode(player)
}

func (playerhdl *playerHandler) GetPlayerByTeamID(w http.ResponseWriter, r *http.Request) {
	// get player info
	w.Header().Set("Content-Type", "application/json")
	vars := mux.Vars(r)
	TeamID := vars["teamID"]

	player, err := playerhdl.playerSrv.GetPlayerByTeamID(TeamID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	json.NewEncoder(w).Encode(player)
}

func (playerhdl *playerHandler) UpdatePlayer(w http.ResponseWriter, r *http.Request) {
	// update player info
	vars := mux.Vars(r)
	id := vars["id"]
	fmt.Fprintf(w, "You've requested the player info: %s\n", id)
}

func (playerhdl *playerHandler) PostPlayer(w http.ResponseWriter, r *http.Request) {
	// post player info
	vars := mux.Vars(r)
	id := vars["id"]
	fmt.Fprintf(w, "You've requested the player info: %s\n", id)
}
