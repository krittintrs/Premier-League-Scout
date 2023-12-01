package repository

import (
	"back-end/database/mysql"
	"back-end/internal/core/model"
)

type ConditionedPlayerRepo struct {
	masterDB *mysql.MasterDB
}

func NewConditionedPlayerRepo(mdb *mysql.MasterDB) *ConditionedPlayerRepo {
	return &ConditionedPlayerRepo{
		masterDB: mdb,
	}
}

func (cRepo *ConditionedPlayerRepo) CreateConditionedPlayer(condPlayer *model.ConditionedPlayer) (int64, error) {
	query := `
	INSERT INTO conditionedPlayer (playerID, matchID, conditionType, initialDate, duration)
	VALUES (?, ?, ?, ?, ?)
	`

	result, err := cRepo.masterDB.DB.Exec(query, condPlayer.PlayerID, condPlayer.MatchID,
		condPlayer.ConditionType, condPlayer.InitialDate, condPlayer.Duration)
	if err != nil {
		return 0, err
	}

	id, _ := result.LastInsertId()
	return id, nil
}
