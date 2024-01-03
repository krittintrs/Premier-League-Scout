package repository

import (
	mysql2 "back-end/database/mysql"
	"back-end/internal/core/model"
)

type MatchEventRepository struct {
	masterDB *mysql2.MasterDB
}

func NewMatchEventRepo(mdb *mysql2.MasterDB) *MatchEventRepository {
	return &MatchEventRepository{
		masterDB: mdb,
	}
}

func (meRepo *MatchEventRepository) GetMatchEventByMatchID(matchID string) ([]model.MatchEvent, error) {
	result, err := meRepo.masterDB.DB.Query("SELECT * from matchevent where MatchID = ?", matchID)
	if err != nil {
		return nil, err
	}
	defer result.Close()

	var matchEvents []model.MatchEvent
	for result.Next() {
		var matchEvent model.MatchEvent
		err := result.Scan(&matchEvent.ID, &matchEvent.MatchID, &matchEvent.MinuteOccur, &matchEvent.EventType,
			&matchEvent.ScorerPlayerID, &matchEvent.AssistPlayerID, &matchEvent.SubInPlayerID,
			&matchEvent.SubOutPlayerID, &matchEvent.InjuredPlayerID, &matchEvent.BookedPlayerID,
			&matchEvent.BookedCardType)
		if err != nil {
			return nil, err
		}
		matchEvents = append(matchEvents, matchEvent)
	}
	return matchEvents, nil
}

func (meRepo *MatchEventRepository) GetMatchEventByID(matchEventID string) (model.MatchEvent, error) {
	result, err := meRepo.masterDB.DB.Query("SELECT * from matchevent where id = ?", matchEventID)
	if err != nil {
		return model.MatchEvent{}, err
	}
	defer result.Close()

	var matchEvent model.MatchEvent
	for result.Next() {
		err := result.Scan(&matchEvent.ID, &matchEvent.MatchID, &matchEvent.MinuteOccur, &matchEvent.EventType,
			&matchEvent.ScorerPlayerID, &matchEvent.AssistPlayerID, &matchEvent.SubInPlayerID,
			&matchEvent.SubOutPlayerID, &matchEvent.InjuredPlayerID, &matchEvent.BookedPlayerID,
			&matchEvent.BookedCardType)
		if err != nil {
			return model.MatchEvent{}, err
		}
	}
	return matchEvent, nil
}

func (meRepo *MatchEventRepository) PostMatchEvent(matchEvent model.MatchEvent) error {
	query := `
		INSERT INTO matchevent (MatchID, MinuteOccur, EventType, ScorerPlayerID, AssistPlayerID, 
			SubInPlayerID, SubOutPlayerID, InjuredPlayerID, BookedPlayerID, BookedCardType)
		VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
	`

	_, err := meRepo.masterDB.DB.Exec(query, matchEvent.MatchID, matchEvent.MinuteOccur, matchEvent.EventType,
		matchEvent.ScorerPlayerID, matchEvent.AssistPlayerID, matchEvent.SubInPlayerID,
		matchEvent.SubOutPlayerID, matchEvent.InjuredPlayerID, matchEvent.BookedPlayerID,
		matchEvent.BookedCardType)
	if err != nil {
		return err
	}

	return nil
}

func (meRepo *MatchEventRepository) UpdateMatchEvent(matchEvent model.MatchEvent) error {
	query := `
		UPDATE matchevent SET MinuteOccur = ?, EventType = ?, ScorerPlayerID = ?, AssistPlayerID = ?, 
			SubInPlayerID = ?, SubOutPlayerID = ?, InjuredPlayerID = ?, BookedPlayerID = ?, BookedCardType = NULLIF(?, '')
		WHERE ID = ?
	`

	_, err := meRepo.masterDB.DB.Exec(query, matchEvent.MinuteOccur, matchEvent.EventType,
		matchEvent.ScorerPlayerID, matchEvent.AssistPlayerID, matchEvent.SubInPlayerID,
		matchEvent.SubOutPlayerID, matchEvent.InjuredPlayerID, matchEvent.BookedPlayerID,
		matchEvent.BookedCardType, matchEvent.MatchID)
	if err != nil {
		return err
	}

	return nil
}

func (meRepo *MatchEventRepository) DeleteMatchEvent(id string) error {
	query := `
		DELETE FROM matchevent WHERE ID = ?
	`

	_, err := meRepo.masterDB.DB.Exec(query, id)
	if err != nil {
		return err
	}

	return nil
}
