import React from "react";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import { Button } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import * as adminService from "../../services/adminService";
import { handleApiError } from "../../utils/apiUtils";
import { useEffect, useState } from "react";
import MatchDetail from "../MatchDetailPage/matchDetail";

function MatchDetails() {
  const { matchId } = useParams();
  const navigate = useNavigate();

  const containerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
  };

  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "100%",
    padding: "10px",
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

  const [matchInfo, setMatchInfo] = useState();
  const [team, setTeam] = useState();
  const [homeLineup, setHomeLineup] = useState([]);
  const [awayLineup, setAwayLineup] = useState([]);
  const [homeselectedPlayers, setHomeSelectedPlayers] = useState([]);
  const [awayselectedPlayers, setAwaySelectedPlayers] = useState([]);

  const addHomeToLineup = (player) => {
    setHomeLineup((prevLineup) => [...prevLineup, player]);
    removeHomeFromSelected(player);
  };

  const addAwayToLineup = (player) => {
    setAwayLineup((prevLineup) => [...prevLineup, player]);
    removeAwayFromSelected(player);
  };

  const removeHomeFromSelected = (player) => {
    setHomeSelectedPlayers((prevSelected) =>
      prevSelected.filter((selected) => selected !== player)
    );
  };

  const removeAwayFromSelected = (player) => {
    setAwaySelectedPlayers((prevSelected) =>
      prevSelected.filter((selected) => selected !== player)
    );
  };

  const loadMatchInfo = async () => {
    try {
      const data = await adminService.getMatchDetails(matchId);
      setMatchInfo(data);
    } catch (error) {
      handleApiError(error);
    }
  };

  const loadTeam = async () => {
    try {
      // Check if matchInfo is defined before making the request
      if (matchInfo && matchInfo.homeTeamID) {
        console.log("teamid: " + matchInfo.homeTeamID);
        const data = await adminService.getTeam(matchInfo.homeTeamID);
        setTeam(data);
        console.log(data);
      } else {
        // Handle the case where matchInfo is undefined or homeTeamId is missing
        console.error("Match information is undefined or missing homeTeamId");
      }
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleHomeDone = () => {
    // TODO: Implement logic to post lineup to the database

    console.log("Lineup Posted:", homeLineup);
    // Reset selected players after posting lineup
    setHomeSelectedPlayers([]);
  };

  const handleAwayDone = () => {
    // TODO: Implement logic to post lineup to the database

    console.log("Lineup Posted:", awayLineup);
    setAwaySelectedPlayers([]);
  };

  const handleHomeCancel = () => {
    // Reset selected players without adding to lineup
    setHomeSelectedPlayers([]);
  };

  const handleAwayCancel = () => {
    // Reset selected players without adding to lineup
    setAwaySelectedPlayers([]);
  };

  const loadLineup = async () => {
    try {
      // Check if matchInfo is defined before making the request
      if (matchInfo && matchInfo.id) {
        console.log("lineup match: " + matchInfo.id);
        const data = await adminService.GetLineups(matchInfo.id);

        // Separate home and away lineups based on the 'side' property
        const homeLineup = data.filter((player) => player.side === "HOME");
        const awayLineup = data.filter((player) => player.side === "AWAY");

        setHomeLineup(homeLineup);
        setAwayLineup(awayLineup);

        console.log("Home Lineup:", homeLineup);
        console.log("Away Lineup:", awayLineup);
      } else {
        // Handle the case where matchInfo is undefined or homeTeamId is missing
        console.error("Match information is undefined or missing homeTeamId");
      }
    } catch (error) {
      handleApiError(error);
    }
  };

  useEffect(() => {
    loadMatchInfo();
  }, [matchId]);

  useEffect(() => {
    if (matchInfo) {
      console.log(matchInfo);
      if (matchInfo) {
        loadTeam();
        loadLineup();
      }
    }
  }, [matchInfo]);

  const TabDetails = () => {
    return (
      <div>
        <div className="match-content">
          <div className="column" style={{ textAlign: "left" }}></div>
          <div className="column">
            <div className="match-details" style={{ textAlign: "center" }}>
              <div className="match-date">
                {matchInfo?.MatchDateTime} at{" "}
                <strong>{team?.teamStadium}</strong>
              </div>
              <div className="match-options" style={{ position: "relative" }}>
                <Stack spacing={2} direction="row">
                  <Link to="/AddMatchEvent" className="match-option">
                    <Stack direction="row" spacing={5}>
                      <button className="match-option">ADD</button>
                      <button className="match-option">UPDATE</button>
                      <button className="match-option">DELETE</button>
                    </Stack>
                  </Link>
                </Stack>
              </div>
            </div>
          </div>
          <div className="column" style={{ textAlign: "right" }}>
            <h2 className="team-name">{matchInfo?.awayTeam}</h2>
          </div>
        </div>
      </div>
    );
  };

  const LineupGrid = () => {
    return (
      <Stack
        justifyContent="center"
        divider={<Divider orientation="vertical" flexItem />}
        padding={1}
        width={"100%"}
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
      >
        {/* Home Team Lineup */}
        <Paper
          elevation={3}
          sx={{ p: 2, textAlign: "center", mb: 2, width: "35%" }}
        >
          <h2 className="team-name">
            {"Home Lineups: " + matchInfo?.homeTeamName}
          </h2>
          {homeLineup.map((player, index) => (
            <PlayerDividers key={index} player={player} />
          ))}
        </Paper>

        {/* Away Team Lineup */}
        <Paper
          elevation={3}
          sx={{ p: 2, textAlign: "center", mb: 2, width: "35%" }}
        >
          <h2 className="team-name">
            {"Away Lineups: " + matchInfo?.awayTeamName}
          </h2>
          {awayLineup.map((player, index) => (
            <PlayerDividers key={index} player={player} />
          ))}
        </Paper>
      </Stack>
    );
  };

  const PlayerDividers = ({ player }) => {
    return (
      <Paper
        elevation={3}
        sx={{
          p: 1,
          textAlign: "center",
          cursor: "pointer",
          mb: 2,
          width: "100%",
          borderRadius: "10px", // Adjust the border radius for rounded edges
          height: "40px", // Adjust the height as needed
          fontSize: "10px", // Adjust the font size as needed
        }}
      >
        <Stack direction="row" spacing={1}>
          <ListItemText primary={`${player.position}`} />
          <Divider />
          <ListItemText primary={`${player.playerName}`} />
          <Divider />
          <ListItemText primary={`${player.shirtNo}`} />
        </Stack>
      </Paper>
    );
  };

  const matchDate = matchInfo?.matchDatetime
    ? new Date(matchInfo.matchDatetime)
    : null;
  const formattedDate = matchDate
    ? matchDate.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "UTC",
      })
    : "";

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
        <div style={headingStyle}>
          Match Week{" "}
          {matchInfo?.gameweek !== undefined ? matchInfo.gameweek : ""}
        </div>
        <div style={DateStyle}>{formattedDate}</div>
        <MatchDetail matchData={matchInfo ?? []} />
        <TabDetails />
        <LineupGrid />
        <AddLinupGrid/>
      </div>
    </div>
  );
}

export default MatchDetails;
