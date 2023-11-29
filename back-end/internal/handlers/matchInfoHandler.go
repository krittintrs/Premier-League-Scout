package handlers

import (
	"back-end/internal/core/model"
	"back-end/internal/core/ports"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
)

type matchInfoHandler struct {
	matchInfosrv ports.MatchInfoService
}

func NewMatchInfoHandler(matchInfosrv ports.MatchInfoService) *matchInfoHandler {
	return &matchInfoHandler{
		matchInfosrv: matchInfosrv,
	}
}

func (matchInfohdl *matchInfoHandler) SetupMatchInfoRoutes(router *mux.Router) {
	// Use a consistent trailing slash for paths
	router.HandleFunc("/matchInfo", matchInfohdl.GetMatchInfo).Methods("GET")
	router.HandleFunc("/matchInfo/{id}", matchInfohdl.GetMatchInfoByID).Methods("GET")
	router.HandleFunc("/matchInfo/gw/{gw}", matchInfohdl.GetMatchInfoByGameweek).Methods("GET")
	router.HandleFunc("/matchInfo/{id}", matchInfohdl.UpdateMatchInfo).Methods("PUT")
}

func (matchInfohdl *matchInfoHandler) GetMatchInfo(w http.ResponseWriter, r *http.Request) {
	// get match info
	w.Header().Set("Content-Type", "application/json")

	matchInfo, err := matchInfohdl.matchInfosrv.GetMatchInfo()
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	json.NewEncoder(w).Encode(matchInfo)
}

func (matchInfohdl *matchInfoHandler) GetMatchInfoByID(w http.ResponseWriter, r *http.Request) {
	// get match info
	w.Header().Set("Content-Type", "application/json")
	vars := mux.Vars(r)
	id := vars["id"]

	matchInfo, err := matchInfohdl.matchInfosrv.GetMatchInfoByID(id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	json.NewEncoder(w).Encode(matchInfo)
}

func (matchInfohdl *matchInfoHandler) GetMatchInfoByGameweek(w http.ResponseWriter, r *http.Request) {
	// get match info
	w.Header().Set("Content-Type", "application/json")
	vars := mux.Vars(r)
	gw := vars["gw"]

	matchInfo, err := matchInfohdl.matchInfosrv.GetMatchInfoByGameweek(gw)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	json.NewEncoder(w).Encode(matchInfo)
}

func (matchInfohdl *matchInfoHandler) UpdateMatchInfo(w http.ResponseWriter, r *http.Request) {
	// update match info
	w.Header().Set("Content-Type", "application/json")

	var matchInfo model.MatchInfo
	err := json.NewDecoder(r.Body).Decode(&matchInfo)
	if err != nil {
		fmt.Println("Error decoding JSON:", err)
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	err = matchInfohdl.matchInfosrv.UpdateMatchInfo(matchInfo)
	if err != nil {
		fmt.Println("Error updating Match Info:", err)
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Respond with the created matchInfo (optional).
	json.NewEncoder(w).Encode(matchInfo)
}
