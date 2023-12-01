package repository

import (
	"back-end/database/mysql"
	"back-end/internal/core/model"
)

type LineupRepository struct {
	masterDB *mysql.MasterDB
}

func NewLineupRepo(mdb *mysql.MasterDB) *LineupRepository {
	return &LineupRepository{
		masterDB: mdb,
	}
}

func (lRepo *LineupRepository) GetLineupByMatchID(matchID string) ([]model.Lineup, error) {
	query := `
		SELECT lineup.MatchID, lineup.PlayerID, player.lastName, lineup.Side, lineup.ShirtNo, lineup.Position
		FROM lineup
		JOIN player ON lineup.PlayerID = player.id
		WHERE lineup.MatchID = ?
	`

	result, err := lRepo.masterDB.DB.Query(query, matchID)
	if err != nil {
		return nil, err
	}
	defer result.Close()

	var lineups []model.Lineup
	for result.Next() {
		var lineup model.Lineup
		err := result.Scan(&lineup.MatchID, &lineup.PlayerID, &lineup.PlayerName, &lineup.Side, &lineup.ShirtNo, &lineup.Position)
		if err != nil {
			return nil, err
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

	_, err := lRepo.masterDB.DB.Exec(query, lineup.MatchID, lineup.PlayerID, lineup.Side, lineup.ShirtNo, lineup.Position)
	if err != nil {
		return err
	}

	return nil
}
