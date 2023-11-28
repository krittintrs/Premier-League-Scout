package services

import (
	"back-end/internal/core/model"
	"back-end/internal/core/ports"
)

type LineupService struct {
	lineupRepo ports.LineupRepository
}

func NewLineupService(lineupRepo ports.LineupRepository) *LineupService {
	return &LineupService{
		lineupRepo: lineupRepo,
	}
}

func (lineupSrv *LineupService) GetLineupByMatchID(id string) ([]model.Lineup, error) {
	lineups, err := lineupSrv.lineupRepo.GetLineupByMatchID(id)
	if err != nil {
		return []model.Lineup{}, err
	}

	return lineups, nil
}

func (lineupSrv *LineupService) PostLineup(lineup model.Lineup) error {
	err := lineupSrv.lineupRepo.PostLineup(lineup)
	if err != nil {
		return err
	}

	return nil
}
