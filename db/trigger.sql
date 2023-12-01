-- Trigger to update player.isInjured to true when inserting into conditionedPlayer with conditionType 'injured'
DELIMITER //
CREATE TRIGGER trg_setInjured
    AFTER INSERT ON conditionedPlayer
    FOR EACH ROW
BEGIN
    IF NEW.conditionType = 'injured' THEN
        UPDATE player
        SET isInjured = TRUE
        WHERE id = NEW.playerID;
    END IF;
END;
//
DELIMITER ;

-- Trigger to update player.isBanned to true when inserting into conditionedPlayer with conditionType 'booked'
DELIMITER //
CREATE TRIGGER trg_setBanned
    AFTER INSERT ON conditionedPlayer
    FOR EACH ROW
BEGIN
    IF NEW.conditionType = 'booked' THEN
        UPDATE player
        SET isBanned = TRUE
        WHERE id = NEW.playerID;
    END IF;
END;
//
DELIMITER ;

DELIMITER //

CREATE TRIGGER trg_updateMatchInfo
    BEFORE INSERT ON matchEvent
    FOR EACH ROW
BEGIN
    DECLARE teamSide ENUM('HOME', 'AWAY');

    -- Determine team side based on scorer playerID
    SELECT side INTO teamSide
    FROM lineUp
    WHERE matchID = NEW.matchID AND playerID = NEW.scorerPlayerID;

    -- Update matchInfo based on team side
    IF teamSide = 'HOME' THEN
        IF (SELECT homeTeamScore FROM matchInfo WHERE id = NEW.matchID) IS NULL THEN
            UPDATE matchInfo
            SET homeTeamScore = 1
            WHERE id = NEW.matchID;
        ELSE
            UPDATE matchInfo
            SET homeTeamScore = homeTeamScore + 1
            WHERE id = NEW.matchID;
        END IF;
    ELSE
        IF (SELECT awayTeamScore FROM matchInfo WHERE id = NEW.matchID) IS NULL THEN
            UPDATE matchInfo
            SET awayTeamScore = 1
            WHERE id = NEW.matchID;
        ELSE
            UPDATE matchInfo
            SET awayTeamScore = awayTeamScore + 1
            WHERE id = NEW.matchID;
        END IF;
    END IF;
END;

//

DELIMITER ;
