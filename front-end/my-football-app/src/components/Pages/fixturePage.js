import React, { useEffect, useState } from "react";
import ColorButtons from "../FixturePage/ColorButtons"; // Import the Button component
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import MatchCard from "../FixturePage/MatchCard";
import { useNavigate } from "react-router-dom";
import * as userService from "../../services/userService";
import { handleApiError } from "../../utils/apiUtils";

const containerStyle = {
  // Define your styles for the container here
  // For example:
  marginTop: 20,
  padding: 10,
  backgroundColor: "#fff",
};

const FixturePage = () => {
  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start", // Adjust this property
    width: "100%",
    height: "100%",
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

  const [matchInfo, setMatchInfo] = useState([]);
  const [gameweek, setGameweek] = useState(1);

  const getCurrentGameweek = async () => {
    try {
      const data = await userService.getCurrentGameweek();
      setGameweek(data);
    } catch (error) {
      console.error('Error fetching current gameweek:', error);
      // Add additional error handling or user feedback if needed
    }
  };
  
  const loadMatchInfo = async () => {
    try {
      console.log(gameweek);
      const data = await userService.getMatchFixture(gameweek);
      setMatchInfo(data);
    } catch (error) {
      console.error('Error fetching match fixtures:', error);
      // Add additional error handling or user feedback if needed
    }
  };

  useEffect(() => {
    // Load the user's data from the API
    loadMatchInfo();
  }, []); 

  useEffect(() => {
    // Log the updated matchInfo
    console.log(matchInfo);
  }, [matchInfo]); 

  return (
    <Box>
      <Box>
        <div style={headerStyle}>
          <img
            style={logoStyle}
            src="https://wallpapercave.com/wp/wp8859298.jpg"
            alt="Header Image"
          />
        </div>
        <div>
          <div style={headingStyle}>
            {matchInfo.length > 0 && `Match Week ${matchInfo[0].gameweek}`}
          </div>
        </div>
      </Box>
      <Box sx={{ width: "100%" }}>
        <Paper>
          <Stack
            direction="row"
            justifyContent="left"
            alignItems="left"
            padding={1}
          >
            <img
              src="https://assets.codepen.io/285131/pl-logo.svg"
              alt="EPL Logo"
            />
            <h2> English Premier League</h2>
          </Stack>
        </Paper>
        {matchInfo.map((match, index) => (
          <React.Fragment key={index}>
            {index === 0 ||
            new Date(match.matchDatetime).toLocaleDateString() !==
              new Date(
                matchInfo[index - 1].matchDatetime
              ).toLocaleDateString() ? (
              <React.Fragment>
                <div style={DateStyle}>
                  {new Date(match.matchDatetime)
                    .toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      timeZone: 'UTC',
                    })
                    .replace(",", "")}
                </div>
              </React.Fragment>
            ) : null}
            <MatchCard matchData={match} />
          </React.Fragment>
        ))}
      </Box>
      <div style={containerStyle}>
        <ColorButtons />
      </div>
    </Box>
  );
};
export default FixturePage;
