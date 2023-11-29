package services

import (
	"back-end/internal/core/model"
	"back-end/internal/core/ports"
)

type MatchEventService struct {
	meRepo ports.MatchEventRepository
}

func NewMatchEventService(meRepo ports.MatchEventRepository) *MatchEventService {
	return &MatchEventService{
		meRepo: meRepo,
	}
}

func (meService *MatchEventService) GetMatchEventByMatchID(matchID string) ([]model.MatchEvent, error) {
	matchEvents, err := meService.meRepo.GetMatchEventByMatchID(matchID)
	if err != nil {
		return nil, err
	}

	return matchEvents, nil
}

func (meService *MatchEventService) PostMatchEvent(matchEvent model.MatchEvent) error {
	err := meService.meRepo.PostMatchEvent(matchEvent)
	if err != nil {
		return err
	}

	return nil
}

func (meService *MatchEventService) UpdateMatchEvent(matchEvent model.MatchEvent) error {
	err := meService.meRepo.UpdateMatchEvent(matchEvent)
	if err != nil {
		return err
	}

	return nil
}

func (meService *MatchEventService) DeleteMatchEvent(matchEvent model.MatchEvent) error {
	err := meService.meRepo.DeleteMatchEvent(matchEvent)
	if err != nil {
		return err
	}

	return nil
}
