// MatchCard.js
import React from "react";
import "./matchDetail.css";
import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

function MatchDetail({ matchData }) {
  const navigate = useNavigate();

  if (!matchData) {
    // If matchData is undefined or null, you can handle it accordingly
    return null;
  }

  const homeTeamLogoSrc = matchData.homeTeamName
    ? `/images/clubs/${matchData.homeTeamName.replace(/\s+/g, "-")}.png`
    : null;

  const awayTeamLogoSrc = matchData.awayTeamName
    ? `/images/clubs/${matchData.awayTeamName.replace(/\s+/g, "-")}.png`
    : null;

  return (
    <div className="match">
      <div className="match-header">
        <div className="column">
          <h3 className="team-name team-name-home">{matchData.homeTeamName}</h3>
          <div className="team-logo team-logo-home">
            {homeTeamLogoSrc && (
              <img src={homeTeamLogoSrc} alt={`${matchData.homeTeamName} Logo`} />
            )}
          </div>
        </div>
        <div className="column">
          <div className="match-content">
            <div className="match-datetime">
              {matchData.matchDatetime &&
                new Date(matchData.matchDatetime).toLocaleString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                  timeZone: 'UTC',
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
              {awayTeamLogoSrc && (
                <img src={awayTeamLogoSrc} alt={`${matchData.awayTeamName} Logo`} />
              )}
            </div>
            <h3 className="team-name team-name-away">
              {matchData.awayTeamName}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MatchDetail;
