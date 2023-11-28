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
	result, err := lRepo.db.Query("SELECT * from lineup where MatchID = ?", matchID)
	if err != nil {
		panic(err.Error())
	}
	defer result.Close()

	var lineups []model.Lineup
	for result.Next() {
		var lineup model.Lineup
		err := result.Scan(&lineup.MatchID, &lineup.PlayerID, &lineup.Side, &lineup.ShirtNo, &lineup.Position)
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
