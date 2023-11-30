package services

import (
	"back-end/internal/core/model"
	"back-end/internal/core/ports"
	"errors"
)

type teamService struct {
	teamRepo ports.TeamRepository
}

func NewTeamService(teamRepo ports.TeamRepository) *teamService {
	return &teamService{
		teamRepo: teamRepo,
	}
}

func (srv *teamService) GetTeamByID(id int) (model.Team, error) {
	maxIDLength := 20
	if id <= 0 || id > maxIDLength {
		return model.Team{}, errors.New("id is out of range")
	}

	team, err := srv.teamRepo.GetTeamByID(id)
	if err != nil {
		return model.Team{}, err
	}
	return team, nil
}
