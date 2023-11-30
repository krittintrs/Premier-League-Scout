// MatchCard.js
import React from "react";
import "./MatchCard.css";
import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

function MatchCard({ matchData }) {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate(`/MatchDetails/${matchData.id}`);
  };

  return (
    <div className="match">
      <div className="match-header">
        <div className="match-status">Live</div>
        <div className="column">
          <h3 className="team-name team-name-home">{matchData.homeTeamName}</h3>
          <div className="team-logo team-logo-home">
            <img
              src={`/images/clubs/${matchData.homeTeamName.replace(
                /\s+/g,
                "-"
              )}.png`}
              alt={`${matchData.homeTeamName} Logo`}
            />
          </div>
        </div>
        <div className="column">
          <div className="match-content">
            <div className="match-datetime">
              {new Date(matchData.matchDatetime).toLocaleString("en-US", {
                timeZone: "Asia/Bangkok",
                hour: "numeric",
                minute: "numeric",
              })}
            </div>
            <div className="match-score">
              <span className="match-score-number match-score-number--leading">
                {matchData.homeTeamScore}
              </span>
              <span className="match-score-divider"> - </span>
              <span className="match-score-number">
                {matchData.awayTeamScore}
              </span>
            </div>
          </div>
        </div>
        <div className="column">
          <div className="team team--away">
            <div className="team-logo team-logo-away">
              <img
                src={`/images/clubs/${matchData.awayTeamName.replace(
                  /\s+/g,
                  "-"
                )}.png`}
                alt={`${matchData.awayTeamName} Logo`}
              />
            </div>
            <h3 className="team-name team-name-away">
              {matchData.awayTeamName}
            </h3>
          </div>
        </div>
        <div className="match-actions">
          <Button className="btn-icon" onClick={handleButtonClick}>
            Add Details
          </Button>
        </div>
      </div>
    </div>
  );
}

export default MatchCard;
