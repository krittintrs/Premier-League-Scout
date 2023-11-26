package handlers

import (
	"back-end/internal/core/ports"
	// "database/sql"
	// "encoding/json"
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
)

type matchInfoHandler struct {
	router       *mux.Router
	matchInfoSrv ports.MatchInfoService
}

func NewMatchInfoHandler(matchInfoSrv ports.MatchInfoService) *matchInfoHandler {
	return &matchInfoHandler{
		router:       mux.NewRouter(),
		matchInfoSrv: matchInfoSrv,
	}
}

// Test

func (matchInfohdl *matchInfoHandler) SetupMatchInfoRoutes() {
	// matchInfohdl.router.HandleFunc("/", matchInfohdl.Welcome).Methods("GET")
	// matchInfohdl.router.HandleFunc("/fixtures/{gw}", matchInfohdl.GetFixtures).Methods("GET")
	// matchInfohdl.router.HandleFunc("/team/{id}", matchInfohdl.GetTeam).Methods("GET")
	// Add other route handling...
}

func (matchInfohdl *matchInfoHandler) PostMatchInfo(w http.ResponseWriter, r *http.Request) {
	// post match info
	vars := mux.Vars(r)
	id := vars["id"]
	fmt.Fprintf(w, "You've requested the match info: %s\n", id)
}

func (matchInfohdl *matchInfoHandler) GetMatchInfo(w http.ResponseWriter, r *http.Request) {
	// get match info
	vars := mux.Vars(r)
	id := vars["id"]
	fmt.Fprintf(w, "You've requested the match info: %s\n", id)
}

func (matchInfohdl *matchInfoHandler) UpdateMatchInfo(w http.ResponseWriter, r *http.Request) {
	// update match info
	vars := mux.Vars(r)
	id := vars["id"]
	fmt.Fprintf(w, "You've requested the match info: %s\n", id)
}
