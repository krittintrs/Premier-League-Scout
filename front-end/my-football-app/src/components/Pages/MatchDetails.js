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
import Modal from "@mui/material/Modal";
import { Button } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import * as adminService from "../../services/adminService";
import { handleApiError } from "../../utils/apiUtils";
import { useEffect, useState } from "react";
import MatchDetail from "../MatchDetailPage/matchDetail";
import LineUpModal from "./LineUp";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { height } from "@mui/system";
import PlayerModal from "../MatchDetailPage/playerModal";

function MatchDetails() {
  const { matchId } = useParams();
  const navigate = useNavigate();

  const containerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
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
  const [open, setOpen] = useState(false);

  const [homeModalOpen, setHomeModalOpen] = useState(false);
  const [awayModalOpen, setAwayModalOpen] = useState(false);

  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const handleCollapseOpen = (player) => {
    setSelectedPlayer(player);
  };

  const handleCollapseClose = () => {
    setSelectedPlayer(null);
  };

  const handleHomeOpen = () => {
    setHomeModalOpen(true);
  };

  const handleAwayOpen = () => {
    setAwayModalOpen(true);
  };

  const handleHomeClose = () => {
    setHomeModalOpen(false);
  };

  const handleAwayClose = () => {
    setAwayModalOpen(false);
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
  }, [matchInfo, homeModalOpen, awayModalOpen]);

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
          <Button variant="contained" disableElevation onClick={handleHomeOpen}>
            Add Lineup
          </Button>
          <LineUpModal
            open={homeModalOpen}
            handleClose={handleHomeClose}
            side="Home Team"
            lineup={homeLineup?.length ? homeLineup : []}
            matchInfo={matchInfo || undefined}
          />
          <h2 className="team-name">
            {"Home Lineups: " + matchInfo?.homeTeamName}
          </h2>
          <Accordion>
            <AccordionSummary
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{ height: "40px" }}
              expandIcon={<ExpandMoreIcon />}
            >
              {/* Add your tab content here */}
              <span>
                <h4>Open Home Team Lineups</h4>
              </span>
            </AccordionSummary>
            <AccordionDetails>
              {homeLineup.map((player, index) => (
                <div key={index}>
                  {/* Button-like element triggering modal */}
                  <div
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() => handleCollapseOpen(player)}
                  >
                    <PlayerDividers player={player} />
                  </div>
                  {/* Modal */}
                  {selectedPlayer && (
                    <PlayerModal
                      open={selectedPlayer !== null}
                      handleClose={handleCollapseClose}
                      player={selectedPlayer}
                    />
                  )}
                </div>
              ))}
            </AccordionDetails>
          </Accordion>
        </Paper>

        {/* Away Team Lineup */}
        <Paper
          elevation={3}
          sx={{ p: 2, textAlign: "center", mb: 2, width: "35%" }}
        >
          <Button variant="contained" disableElevation onClick={handleAwayOpen}>
            Add Lineup
          </Button>
          <LineUpModal
            open={awayModalOpen}
            handleClose={handleAwayClose}
            side="Away Team"
            lineup={awayLineup?.length ? awayLineup : []}
            matchInfo={matchInfo || undefined}
          />
          <h2 className="team-name">
            {"Away Lineups: " + matchInfo?.awayTeamName}
          </h2>
          <Accordion>
            <AccordionSummary
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{ height: "40px" }}
              expandIcon={<ExpandMoreIcon />}
            >
              {/* Add your tab content here */}
              <span>
                <h4>Open Away Team Lineups</h4>
              </span>
            </AccordionSummary>
            <AccordionDetails>
              {awayLineup.map((player, index) => (
                <PlayerDividers key={index} player={player} />
              ))}
            </AccordionDetails>
          </Accordion>
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
    <div
      style={{ height: "100vh", width: "100vw", paddingTop: 3 }}
      className="w-full md:w-[350px] lg:w-[800px] m-auto "
    >
      <div style={{ height: "20vh", width: "100vw" }}>
        <img
          src="https://wallpapercave.com/wp/wp8859298.jpg"
          alt="Header Image"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
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
      </div>
    </div>
  );
}

export default MatchDetails;
