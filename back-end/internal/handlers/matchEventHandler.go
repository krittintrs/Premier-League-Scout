package handlers

import (
	"back-end/internal/core/model"
	"back-end/internal/core/ports"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
)

type MatchEventHandler struct {
	meService ports.MatchEventService
}

func NewMatchEventHandler(meService ports.MatchEventService) *MatchEventHandler {
	return &MatchEventHandler{
		meService: meService,
	}
}

func (meHandler *MatchEventHandler) SetupMatchEventRoutes(router *mux.Router) {
	// Use a consistent trailing slash for paths
	router.HandleFunc("/match-events/match/{matchID}", meHandler.GetMatchEventByMatchID).Methods("GET")
	router.HandleFunc("/match-events", meHandler.PostMatchEvent).Methods("POST")
	router.HandleFunc("/match-events", meHandler.UpdateMatchEvent).Methods("PUT")
	router.HandleFunc("/match-events", meHandler.DeleteMatchEvent).Methods("DELETE")
}

func (meHandler *MatchEventHandler) GetMatchEventByMatchID(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	vars := mux.Vars(r)
	matchID := vars["matchID"]

	matchEvents, err := meHandler.meService.GetMatchEventByMatchID(matchID)
	if err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(matchEvents)
}

func (meHandler *MatchEventHandler) PostMatchEvent(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var matchEvents []model.MatchEvent
	err := json.NewDecoder(r.Body).Decode(&matchEvents)
	if err != nil {
		fmt.Println("Error decoding JSON:", err)
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	fmt.Println("Decoded Match Events:", matchEvents[0].BookedCardType)

	for _, matchEvent := range matchEvents {
		err = meHandler.meService.PostMatchEvent(matchEvent)
		if err != nil {
			fmt.Println("Error posting Match Event:", err)
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
	}

	w.WriteHeader(http.StatusCreated)
}

func (meHandler *MatchEventHandler) UpdateMatchEvent(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var matchEvent model.MatchEvent

	err := json.NewDecoder(r.Body).Decode(&matchEvent)
	if err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	err = meHandler.meService.UpdateMatchEvent(matchEvent)
	if err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}

func (meHandler *MatchEventHandler) DeleteMatchEvent(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var matchEvent model.MatchEvent

	err := json.NewDecoder(r.Body).Decode(&matchEvent)
	if err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	err = meHandler.meService.DeleteMatchEvent(matchEvent)
	if err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}
