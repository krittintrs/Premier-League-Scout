package model

type LeagueTable struct {
	TeamName       string `json:"teamName"`
	MatchPlayed    int    `json:"matchPlayed"`
	Wins           int    `json:"wins"`
	Draws          int    `json:"draws"`
	Losses         int    `json:"losses"`
	GoalFor        int    `json:"goalFor"`
	GoalAgainst    int    `json:"goalAgainst"`
	GoalDifference int    `json:"goalDifference"`
	Points         int    `json:"points"`
}
