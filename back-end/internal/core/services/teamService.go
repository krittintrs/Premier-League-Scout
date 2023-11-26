package services

import (
	"back-end/internal/core/model"
	"back-end/internal/core/ports"
)

type teamService struct {
	teamRepo ports.TeamRepository
}

func NewService(teamRepo ports.TeamRepository) *teamService {
	return &teamService{
		teamRepo: teamRepo,
	}
}

func (srv *teamService) GetTeamByID(id string) (model.Team, error) {
	team, err := srv.teamRepo.GetTeamByID(id)
	if err != nil {
		return model.Team{}, err
	}

	return team, nil
}
