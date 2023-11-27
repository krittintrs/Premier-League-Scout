package services

import (
	"back-end/internal/core/model"
	"back-end/internal/core/ports"
	"errors"
	"strconv"
)

type teamService struct {
	teamRepo ports.TeamRepository
}

func NewTeamService(teamRepo ports.TeamRepository) *teamService {
	return &teamService{
		teamRepo: teamRepo,
	}
}

func (srv *teamService) GetTeamByID(idStr string) (model.Team, error) {
	id, err := strconv.Atoi(idStr)
	maxIDLength := 20
	if len(idStr) == 0 {
		return model.Team{}, errors.New("id is empty")
	} else if err != nil {
		return model.Team{}, errors.New("id is not a valid integer")
	} else if id <= 0 || id > maxIDLength {
		return model.Team{}, errors.New("id is out of range")
	}

	team, err := srv.teamRepo.GetTeamByID(idStr)
	if err != nil {
		return model.Team{}, err
	}
	return team, nil
}
