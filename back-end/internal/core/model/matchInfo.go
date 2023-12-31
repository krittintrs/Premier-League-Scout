package model

import "time"

type MatchInfo struct {
	ID             int       `json:"id"`
	Gameweek       int       `json:"gameweek"`
	MatchDatetime  time.Time `json:"matchDatetime"`
	HomeTeamID     int       `json:"homeTeamID"`
	HomeTeamName   string    `json:"homeTeamName"`
	HomeTeamResult string    `json:"homeTeamResult"`
	HomeTeamScore  int       `json:"homeTeamScore"`
	AwayTeamID     int       `json:"awayTeamID"`
	AwayTeamName   string    `json:"awayTeamName"`
	AwayTeamResult string    `json:"awayTeamResult"`
	AwayTeamScore  int       `json:"awayTeamScore"`
}
