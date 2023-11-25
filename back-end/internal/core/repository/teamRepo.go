package repository

import (
	"back-end/internal/core/model"
	"database/sql"
)

type teamRepository struct{
	db *sql.DB
}

func NewTeamRepo(db *sql.DB) *teamRepository {
	return &teamRepository{
		db: db,
	}
}

func (tRepo *teamRepository) GetTeamByID(id string) (model.Team, error) {
	result, err := tRepo.db.Query("SELECT * from team WHERE id = ?", id)
    if err != nil {
        panic(err.Error())
    }
	defer result.Close()

    var team model.Team
    for result.Next() {
        err := result.Scan(&team.ID, &team.TeamName, &team.TeamStadium)
        if err != nil {
			panic(err.Error())
        }
    }
	
	return team, nil
}