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
  
  useEffect(() => {
    loadMatchInfo();
  }, [matchId]);
  
  // Only loadTeam if matchInfo is defined and has changed
  useEffect(() => {
    if (matchInfo) {
      console.log(matchInfo)
      if(matchInfo){
        loadTeam();
      }
    }
  }, [matchInfo]);

  const TabDetails = () => {
    return (
        <div >
          <div className="match-content">
            <div className="column" style={{ textAlign: "left" }}>
            </div>
            <div className="column">
              <div className="match-details" style={{ textAlign: "center" }}>
                <div className="match-date">
                  {matchInfo?.MatchDateTime} at <strong>{team?.teamStadium}</strong>
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

  const Item = ({ children }) => (
    <Paper
      sx={{
        p: 2,
        textAlign: "center",
        color: "text.secondary",
        width: "1000px",
        height: "500px",
      }}
    >
      {children}
    </Paper>
  );

  const ColumnsGrid = () => (
    <div>
      <Stack
        direction={"row"}
        justifyContent="center"
        spacing={20}
        sx={{ width: "100%", Height: "100%" }}
      >
        <Item>
          <div>Team Line Up </div>
          <ListDividers />
        </Item>
      </Stack>
    </div>
  );

  const style = {
    width: "100%",
    maxWidth: 360,
  };

  const ListDividers = () => (
    <Stack direction="row" spacing={2}>
      {/* First Column */}
      <List sx={style} component="nav" aria-label="mailbox folders">
        <ListItem button>
          <ListItemText primary="Inbox" />
        </ListItem>
        <Divider />
        <ListItem button divider>
          <ListItemText primary="Drafts" />
        </ListItem>
      </List>

      {/* Second Column */}
      <List sx={style} component="nav" aria-label="mailbox folders">
        <ListItem button>
          <ListItemText primary="Trash" />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemText primary="Spam" />
        </ListItem>
      </List>
    </Stack>
  );

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
        <ColumnsGrid />
      </div>
    </div>
  );
}

export default MatchDetails;
