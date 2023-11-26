package repository

import (
	"back-end/internal/core/model"
	"database/sql"
)

type MatchInfoRepository struct {
	db *sql.DB
}

func NewMatchInfoRepo(db *sql.DB) *MatchInfoRepository {
	return &MatchInfoRepository{
		db: db,
	}
}

func (mRepo *MatchInfoRepository) GetMatchInfo() (model.MatchInfo, error) {
	result, err := mRepo.db.Query("SELECT * from matchinfo")
	if err != nil {
		panic(err.Error())
	}
	defer result.Close()

	var matchInfo model.MatchInfo
	for result.Next() {
		err := result.Scan(&matchInfo.ID, &matchInfo.HomeTeamID, &matchInfo.AwayTeamID, &matchInfo.MatchDatetime, &matchInfo.Gameweek)
		if err != nil {
			panic(err.Error())
		}
	}

	return matchInfo, nil
}

// func (gwRepo *teamRepository) GetGameWeek() (model.Gameweek, error) {
// 	// Find the last gameweek
// 	lastGameweekQuery := "SELECT MAX(gameweek) FROM matchinfo WHERE matchDatetime < NOW()"
// 	lastGameweekResult, err := gwRepo.db.Query(lastGameweekQuery)
// 	if err != nil {
// 		panic(err.Error())
// 	}
// 	defer lastGameweekResult.Close()

// 	var lastGameweek int
// 	if lastGameweekResult.Next() {
// 		err := lastGameweekResult.Scan(&lastGameweek)
// 		if err != nil {
// 			panic(err.Error())
// 		}
// 	}

// 	// Find the next gameweek after the last one
// 	nextGameweekQuery := "SELECT MIN(gameweek) FROM matchinfo WHERE matchDatetime > NOW()"
// 	nextGameweekResult, err := gwRepo.db.Query(nextGameweekQuery)
// 	if err != nil {
// 		panic(err.Error())
// 	}
// 	defer nextGameweekResult.Close()

// 	var nextGameweek int
// 	if nextGameweekResult.Next() {
// 		err := nextGameweekResult.Scan(&nextGameweek)
// 		if err != nil {
// 			panic(err.Error())
// 		}
// 	}

// 	// Now, get the gameweek that falls between the last and next gameweeks
// 	result, err := gwRepo.db.Query("SELECT gameweek FROM matchinfo WHERE matchDatetime > NOW() AND gameweek > ? AND gameweek < ?", lastGameweek, nextGameweek)
// 	if err != nil {
// 		panic(err.Error())
// 	}
// 	defer result.Close()

// 	var gameweek model.Gameweek
// 	if result.Next() {
// 		err := result.Scan(&gameweek.Gw)
// 		if err != nil {
// 			panic(err.Error())
// 		}
// 	}

// 	return gameweek, nil
// }
