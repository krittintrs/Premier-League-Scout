package services

import (
	"back-end/internal/core/model"
	"back-end/internal/core/ports"
)

type leagueTableService struct {
	leagueTableRepo ports.LeagueTableRepository
}

func NewLeagueTableService(leagueTableRepo ports.LeagueTableRepository) *leagueTableService {
	return &leagueTableService{
		leagueTableRepo: leagueTableRepo,
	}
}

func (leagueTableSrv *leagueTableService) GetTable() ([]model.LeagueTable, error) {
	leagueTable, err := leagueTableSrv.leagueTableRepo.GetTableView()
	if err != nil {
		return []model.LeagueTable{}, err
	}

	return leagueTable, nil
}
