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
