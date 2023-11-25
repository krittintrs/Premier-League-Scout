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
	game, err := srv.gamesRepository.Get(id)
	if err != nil {
		return domain.Game{}, errors.New("get game from repository has failed")
	}

	return game, nil
}
