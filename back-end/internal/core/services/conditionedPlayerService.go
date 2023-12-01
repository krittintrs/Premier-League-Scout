package services

import (
	"back-end/internal/core/model"
	"back-end/internal/core/ports"
)

type conditionedPlayerService struct {
	cRepo ports.ConditionedPlayerRepository
}

func NewConditionedPlayerService(cRepo ports.ConditionedPlayerRepository) *conditionedPlayerService {
	return &conditionedPlayerService{
		cRepo: cRepo,
	}
}

func (cSrv *conditionedPlayerService) AddConditionedPlayer(condPlayer *model.ConditionedPlayer) (int64, error) {
	id, err := cSrv.cRepo.CreateConditionedPlayer(condPlayer)
	if err != nil {
		return 0, err
	}

	return id, nil
}
