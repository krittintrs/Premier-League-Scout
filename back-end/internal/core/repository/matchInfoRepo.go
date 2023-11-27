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
