package ports

import (
	"back-end/internal/core/model"
)

type MatchInfoRepository interface {
	GetMatchInfo() ([]model.MatchInfo, error)
	GetMatchInfoByID(id string) (model.MatchInfo, error)
}

type MatchInfoService interface {
	GetMatchInfo() ([]model.MatchInfo, error)
	GetMatchInfoByID(id string) (model.MatchInfo, error)
}

type TeamRepository interface {
	GetTeamByID(id string) (model.Team, error)
}

type TeamService interface {
	GetTeamByID(id string) (model.Team, error)
}
