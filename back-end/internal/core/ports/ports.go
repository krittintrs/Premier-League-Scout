package ports

import (
	"back-end/internal/core/model"
)

type MatchInfoRepository interface {
	GetMatchInfo() ([]model.MatchInfo, error)
	GetMatchInfoByID(id string) (model.MatchInfo, error)
	GetMatchInfoByGameweek(gameweek string) ([]model.MatchInfo, error)
	GetCurrentGameweek() (int, error)
	UpdateMatchInfo(matchInfo model.MatchInfo) error
}

type MatchInfoService interface {
	GetMatchInfo() ([]model.MatchInfo, error)
	GetMatchInfoByID(id string) (model.MatchInfo, error)
	GetMatchInfoByGameweek(gameweek string) ([]model.MatchInfo, error)
	GetCurrentGameweek() (int, error)
	UpdateMatchInfo(matchInfo model.MatchInfo) error
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

type MatchEventRepository interface {
	GetMatchEventByMatchID(matchID string) ([]model.MatchEvent, error)
	GetMatchEventByID(id string) (model.MatchEvent, error)
	PostMatchEvent(matchEvent model.MatchEvent) error
	UpdateMatchEvent(matchEvent model.MatchEvent) error
	DeleteMatchEvent(id string) error
}

type MatchEventService interface {
	GetMatchEventByMatchID(matchID string) ([]model.MatchEvent, error)
	GetMatchEventByID(id string) (model.MatchEvent, error)
	PostMatchEvent(matchEvent model.MatchEvent) error
	UpdateMatchEvent(matchEvent model.MatchEvent) error
	DeleteMatchEvent(id string) error
}

type UserRepository interface {
	FindByUsername(username string) (model.User, error)
	AddUser(user model.User) (int64, error)
}

type UserService interface {
	GetUserByUsername(username string) (model.User, error)
	RegisterUser(user *model.User) (int64, error)
	AuthenticateUser(username string, password []byte) (model.User, error)
}
