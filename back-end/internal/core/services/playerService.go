package services

import (
	"back-end/internal/core/model"
	"back-end/internal/core/ports"
)

type PlayerService struct {
	playerRepo ports.PlayerRepository
}

func NewPlayerService(playerRepo ports.PlayerRepository) *PlayerService {
	return &PlayerService{
		playerRepo: playerRepo,
	}
}

func (playerSrv *PlayerService) GetPlayerByID(id string) (model.Player, error) {
	player, err := playerSrv.playerRepo.GetPlayerByID(id)
	if err != nil {
		return model.Player{}, err
	}

	return player, nil
}

func (playerSrv *PlayerService) GetPlayerByTeamID(teamID string) ([]model.Player, error) {
	players, err := playerSrv.playerRepo.GetPlayerByTeamID(teamID)
	if err != nil {
		return []model.Player{}, err
	}

	return players, nil
}
