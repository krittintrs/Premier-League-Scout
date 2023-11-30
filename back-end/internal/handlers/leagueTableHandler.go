package handlers

import (
	"back-end/internal/core/ports"
	"encoding/json"
	"net/http"

	"github.com/gorilla/mux"
)

type leagueTableHandler struct {
	leagueTableSrv ports.LeagueTableService
}

func NewLeagueTableHandler(leagueTableSrv ports.LeagueTableService) *leagueTableHandler {
	return &leagueTableHandler{
		leagueTableSrv: leagueTableSrv,
	}
}

func (h *leagueTableHandler) SetupLeagueTableRoutes(router *mux.Router) {
	// Use a consistent trailing slash for paths
	router.HandleFunc("/table", h.GetLeagueTable).Methods("GET")
}

func (h *leagueTableHandler) GetLeagueTable(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	leagueTable, err := h.leagueTableSrv.GetTable()
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	json.NewEncoder(w).Encode(leagueTable)
}
