package repository

import (
	"back-end/internal/core/model"
	"database/sql"
)

type LineupRepository struct {
	db *sql.DB
}

func NewLineupRepo(db *sql.DB) *LineupRepository {
	return &LineupRepository{
		db: db,
	}
}

func (lRepo *LineupRepository) GetLineupByMatchID(matchID string) ([]model.Lineup, error) {
	query := `
		SELECT lineup.MatchID, lineup.PlayerID, player.lastName, lineup.Side, lineup.ShirtNo, lineup.Position
		FROM lineup
		JOIN player ON lineup.PlayerID = player.id
		WHERE lineup.MatchID = ?
	`

	result, err := lRepo.db.Query(query, matchID)
	if err != nil {
		panic(err.Error())
	}
	defer result.Close()

	var lineups []model.Lineup
	for result.Next() {
		var lineup model.Lineup
		err := result.Scan(&lineup.MatchID, &lineup.PlayerID, &lineup.PlayerName, &lineup.Side, &lineup.ShirtNo, &lineup.Position)
		if err != nil {
			panic(err.Error())
		}

		lineups = append(lineups, lineup)
	}

	return lineups, nil
}

func (lRepo *LineupRepository) PostLineup(lineup model.Lineup) error {
	query := `
		INSERT INTO lineup (MatchID, PlayerID, Side, ShirtNo, Position)
		VALUES (?, ?, ?, ?, ?)
	`

	_, err := lRepo.db.Exec(query, lineup.MatchID, lineup.PlayerID, lineup.Side, lineup.ShirtNo, lineup.Position)
	if err != nil {
		return err
	}

	return nil
}
