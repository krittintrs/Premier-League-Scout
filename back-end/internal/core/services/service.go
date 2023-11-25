package services

import (
	"back-end/internal/core/model"
	"back-end/internal/core/ports"
)

type service struct{
	teamRepo ports.TeamRepository
}

func NewService(teamRepo ports.TeamRepository) *service {
	return &service{
		teamRepo: teamRepo,
	}
}

func (srv *service) GetTeamByID(id string) (model.Team, error) {
	team, err := srv.teamRepo.GetTeamByID(id)
	if err != nil {
		return model.Team{}, err
	}

	return team, nil
}
