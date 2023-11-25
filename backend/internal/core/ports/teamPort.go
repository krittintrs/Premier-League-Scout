package ports

import (
	"back-end/internal/core/model"
)

type TeamRepository interface {
	GetTeamByID(id string) (model.Team, error)
}

type TeamService interface {
	GetTeamByID(id string) (model.Team, error)
}