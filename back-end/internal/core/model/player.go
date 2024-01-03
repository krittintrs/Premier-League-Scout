package model

import (
	"time"
)

// Player represents the player table in the database.
type Player struct {
	ID         int       `json:"id"`
	FirstName  string    `json:"firstName"`
	MiddleName string    `json:"middleName"`
	LastName   string    `json:"lastName"`
	ShirtNo    int       `json:"shirtNo"`
	BirthDate  time.Time `json:"birthDate"`
	Position   Position  `json:"position"`
	IsBanned   bool      `json:"isBanned"`
	IsInjured  bool      `json:"isInjured"`
	TeamID     int       `json:"teamID"`
}

// Position represents the player's position.
type Position string

const (
	Goalkeeper Position = "Goalkeeper"
	Defender   Position = "Defender"
	Midfielder Position = "Midfielder"
	Forward    Position = "Forward"
)
