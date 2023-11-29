package repository

import (
	"back-end/internal/core/model"
	"database/sql"
)

type MatchEventRepository struct {
	db *sql.DB
}

func NewMatchEventRepo(db *sql.DB) *MatchEventRepository {
	return &MatchEventRepository{
		db: db,
	}
}

func (meRepo *MatchEventRepository) GetMatchEventByMatchID(matchID string) ([]model.MatchEvent, error) {
	result, err := meRepo.db.Query("SELECT * from matchevent where MatchID = ?", matchID)
	if err != nil {
		panic(err.Error())
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
			panic(err.Error())
		}
		matchEvents = append(matchEvents, matchEvent)
	}
	return matchEvents, nil
}

func (meRepo *MatchEventRepository) PostMatchEvent(matchEvent model.MatchEvent) error {
	query := `
		INSERT INTO matchevent (MatchID, MinuteOccur, EventType, ScorerPlayerID, AssistPlayerID, 
			SubInPlayerID, SubOutPlayerID, InjuredPlayerID, BookedPlayerID, BookedCardType)
		VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
	`

	_, err := meRepo.db.Exec(query, matchEvent.MatchID, matchEvent.MinuteOccur, matchEvent.EventType,
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
		WHERE MatchID = ?
	`

	_, err := meRepo.db.Exec(query, matchEvent.MinuteOccur, matchEvent.EventType,
		matchEvent.ScorerPlayerID, matchEvent.AssistPlayerID, matchEvent.SubInPlayerID,
		matchEvent.SubOutPlayerID, matchEvent.InjuredPlayerID, matchEvent.BookedPlayerID,
		matchEvent.BookedCardType, matchEvent.MatchID)
	if err != nil {
		return err
	}

	return nil
}

func (meRepo *MatchEventRepository) DeleteMatchEvent(matchEvent model.MatchEvent) error {
	query := `
		DELETE FROM matchevent WHERE MatchID = ?
	`

	_, err := meRepo.db.Exec(query, matchEvent.MatchID)
	if err != nil {
		return err
	}

	return nil
}
