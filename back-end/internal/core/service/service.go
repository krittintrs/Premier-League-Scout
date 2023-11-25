package service

import (
	"back-end/internal/core/model"
)

type service struct{

}

func New() *service {
	return &service{}
}

func (srv *service) GetTeam(id string) (model.Team, error) {
	team, err := srv.teamRepository.Get(id)
	if err != nil {
		return model.Team{}, errors.New("cannot retrieve team from given id")
	}

	return game, nil
}
