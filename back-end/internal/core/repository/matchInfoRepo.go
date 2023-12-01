package repository

import (
	mysql2 "back-end/database/mysql"
	"back-end/internal/core/model"
	"database/sql"
	"errors"
	"fmt"

	"github.com/go-sql-driver/mysql"
)

type MatchInfoRepository struct {
	masterDB *mysql2.MasterDB
}

func NewMatchInfoRepo(mdb *mysql2.MasterDB) *MatchInfoRepository {
	return &MatchInfoRepository{
		masterDB: mdb,
	}
}

func (mRepo *MatchInfoRepository) GetMatchInfo() ([]model.MatchInfo, error) {
	query := `
	SELECT 
		m.id, m.gameweek, m.matchDatetime,
		m.homeTeamID, ht.TeamName AS homeTeamName, m.homeTeamResult, m.homeTeamScore,
		m.awayTeamID, at.TeamName AS awayTeamName, m.awayTeamResult, m.awayTeamScore
	FROM matchinfo m
	JOIN team ht ON m.homeTeamID = ht.id
	JOIN team at ON m.awayTeamID = at.id
	`
	result, err := mRepo.masterDB.DB.Query(query)
	if err != nil {
		return nil, err
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
			&matchInfo.ID, &matchInfo.Gameweek, &matchDatetime,
			&matchInfo.HomeTeamID, &matchInfo.HomeTeamName, &homeTeamResult, &homeTeamScore,
			&matchInfo.AwayTeamID, &matchInfo.AwayTeamName, &awayTeamResult, &awayTeamScore,
		)
		if err != nil {
			return nil, err
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
	query := `
		SELECT 
			m.id, m.gameweek, m.matchDatetime,
			m.homeTeamID, ht.TeamName AS homeTeamName, m.homeTeamResult, m.homeTeamScore,
			m.awayTeamID, at.TeamName AS awayTeamName, m.awayTeamResult, m.awayTeamScore
		FROM matchinfo m
		JOIN team ht ON m.homeTeamID = ht.id
		JOIN team at ON m.awayTeamID = at.id
		WHERE m.id = ?`

	result, err := mRepo.masterDB.DB.Query(query, id)
	if err != nil {
		return model.MatchInfo{}, err
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
			&matchInfo.ID, &matchInfo.Gameweek, &matchDatetime,
			&matchInfo.HomeTeamID, &matchInfo.HomeTeamName, &homeTeamResult, &homeTeamScore,
			&matchInfo.AwayTeamID, &matchInfo.AwayTeamName, &awayTeamResult, &awayTeamScore,
		)
		if err != nil {
			return model.MatchInfo{}, err
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
	query := `
	SELECT m.id, m.gameweek, m.matchDatetime, m.homeTeamID, ht.TeamName AS homeTeamName, 
	m.homeTeamResult, m.homeTeamScore, m.awayTeamID, at.TeamName AS awayTeamName, m.awayTeamResult, m.awayTeamScore 
	FROM matchinfo m JOIN team ht ON m.homeTeamID = ht.id 
	JOIN team at ON m.awayTeamID = at.id 
	WHERE m.gameweek = ? 
	order by matchDatetime`

	result, err := mRepo.masterDB.DB.Query(query, gameweek)
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
			&matchInfo.ID, &matchInfo.Gameweek, &matchDatetime,
			&matchInfo.HomeTeamID, &matchInfo.HomeTeamName, &homeTeamResult, &homeTeamScore,
			&matchInfo.AwayTeamID, &matchInfo.AwayTeamName, &awayTeamResult, &awayTeamScore,
		)
		if err != nil {
			return nil, err
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

func (mRepo *MatchInfoRepository) GetCurrentGameweek() (int, error) {
	query := `
        SELECT gameweek
        FROM matchinfo
        WHERE matchDatetime > NOW()
        ORDER BY matchDatetime
        LIMIT 1`

	var gameweek int
	err := mRepo.masterDB.DB.QueryRow(query).Scan(&gameweek)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return 0, fmt.Errorf("no current gameweek found")
		}
		return 0, err
	}

	return gameweek, nil
}

func (mRepo *MatchInfoRepository) UpdateMatchInfo(matchInfo model.MatchInfo) error {
	query := `
		UPDATE matchinfo
		SET  homeTeamResult = ?, homeTeamScore = ?, 
			 awayTeamResult = ?, awayTeamScore = ?
		WHERE id = ?`

	_, err := mRepo.masterDB.DB.Exec(query, matchInfo.HomeTeamResult, matchInfo.HomeTeamScore,
		matchInfo.AwayTeamResult, matchInfo.AwayTeamScore, matchInfo.ID)
	if err != nil {
		return err
	}

	return nil
}
