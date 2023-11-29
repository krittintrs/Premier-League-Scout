import React from "react";
import Stack from '@mui/material/Stack';
import { Link } from "react-router-dom";

function MatchDetails() {
  const containerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh", // This ensures the container takes at least the full height of the viewport
  };

  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "100%",
    padding: "10px", // Add padding for spacing
    background:
      "linear-gradient(0deg, rgba(127.50, 127.50, 127.50, 0.60) 0%, rgba(127.50, 127.50, 127.50, 0.60) 100%)",
    borderRadius: 5,
  };

  const logoStyle = {
    maxWidth: "100%",
    maxHeight: "100%",
  };

  const headingStyle = {
    textAlign: "center",
    color: "black",
    fontSize: 48,
    fontFamily: "Inter",
    fontWeight: "700",
    textTransform: "uppercase",
    wordWrap: "break-word",
  };

  const DateStyle = {
    textAlign: "center",
    color: "black",
    fontSize: 32,
    fontFamily: "Inter",
    fontWeight: "600",
    textTransform: "uppercase",
    wordWrap: "break-word",
  };


 
  
  const TabDetails = () => {
    return (
      <div className="container">
        <div className="match">
            <div className="match-stadium">Stamford Bridge</div>
          <div className="match-content">
            <div className="column" style={{ textAlign: 'left' }}>
              <div className="team team--home">
                <div className="team-logo">
                  <img
                    src="https://assets.codepen.io/285131/chelsea.svg"
                    alt="Chelsea Logo"
                  />
                </div>
                <h2 className="team-name">Chelsea</h2>
              </div>
            </div>
            <div className="column">
              <div className="match-details" style={{ textAlign: 'center' }}>
                <div className="match-date">
                  3 May at <strong>17:30</strong>
                </div>
                <div className="match-score">
                  <span className="match-score-number match-score-number--leading">
                    3
                  </span>
                  <span className="match-score-divider">:</span>
                  <span className="match-score-number">1</span>
                </div>
                <div className="match-time-lapsed">72'</div>
                <div className="match-referee">
                  Referee: <strong>Mike dean</strong>
                </div>
                <div className="match-options" >
                <Stack spacing={2} direction="row">
                <Link to="/AddMatchEvent" className="match-option">
                <Stack spacing={2} direction="row">
                  <button className="match-option">ADD</button>
                  <button className="match-option">UPDATE</button>
                  <button className="match-option">DELETE</button>
                  </Stack>
                  </Link>
                </Stack>
                </div>
              </div>
            </div>
            <div className="column" style={{ textAlign: 'right' }}>
              <div className="team team--away">
                <div className="team-logo">
                  <img
                    src="https://resources.premierleague.com/premierleague/badges/t1.svg"
                    alt="Man Utd Logo"
                  />
                </div>
                <h2 className="team-name">Man Utd</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  

return (
    <div className="w-full md:w-[350px] lg:w-[800px] m-auto">
      <div style={headerStyle}>
        <img
          style={logoStyle}
          src="https://wallpapercave.com/wp/wp8859298.jpg"
          alt="Header Image"
        />
      </div>
      <div>
        <div style={headingStyle}>Match Week 1</div>
        <div style={DateStyle}>4 November 2023</div>
        <TabDetails/>
      </div>
    </div>
  );
};

export default MatchDetails;
