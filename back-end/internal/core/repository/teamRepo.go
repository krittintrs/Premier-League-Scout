package repository

import (
	"back-end/database/mysql"
	"back-end/internal/core/model"
)

type teamRepository struct {
	masterDB *mysql.MasterDB
}

func NewTeamRepo(mdb *mysql.MasterDB) *teamRepository {
	return &teamRepository{
		masterDB: mdb,
	}
}

func (tRepo *teamRepository) GetTeamByID(id int) (model.Team, error) {
	result, err := tRepo.masterDB.DB.Query("SELECT * from team WHERE id = ?", id)
	if err != nil {
		return model.Team{}, err
	}
	defer result.Close()

	var team model.Team
	for result.Next() {
		err := result.Scan(&team.ID, &team.TeamName, &team.TeamStadium)
		if err != nil {
			return model.Team{}, err
		}
	}

	return team, nil
}
