package ports

import (
	"back-end/internal/core/model"
)

type MatchInfoRepository interface {
	GetMatchInfo() ([]model.MatchInfo, error)
	GetMatchInfoByID(id string) (model.MatchInfo, error)
	GetMatchInfoByGameweek(gameweek string) ([]model.MatchInfo, error)
}

type MatchInfoService interface {
	GetMatchInfo() ([]model.MatchInfo, error)
	GetMatchInfoByID(id string) (model.MatchInfo, error)
	GetMatchInfoByGameweek(gameweek string) ([]model.MatchInfo, error)
}

type TeamRepository interface {
	GetTeamByID(id string) (model.Team, error)
}

type TeamService interface {
	GetTeamByID(id string) (model.Team, error)
}

type PlayerRepository interface {
	GetPlayerByID(id string) (model.Player, error)
	GetPlayerByTeamID(teamID string) ([]model.Player, error)
}

type PlayerService interface {
	GetPlayerByID(id string) (model.Player, error)
	GetPlayerByTeamID(teamID string) ([]model.Player, error)
}

type LineupRepository interface {
	GetLineupByMatchID(matchID string) ([]model.Lineup, error)
	PostLineup(lineup model.Lineup) error
}

type LineupService interface {
	GetLineupByMatchID(matchID string) ([]model.Lineup, error)
	PostLineup(lineup model.Lineup) error
}
