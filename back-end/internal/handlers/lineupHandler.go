package handlers

import (
	"back-end/internal/core/model"
	"back-end/internal/core/ports"
	"encoding/json"
	"net/http"

	"github.com/gorilla/mux"
)

type lineupHandler struct {
	lineupSrv ports.LineupService
}

func NewlineupHandler(lineupSrv ports.LineupService) *lineupHandler {
	return &lineupHandler{
		lineupSrv: lineupSrv,
	}
}

func (lineuphdl *lineupHandler) SetupLineupRoutes(router *mux.Router) {
	// Use a consistent trailing slash for paths
	router.HandleFunc("/lineup/{matchID}", lineuphdl.GetLineupByMatchID).Methods("GET")
	router.HandleFunc("/lineup", lineuphdl.PostLineup).Methods("POST")
}

func (lineuphdl *lineupHandler) GetLineupByMatchID(w http.ResponseWriter, r *http.Request) {
	// get lineup info by match ID
	w.Header().Set("Content-Type", "application/json")
	vars := mux.Vars(r)
	matchID := vars["matchID"]

	lineup, err := lineuphdl.lineupSrv.GetLineupByMatchID(matchID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	json.NewEncoder(w).Encode(lineup)
}

func (lineuphdl *lineupHandler) PostLineup(w http.ResponseWriter, r *http.Request) {
	// create lineup
	w.Header().Set("Content-Type", "application/json")

	// Assuming you have a JSON payload containing lineup information in the request body.
	// Adjust this part based on your actual payload structure.
	var lineups []model.Lineup
	err := json.NewDecoder(r.Body).Decode(&lineups)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	for _, lineup := range lineups {
		err = lineuphdl.lineupSrv.PostLineup(lineup)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
	}

	// Respond with the created lineups (optional).
	json.NewEncoder(w).Encode(lineups)
}
