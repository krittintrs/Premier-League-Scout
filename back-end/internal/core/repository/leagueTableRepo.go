package repository

import (
	"back-end/database/mysql"
	"back-end/internal/core/model"
	"database/sql"
)

type LeagueTableRepo struct {
	masterDB *mysql.MasterDB
}

func NewLeagueTableRepo(mdb *mysql.MasterDB) *LeagueTableRepo {
	return &LeagueTableRepo{
		masterDB: mdb,
	}
}

func (ltRepo *LeagueTableRepo) GetTableView() ([]model.LeagueTable, error) {
	query := `
		SELECT leaguetable.teamName, leaguetable.matchPlayed, leaguetable.wins, leaguetable.draws, 
		       leaguetable.losses, leaguetable.goalFor, leaguetable.goalAgainst,
		       leaguetable.goalDifference, leaguetable.points
		FROM leaguetable
	`

	result, err := ltRepo.masterDB.DB.Query(query)
	if err != nil {
		return nil, err
	}
	defer result.Close()

	var leagueTableRows []model.LeagueTable

	for result.Next() {
		var leagueTable model.LeagueTable
		var goalFor sql.NullInt64
		var goalAgainst sql.NullInt64
		var goalDifference sql.NullInt64

		err := result.Scan(
			&leagueTable.TeamName, &leagueTable.MatchPlayed, &leagueTable.Wins, &leagueTable.Draws,
			&leagueTable.Losses, &goalFor, &goalAgainst,
			&goalDifference, &leagueTable.Points,
		)
		if err != nil {
			return nil, err
		}

		if goalFor.Valid {
			leagueTable.GoalFor = int(goalFor.Int64)
		} else {
			leagueTable.GoalFor = 0 // Handle NULL case
		}

		if goalAgainst.Valid {
			leagueTable.GoalAgainst = int(goalAgainst.Int64)
		} else {
			leagueTable.GoalAgainst = 0 // Handle NULL case
		}

		if goalDifference.Valid {
			leagueTable.GoalDifference = int(goalDifference.Int64)
		} else {
			leagueTable.GoalDifference = 0 // Handle NULL case
		}

		leagueTableRows = append(leagueTableRows, leagueTable)
	}

	return leagueTableRows, nil
}
