package services

import (
	"back-end/internal/core/model"
	"back-end/internal/core/ports"
)

type MatchInfoService struct {
	matchInfoRepo ports.MatchInfoRepository
}

func NewMatchInfoService(matchInfoRepo ports.MatchInfoRepository) *MatchInfoService {
	return &MatchInfoService{
		matchInfoRepo: matchInfoRepo,
	}
}

func (matchInfoSrv *MatchInfoService) GetMatchInfo() ([]model.MatchInfo, error) {
	matchInfos, err := matchInfoSrv.matchInfoRepo.GetMatchInfo()
	if err != nil {
		return []model.MatchInfo{}, err
	}

	return matchInfos, nil
}

func (matchInfoSrv *MatchInfoService) GetMatchInfoByID(id string) (model.MatchInfo, error) {
	matchInfo, err := matchInfoSrv.matchInfoRepo.GetMatchInfoByID(id)
	if err != nil {
		return model.MatchInfo{}, err
	}

	return matchInfo, nil
}

func (matchInfoSrv *MatchInfoService) GetMatchInfoByGameweek(gameweek string) ([]model.MatchInfo, error) {
	matchInfos, err := matchInfoSrv.matchInfoRepo.GetMatchInfoByGameweek(gameweek)
	if err != nil {
		return []model.MatchInfo{}, err
	}

	return matchInfos, nil
}

func (matchInfoSrv *MatchInfoService) UpdateMatchInfo(matchInfo model.MatchInfo) error {
	err := matchInfoSrv.matchInfoRepo.UpdateMatchInfo(matchInfo)
	if err != nil {
		return err
	}

	return nil
}
