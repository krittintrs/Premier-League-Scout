package repository

import (
	"back-end/internal/core/model"
	"database/sql"

	"github.com/go-sql-driver/mysql"
)

type MatchInfoRepository struct {
	db *sql.DB
}

func NewMatchInfoRepo(db *sql.DB) *MatchInfoRepository {
	return &MatchInfoRepository{
		db: db,
	}
}

func (mRepo *MatchInfoRepository) GetMatchInfo() ([]model.MatchInfo, error) {
	result, err := mRepo.db.Query("SELECT * from matchinfo")
	if err != nil {
		panic(err.Error())
	}
	defer result.Close()

	var matchInfos []model.MatchInfo

	for result.Next() {
		var matchInfo model.MatchInfo
		var matchDatetime mysql.NullTime
		var homeTeamResult sql.NullString
		var awayTeamResult sql.NullString
		var homeTeamScore sql.NullInt64
		var awayTeamScore sql.NullInt64

		err := result.Scan(
			&matchInfo.ID,
			&matchInfo.Gameweek,
			&matchDatetime,
			&matchInfo.HomeTeamID,
			&homeTeamResult,
			&homeTeamScore,
			&matchInfo.AwayTeamID,
			&awayTeamResult,
			&awayTeamScore,
		)
		if err != nil {
			panic(err.Error())
		}

		// Check and assign values for HomeTeamResult
		if homeTeamResult.Valid {
			matchInfo.HomeTeamResult = homeTeamResult.String
		} else {
			matchInfo.HomeTeamResult = "" // Handle NULL case
		}

		// Check and assign values for AwayTeamResult
		if awayTeamResult.Valid {
			matchInfo.AwayTeamResult = awayTeamResult.String
		} else {
			matchInfo.AwayTeamResult = "" // Handle NULL case
		}

		// Check and assign values for HomeTeamScore
		if homeTeamScore.Valid {
			matchInfo.HomeTeamScore = int(homeTeamScore.Int64)
		} else {
			matchInfo.HomeTeamScore = 0 // Handle NULL case
		}

		// Check and assign values for AwayTeamScore
		if awayTeamScore.Valid {
			matchInfo.AwayTeamScore = int(awayTeamScore.Int64)
		} else {
			matchInfo.AwayTeamScore = 0 // Handle NULL case
		}

		// Check if matchDatetime is valid (not NULL)
		if matchDatetime.Valid {
			matchInfo.MatchDatetime = matchDatetime.Time
		}

		matchInfos = append(matchInfos, matchInfo)
	}

	return matchInfos, nil
}

func (mRepo *MatchInfoRepository) GetMatchInfoByID(id string) (model.MatchInfo, error) {
	result, err := mRepo.db.Query("SELECT * from matchinfo WHERE id = ?", id)
	if err != nil {
		panic(err.Error())
	}
	defer result.Close()

	var matchInfo model.MatchInfo
	for result.Next() {

		var matchDatetime mysql.NullTime
		var homeTeamResult sql.NullString
		var awayTeamResult sql.NullString
		var homeTeamScore sql.NullInt64
		var awayTeamScore sql.NullInt64

		err := result.Scan(
			&matchInfo.ID,
			&matchInfo.Gameweek,
			&matchDatetime,
			&matchInfo.HomeTeamID,
			&homeTeamResult,
			&homeTeamScore,
			&matchInfo.AwayTeamID,
			&awayTeamResult,
			&awayTeamScore,
		)
		if err != nil {
			panic(err.Error())
		}

		// Check and assign values for HomeTeamResult
		if homeTeamResult.Valid {
			matchInfo.HomeTeamResult = homeTeamResult.String
		} else {
			matchInfo.HomeTeamResult = "" // Handle NULL case
		}

		// Check and assign values for AwayTeamResult
		if awayTeamResult.Valid {
			matchInfo.AwayTeamResult = awayTeamResult.String
		} else {
			matchInfo.AwayTeamResult = "" // Handle NULL case
		}

		// Check and assign values for HomeTeamScore
		if homeTeamScore.Valid {
			matchInfo.HomeTeamScore = int(homeTeamScore.Int64)
		} else {
			matchInfo.HomeTeamScore = 0 // Handle NULL case
		}

		// Check and assign values for AwayTeamScore
		if awayTeamScore.Valid {
			matchInfo.AwayTeamScore = int(awayTeamScore.Int64)
		} else {
			matchInfo.AwayTeamScore = 0 // Handle NULL case
		}

		// Check if matchDatetime is valid (not NULL)
		if matchDatetime.Valid {
			matchInfo.MatchDatetime = matchDatetime.Time
		}
	}

	return matchInfo, nil
}

func (mRepo *MatchInfoRepository) GetMatchInfoByGameweek(gameweek string) ([]model.MatchInfo, error) {
	result, err := mRepo.db.Query("SELECT * from matchinfo WHERE gameweek = ?", gameweek)
	if err != nil {
		panic(err.Error())
	}
	defer result.Close()

	var matchInfos []model.MatchInfo

	for result.Next() {
		var matchInfo model.MatchInfo
		var matchDatetime mysql.NullTime
		var homeTeamResult sql.NullString
		var awayTeamResult sql.NullString
		var homeTeamScore sql.NullInt64
		var awayTeamScore sql.NullInt64

		err := result.Scan(
			&matchInfo.ID,
			&matchInfo.Gameweek,
			&matchDatetime,
			&matchInfo.HomeTeamID,
			&homeTeamResult,
			&homeTeamScore,
			&matchInfo.AwayTeamID,
			&awayTeamResult,
			&awayTeamScore,
		)
		if err != nil {
			panic(err.Error())
		}

		// Check and assign values for HomeTeamResult
		if homeTeamResult.Valid {
			matchInfo.HomeTeamResult = homeTeamResult.String
		} else {
			matchInfo.HomeTeamResult = "" // Handle NULL case
		}

		// Check and assign values for AwayTeamResult
		if awayTeamResult.Valid {
			matchInfo.AwayTeamResult = awayTeamResult.String
		} else {
			matchInfo.AwayTeamResult = "" // Handle NULL case
		}

		// Check and assign values for HomeTeamScore
		if homeTeamScore.Valid {
			matchInfo.HomeTeamScore = int(homeTeamScore.Int64)
		} else {
			matchInfo.HomeTeamScore = 0 // Handle NULL case
		}

		// Check and assign values for AwayTeamScore
		if awayTeamScore.Valid {
			matchInfo.AwayTeamScore = int(awayTeamScore.Int64)
		} else {
			matchInfo.AwayTeamScore = 0 // Handle NULL case
		}

		// Check if matchDatetime is valid (not NULL)
		if matchDatetime.Valid {
			matchInfo.MatchDatetime = matchDatetime.Time
		}

		matchInfos = append(matchInfos, matchInfo)
	}

	return matchInfos, nil
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
