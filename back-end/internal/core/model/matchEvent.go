package model

// MatchEvent represents the matchEvent table in the database.
type MatchEvent struct {
	ID              int      `json:"id"`
	MatchID         int      `json:"matchID"`
	MinuteOccur     float64  `json:"minuteOccur"`
	EventType       string   `json:"eventType"`
	ScorerPlayerID  int      `json:"scorerPlayerID"`
	AssistPlayerID  int      `json:"assistPlayerID"`
	SubInPlayerID   int      `json:"subInPlayerID"`
	SubOutPlayerID  int      `json:"subOutPlayerID"`
	InjuredPlayerID int      `json:"injuredPlayerID"`
	BookedPlayerID  int      `json:"bookedPlayerID"`
	BookedCardType  CardType `json:"bookedCardType"`
}

// CardType represents the type of card booked.
type CardType string

const (
	Yellow       CardType = "YELLOW"
	Red          CardType = "RED"
	SecondYellow CardType = "SECONDYELLOW"
)
