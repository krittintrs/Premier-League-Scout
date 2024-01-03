package handlers

import (
	"back-end/internal/core/model"
	"back-end/internal/core/ports"
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/gorilla/mux"
)

type conditionedPlayerHandler struct {
	cpSrv ports.ConditionedPlayerService
}

func NewConditionedPlayerHandler(cpSrv ports.ConditionedPlayerService) *conditionedPlayerHandler {
	return &conditionedPlayerHandler{
		cpSrv: cpSrv,
	}
}

func (h *conditionedPlayerHandler) SetupCondPlayerRoutes(router *mux.Router) {
	// Use a consistent trailing slash for paths
	router.HandleFunc("/cond", h.PostConditionedPlayer).Methods("POST")
}

func (h *conditionedPlayerHandler) PostConditionedPlayer(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var condPlayer *model.ConditionedPlayer
	err := json.NewDecoder(r.Body).Decode(&condPlayer)
	if err != nil {
		fmt.Println("Error decoding JSON:", err)
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	condPlayer.InitialDate = time.Now()

	_, err = h.cpSrv.AddConditionedPlayer(condPlayer)
	if err != nil {
		fmt.Println("Error posting conditioned player:", err)
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	w.WriteHeader(http.StatusCreated)
}
