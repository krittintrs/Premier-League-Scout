package handlers

import (
	"back-end/internal/core/ports"
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

type teamHandler struct {
	teamsrv ports.TeamService
}

func NewTeamHandler(teamsrv ports.TeamService) *teamHandler {
	return &teamHandler{
		teamsrv: teamsrv,
	}
}

func (httphdl *teamHandler) SetupTeamRoutes(router *mux.Router) {
	// Use a consistent trailing slash for paths
	router.HandleFunc("/", httphdl.Welcome).Methods("GET")
	router.HandleFunc("/fixtures/{gw}", httphdl.GetFixtures).Methods("GET")
	router.HandleFunc("/team/{id}", httphdl.GetTeamByID).Methods("GET")
	// Add other route handling...

	// If there are more routes related to teams, you can register them here.
}

func (httphdl *teamHandler) Welcome(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "Welcome to this page.")
}

func (httphdl *teamHandler) GetTeamByID(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)

	idStr, ok := params["id"]
	if !ok {
		http.Error(w, "id parameter missing", http.StatusBadRequest)
		return
	}

	id, err := strconv.Atoi(idStr)
	if err != nil {
		http.Error(w, "invalid id parameter", http.StatusBadRequest)
		return
	}

	team, err := httphdl.teamsrv.GetTeamByID(id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	json.NewEncoder(w).Encode(team)
}

func (httphdl *teamHandler) GetFixtures(w http.ResponseWriter, r *http.Request) {
	// get all fixtures for a given gameweek
	vars := mux.Vars(r)
	gw := vars["gw"]
	db, err := sql.Open("mysql", "root:root@tcp(localhost:3306)/eplscout")
	if err != nil {
		panic(err.Error())
	}
	defer db.Close()

	fmt.Fprintf(w, "You've requested the gameweek: %s\n", gw)
}

func (httphdl *teamHandler) GetPlayers(w http.ResponseWriter, r *http.Request) {
	// get player available for a given gameweek
	vars := mux.Vars(r)
	teamId := vars["teamId"]
	fmt.Fprintf(w, "You've requested the team: %s\n", teamId)
}

func (httphdl *teamHandler) PostLineup(w http.ResponseWriter, r *http.Request) {
	// post player for each game lineup
	vars := mux.Vars(r)
	gw := vars["gw"]
	teamId := vars["teamId"]
	fmt.Fprintf(w, "You've requested the gameweek: %s\n", gw)
	fmt.Fprintf(w, "You've requested the team: %s\n", teamId)
}

func (httphdl *teamHandler) GetLineup(w http.ResponseWriter, r *http.Request) {
	// get player for each game lineup
	vars := mux.Vars(r)
	gw := vars["gw"]
	teamId := vars["teamId"]
	fmt.Fprintf(w, "You've requested the gameweek: %s\n", gw)
	fmt.Fprintf(w, "You've requested the team: %s\n", teamId)
}

func (httphdl *teamHandler) GetMatchEvents(w http.ResponseWriter, r *http.Request) {
	// get match events
	vars := mux.Vars(r)

	matchinfoId := vars["matchinfoId"]
	fmt.Fprintf(w, "You've requested the match info: %s\n", matchinfoId)
}

func (httphdl *teamHandler) PostMatchEvents(w http.ResponseWriter, r *http.Request) {
	// post match events
	vars := mux.Vars(r)
	matchinfoId := vars["matchinfoId"]
	fmt.Fprintf(w, "You've requested the match info: %s\n", matchinfoId)
}

func (httphdl *teamHandler) UpdateMatchEvents(w http.ResponseWriter, r *http.Request) {
	// update match events
	vars := mux.Vars(r)
	matchinfoId := vars["matchinfoId"]
	matcheventId := vars["matcheventId"]
	fmt.Fprintf(w, "You've requested the match info: %s\n", matchinfoId)
	fmt.Fprintf(w, "You've requested the match event: %s\n", matcheventId)
}

func (httphdl *teamHandler) DeleteMatchEvents(w http.ResponseWriter, r *http.Request) {
	// delete match events
	vars := mux.Vars(r)
	matchinfoId := vars["matchinfoId"]
	matcheventId := vars["matcheventId"]
	fmt.Fprintf(w, "You've requested the match info: %s\n", matchinfoId)
	fmt.Fprintf(w, "You've requested the match event: %s\n", matcheventId)
}
