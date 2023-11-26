package model

import "time"

type MatchInfo struct {
	ID             int       `json:"id"`
	Gameweek       int       `json:"gameweek"`
	MatchDatetime  time.Time `json:"matchDatetime"`
	HomeTeamID     int       `json:"homeTeamID"`
	HomeTeamResult string    `json:"homeTeamResult"`
	HomeTeamScore  int       `json:"homeTeamScore"`
	AwayTeamID     int       `json:"awayTeamID"`
	AwayTeamResult string    `json:"awayTeamResult"`
	AwayTeamScore  int       `json:"awayTeamScore"`
}
