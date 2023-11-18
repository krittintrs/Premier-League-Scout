DROP DATABASE IF EXISTS eplScout; 
CREATE DATABASE IF NOT EXISTS eplScout;
USE eplScout;
CREATE TABLE team(
	id INT					NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
    teamName VARCHAR(50)	NOT NULL,
    teamStadium VARCHAR(50)	NOT NULL
);

CREATE TABLE player(
	id INT					NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(100),
    middleName VARCHAR(100),
    lastName VARCHAR(100)	NOT NULL,
    shirtNo DECIMAL(2, 0),
	birthDate DATE,
	position ENUM('Goalkeeper', 'Defender', 'Midfielder', 'Forward') NOT NULL,
	isBanned BOOL,
    isInjured BOOL,
	teamID INT				NOT NULL,
    CONSTRAINT fk_PlayerTeamID FOREIGN KEY (teamID) REFERENCES team(id)
);

CREATE TABLE matchInfo(
	id INT										NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
    gameweek DECIMAL(2, 0)						NOT NULL,
    matchDatetime DATETIME,
    homeTeamID INT								NOT NULL,
    homeTeamResult ENUM('WIN', 'DRAW', 'LOSE'),
    homeTeamScore INT,
    awayTeamID INT								NOT NULL,
    awayTeamResult ENUM('WIN', 'DRAW', 'LOSE'),
    awayTeamScore INT,
    CONSTRAINT fk_MatchHomeTeamID FOREIGN KEY (homeTeamID) REFERENCES team(id),
    CONSTRAINT fk_MatchAwayTeamID FOREIGN KEY (awayTeamID) REFERENCES team(id)
);

CREATE TABLE lineUp(
	matchID INT					NOT NULL,
    playerID INT				NOT NULL,
    side ENUM('HOME', 'AWAY')	NOT NULL,
    shirtNo DECIMAL(2, 0)		NOT NULL,
    position VARCHAR(30)		NOT NULL,
    CONSTRAINT pk_lineUp PRIMARY KEY (matchID, playerID),
    CONSTRAINT fk_LUmatchID FOREIGN KEY (matchID) REFERENCES matchInfo(id),
    CONSTRAINT fk_LUplayerID FOREIGN KEY (playerID) REFERENCES player(id)
);

CREATE TABLE matchEvent(
	id INT						NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
    matchID INT					NOT NULL,
    minuteOccur DECIMAL(4, 2)	NOT NULL,
    eventType VARCHAR(30)		NOT NULL,
    scorerPlayerID INT,
    assistPlayerID INT,
    subInPlayerID INT,
    subOutPlayerID INT,
    injuredPlayerID INT,
    bookedPlayerID INT,
    bookedCardType ENUM('YELLOW', 'RED', 'SECONDYELLOW'),
    CONSTRAINT fk_EventScore FOREIGN KEY (matchID, scorerPlayerID) REFERENCES lineUp(matchID, playerID),
    CONSTRAINT fk_EventAssist FOREIGN KEY (matchID, assistPlayerID) REFERENCES lineUp(matchID, playerID),
    CONSTRAINT fk_EventSubIn FOREIGN KEY (matchID, subInPlayerID) REFERENCES lineUp(matchID, playerID),
    CONSTRAINT fk_EventSubOut FOREIGN KEY (matchID, subOutPlayerID) REFERENCES lineUp(matchID, playerID),
    CONSTRAINT fk_EventInjured FOREIGN KEY (matchID, injuredPlayerID) REFERENCES lineUp(matchID, playerID),
    CONSTRAINT fk_EventBooked FOREIGN KEY (matchID, bookedPlayerID) REFERENCES lineUp(matchID, playerID),
    CONSTRAINT chk_EventMin CHECK (minuteOccur BETWEEN 0 AND 90)
);

CREATE TABLE conditionedPlayer(
	id INT						NOT NULL UNIQUE AUTO_INCREMENT,
    playerID INT				NOT NULL,
    matchID INT 				NOT NULL,
    conditionType VARCHAR(30)	NOT NULL,
    initialDate DATE			NOT NULL,
    duration INT				NOT NULL,
    CONSTRAINT pk_Cond PRIMARY KEY (id, playerID),
    CONSTRAINT fk_CondPlayerID FOREIGN KEY (playerID) REFERENCES player(id),
    CONSTRAINT fk_CondMatchID FOREIGN KEY (matchID) REFERENCES matchInfo(id)
);
