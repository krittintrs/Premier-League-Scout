package repository

import (
	"back-end/internal/core/model"
	"database/sql"
	"time"

	"github.com/go-sql-driver/mysql"
)

type PlayerRepository struct {
	db *sql.DB
}

func NewPlayerRepo(db *sql.DB) *PlayerRepository {
	return &PlayerRepository{
		db: db,
	}
}

func (pRepo *PlayerRepository) GetPlayerByID(id string) (model.Player, error) {
	query := `
		SELECT id, firstName, middleName, lastName, shirtNo, birthDate, position, isBanned, isInjured, teamID
		FROM player
		WHERE id = ?
	`

	result := pRepo.db.QueryRow(query, id)

	var player model.Player
	var MiddleName sql.NullString
	var FirstName sql.NullString
	var ShirtNo sql.NullInt64
	var BirthDate mysql.NullTime
	var Position sql.NullString
	var IsBanned sql.NullBool
	var IsInjured sql.NullBool

	err := result.Scan(
		&player.ID,
		&FirstName,
		&MiddleName,
		&player.LastName,
		&ShirtNo,
		&BirthDate,
		&Position,
		&IsBanned,
		&IsInjured,
		&player.TeamID,
	)
	if err != nil {
		return model.Player{}, err
	}

	// Check and assign values for MiddleName
	if MiddleName.Valid {
		player.MiddleName = MiddleName.String
	} else {
		player.MiddleName = "" // Handle NULL case
	}

	// Check and assign values for FirstName
	if FirstName.Valid {
		player.FirstName = FirstName.String
	} else {
		player.FirstName = "" // Handle NULL case
	}

	// Check and assign values for ShirtNo
	if ShirtNo.Valid {
		player.ShirtNo = int(ShirtNo.Int64)
	} else {
		player.ShirtNo = 0 // Handle NULL case
	}

	// Check and assign values for BirthDate
	if BirthDate.Valid {
		player.BirthDate = BirthDate.Time
	} else {
		player.BirthDate = time.Time{}
	}

	// Check and assign values for Position
	if Position.Valid {
		player.Position = model.Position(Position.String)
	}

	// Check and assign values for IsBanned
	if IsBanned.Valid {
		player.IsBanned = IsBanned.Bool
	} else {
		player.IsBanned = false // Handle NULL case
	}

	// Check and assign values for IsInjured
	if IsInjured.Valid {
		player.IsInjured = IsInjured.Bool
	} else {
		player.IsInjured = false // Handle NULL case
	}

	return player, nil
}

func (pRepo *PlayerRepository) GetPlayerByTeamID(teamID string) ([]model.Player, error) {
	query := `
		SELECT id, firstName, middleName, lastName, shirtNo, birthDate, position, isBanned, isInjured, teamID
		FROM player
		WHERE teamID = ?
	`
	result, err := pRepo.db.Query(query, teamID)
	if err != nil {
		return nil, err
	}
	defer result.Close()

	var players []model.Player

	for result.Next() {
		var player model.Player
		var FirstName sql.NullString
		var MiddleName sql.NullString
		var ShirtNo sql.NullInt64
		var BirthDate mysql.NullTime
		var Position sql.NullString
		var IsBanned sql.NullBool
		var IsInjured sql.NullBool

		err := result.Scan(
			&player.ID,
			&FirstName,
			&MiddleName,
			&player.LastName,
			&ShirtNo,
			&BirthDate,
			&Position,
			&IsBanned,
			&IsInjured,
			&player.TeamID,
		)
		if err != nil {
			panic(err.Error())
		}
		// Check and assign values for MiddleName
		if MiddleName.Valid {
			player.MiddleName = MiddleName.String
		} else {
			player.MiddleName = "" // Handle NULL case
		}

		// Check and assign values for FirstName
		if FirstName.Valid {
			player.FirstName = FirstName.String
		} else {
			player.FirstName = "" // Handle NULL case
		}

		// Check and assign values for ShirtNo
		if ShirtNo.Valid {
			player.ShirtNo = int(ShirtNo.Int64)
		} else {
			player.ShirtNo = 0 // Handle NULL case
		}

		// Check and assign values for BirthDate
		if BirthDate.Valid {
			player.BirthDate = BirthDate.Time
		} else {
			player.BirthDate = time.Time{}
		}

		// Check and assign values for Position
		if Position.Valid {
			player.Position = model.Position(Position.String)
		}

		// Check and assign values for Position
		if Position.Valid {
			player.Position = model.Position(Position.String)
		} else {
			player.Position = "" // Handle NULL case
		}

		// Check and assign values for IsBanned
		if IsBanned.Valid {
			player.IsBanned = IsBanned.Bool
		} else {
			player.IsBanned = false // Handle NULL case
		}

		// Check and assign values for IsInjured
		if IsInjured.Valid {
			player.IsInjured = IsInjured.Bool
		} else {
			player.IsInjured = false // Handle NULL case
		}

		players = append(players, player)
	}
	return players, nil
}
