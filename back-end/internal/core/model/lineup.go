package model

// LineUp represents the lineUp table in the database.
type Lineup struct {
	MatchID  int    `json:"matchID"`
	PlayerID int    `json:"playerID"`
	Side     Side   `json:"side"`
	ShirtNo  int    `json:"shirtNo"`
	Position string `json:"position"`
}

// Side represents the side in the lineup.
type Side string

const (
	Home Side = "HOME"
	Away Side = "AWAY"
)
