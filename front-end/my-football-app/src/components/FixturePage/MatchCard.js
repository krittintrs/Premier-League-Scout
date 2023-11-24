import React from 'react';
import './MatchCard.css';
import { Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

function MatchCard({ matchData }) {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/MatchDetails'); 
  };

  return (
    <div className="match">
      <div className="match-header">
        <div className="match-status">Live</div>
        <div className="column">
          <h3 className="team-name team-name-home">Chelsea</h3>
          <div className="team-logo team-logo-home">
            <img src="https://assets.codepen.io/285131/chelsea.svg" alt="Chelsea Logo" />
          </div>
        </div>
        <div className="column">
          <div className="match-score">
            <span className="match-score-number match-score-number--leading">3</span>
            <span className="match-score-divider"> - </span>
            <span className="match-score-number">1</span>
          </div>
        </div>
        <div className="column">
          <div className="team team--away">
            <div className="team-logo team-logo-away">
              <img
                src="https://resources.premierleague.com/premierleague/badges/t1.svg"
                alt="Man Utd Logo"
              />
            </div>
            <h3 className="team-name team-name-away">Man Utd</h3>
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

