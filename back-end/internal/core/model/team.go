package model

type Team struct {
	id				string	`json:"id"`,
	teamName		string	`json:"teamName"`,
	teamStadium		string	`json:"teamStadium"`
}

type TeamRepository interface {
	Get(id string) (Team, error)
}

type TeamService interface {
	GetTeam(id string) (Team, error)
}