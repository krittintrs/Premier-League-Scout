package model

import "time"

type ConditionedPlayer struct {
	ID            int       `json:"id"`
	PlayerID      int       `json:"playerID"`
	MatchID       int       `json:"matchID"`
	ConditionType string    `json:"conditionType"`
	InitialDate   time.Time `json:"initialDate"`
	Duration      int       `json:"duration"`
}
