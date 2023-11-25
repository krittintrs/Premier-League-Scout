package handlers

import (
	"back-end/internal/core/ports"
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
)

type HTTPHandler struct {
	router  *mux.Router
	teamsrv ports.TeamService
}

func NewHTTPHandler(teamsrv ports.TeamService) *HTTPHandler {
	return &HTTPHandler{
		router:  mux.NewRouter(),
		teamsrv: teamsrv,
	}
}

// Test

func (httphdl *HTTPHandler) GetTeam(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)

	team, err := httphdl.teamsrv.GetTeamByID(params["id"])
	if err != nil {
		panic(err.Error())
	}

	json.NewEncoder(w).Encode(team)
}

func (httphdl *HTTPHandler) SetupRoutes() {
	httphdl.router.HandleFunc("/", httphdl.Welcome).Methods("GET")
	httphdl.router.HandleFunc("/fixtures/{gw}", httphdl.GetFixtures).Methods("GET")
	httphdl.router.HandleFunc("/team", httphdl.GetTeam).Methods("GET")
	// Add other route handling...
}

func (httphdl *HTTPHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	httphdl.router.ServeHTTP(w, r)
}

func (httphdl *HTTPHandler) Welcome(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "Welcome to this page.")
}

func (httphdl *HTTPHandler) GetFixtures(w http.ResponseWriter, r *http.Request) {
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

func (httphdl *HTTPHandler) PostMatchInfo(w http.ResponseWriter, r *http.Request) {
	// post match info
	vars := mux.Vars(r)
	id := vars["id"]
	fmt.Fprintf(w, "You've requested the match info: %s\n", id)
}

func (httphdl *HTTPHandler) GetMatchInfo(w http.ResponseWriter, r *http.Request) {
	// get match info
	vars := mux.Vars(r)
	id := vars["id"]
	fmt.Fprintf(w, "You've requested the match info: %s\n", id)
}

func (httphdl *HTTPHandler) UpdateMatchInfo(w http.ResponseWriter, r *http.Request) {
	// update match info
	vars := mux.Vars(r)
	id := vars["id"]
	fmt.Fprintf(w, "You've requested the match info: %s\n", id)
}

func (httphdl *HTTPHandler) GetPlayers(w http.ResponseWriter, r *http.Request) {
	// get player available for a given gameweek
	vars := mux.Vars(r)
	teamId := vars["teamId"]
	fmt.Fprintf(w, "You've requested the team: %s\n", teamId)
}

func (httphdl *HTTPHandler) PostLineup(w http.ResponseWriter, r *http.Request) {
	// post player for each game lineup
	vars := mux.Vars(r)
	gw := vars["gw"]
	teamId := vars["teamId"]
	fmt.Fprintf(w, "You've requested the gameweek: %s\n", gw)
	fmt.Fprintf(w, "You've requested the team: %s\n", teamId)
}

func (httphdl *HTTPHandler) GetLineup(w http.ResponseWriter, r *http.Request) {
	// get player for each game lineup
	vars := mux.Vars(r)
	gw := vars["gw"]
	teamId := vars["teamId"]
	fmt.Fprintf(w, "You've requested the gameweek: %s\n", gw)
	fmt.Fprintf(w, "You've requested the team: %s\n", teamId)
}

func (httphdl *HTTPHandler) GetMatchEvents(w http.ResponseWriter, r *http.Request) {
	// get match events
	vars := mux.Vars(r)

	matchinfoId := vars["matchinfoId"]
	fmt.Fprintf(w, "You've requested the match info: %s\n", matchinfoId)
}

func (httphdl *HTTPHandler) PostMatchEvents(w http.ResponseWriter, r *http.Request) {
	// post match events
	vars := mux.Vars(r)
	matchinfoId := vars["matchinfoId"]
	fmt.Fprintf(w, "You've requested the match info: %s\n", matchinfoId)
}

func (httphdl *HTTPHandler) UpdateMatchEvents(w http.ResponseWriter, r *http.Request) {
	// update match events
	vars := mux.Vars(r)
	matchinfoId := vars["matchinfoId"]
	matcheventId := vars["matcheventId"]
	fmt.Fprintf(w, "You've requested the match info: %s\n", matchinfoId)
	fmt.Fprintf(w, "You've requested the match event: %s\n", matcheventId)
}

func (httphdl *HTTPHandler) DeleteMatchEvents(w http.ResponseWriter, r *http.Request) {
	// delete match events
	vars := mux.Vars(r)
	matchinfoId := vars["matchinfoId"]
	matcheventId := vars["matcheventId"]
	fmt.Fprintf(w, "You've requested the match info: %s\n", matchinfoId)
	fmt.Fprintf(w, "You've requested the match event: %s\n", matcheventId)
}
