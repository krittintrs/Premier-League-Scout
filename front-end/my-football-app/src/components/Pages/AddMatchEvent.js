import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import { RadioGroup, FormControlLabel, Radio } from "@mui/material";
import * as adminService from "../../services/adminService";

const DemoPaper = styled(Paper)(({ theme }) => ({
  width: 1292,
  height: 550,
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  margin: "16px",
  position: "relative",
}));

const InnerPaper = styled(Paper)(({ theme }) => ({
  width: 1250,
  height: 250,
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: "left",
  position: "absolute",
  top: "35%",
  marginTop: "20px",
}));

const DoneButton = styled("div")({
  position: "absolute",
  bottom: "5%",
  left: "90%",
});

const EventBar = ({ onSelectTeam }) => {
  return (
    <div
      variant="solid"
      size="lg"
      aria-label="solid button group"
      sx={{
        width: "10000px",
        height: "75px",
        position: "absolute",
        top: "0px",
        right: "10px",
      }}
    >
      <Stack
        direction="row"
        spacing={2}
        sx={{
          p: 2,
          width: "100%",
          height: "75px",
        }}
      >
        <Button onClick={() => onSelectTeam("score")}>Score</Button>
        <Button onClick={() => onSelectTeam("sub")}>Sub</Button>
        <Button onClick={() => onSelectTeam("injured")}>Injured</Button>
        <Button onClick={() => onSelectTeam("foul")}>Foul</Button>
      </Stack>
    </div>
  );
};

const eventTypes = [
  { key: "score", label: "Score" },
  { key: "sub", label: "Sub" },
  { key: "injured", label: "Injured" },
  { key: "foul", label: "Foul" },
  // Add more event types as needed
];

const AddMatchEvent = () => {
  const { matchId } = useParams();
  const navigate = useNavigate();
  const [activeTeam, setActiveTeam] = useState("HOME");
  const handleActiveTeam = (event) => {
    setActiveTeam(event.target.value);
  };
  const [selectedEvent, setSelectedEvent] = useState("");

  const [matchInfo, setMatchInfo] = useState({});
  const [homeLineup, setHomeLineup] = useState([]);
  const [awayLineup, setAwayLineup] = useState([]);
  const [matchEvent, setMatchEvent] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState({});

  const onSelectTeam = (eventType) => {
    console.log("Selected Event:", eventType);
    setSelectedEvent(eventType);
  };

  const loadLineup = async () => {
    try {
      const data = await adminService.getMatchLineup(matchId);
      const homeLineup = data.filter((item) => item.side === "HOME");
      const awayLineup = data.filter((item) => item.side === "AWAY");
      setHomeLineup(homeLineup);
      setAwayLineup(awayLineup);
    } catch (error) {
      console.error("Error fetching match lineup:", error);
      // Add additional error handling or user feedback if needed
    }
  };

  const handlePlayerChange = (event) => {
    if (activeTeam === "HOME") {
      const playerId = parseInt(event.target.value, 10);
      const player = homeLineup.find((p) => p.id === playerId);

      // console.log("Selected Player:", player);
      setSelectedPlayer(player);
    } else if (activeTeam === "AWAY") {
      const playerId = parseInt(event.target.value, 10);
      const player = awayLineup.find((p) => p.id === playerId);

      // console.log("Selected Player:", player);
      setSelectedPlayer(player);
    }
  };

  useEffect(() => {
    // Load the user's data from the API
    loadLineup();
  }, []);

  return (
    <div>
      <DemoPaper square={false}>
        <Typography variant="h6" gutterBottom>
          <h2> ADD/UPDATE Match Event </h2>
        </Typography>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            p: 2,
            width: "100%",
            height: "75px",
            justifyContent: "space-between",
          }}
        >
          <div>
            <RadioGroup row value={activeTeam} onChange={handleActiveTeam}>
              <FormControlLabel
                value="HOME"
                control={<Radio color="primary" />}
                label="Home"
              />
              <FormControlLabel
                value="AWAY"
                control={<Radio color="primary" />}
                label="Away"
              />
            </RadioGroup>
          </div>

          <EventBar onSelectTeam={onSelectTeam} />
        </Stack>
        {eventTypes.map((eventType) =>
          generateInnerPaperContent(
            activeTeam,
            selectedEvent,
            eventType.key,
            homeLineup,
            awayLineup,
            handlePlayerChange,
            activeTeam
          )
        )}

        <DoneButton>
          <Link to="/MatchDetails">
            <Stack direction="row" spacing={2}>
              <Button variant="outlined">DONE</Button>
            </Stack>
          </Link>
        </DoneButton>
      </DemoPaper>
    </div>
  );
};

const generateInnerPaperContent = (
  team,
  selectedEvent,
  eventTypeKey,
  homeLineup,
  awayLineup,
  handlePlayerChange,
  activeTeam
) => {
  const contentMap = {
    score: (
      <InnerPaper key="score">
        <Typography variant="h6" gutterBottom>
          <h3>TIME : {team === "A" ? "aaaaa" : "bbbb"}</h3>
          <h3>Scorer’s Name : </h3>
          <h3>Assister’s Name : </h3>
        </Typography>
      </InnerPaper>
    ),
    sub: (
      <InnerPaper key="sub">
        <Stack direction="row" spacing={2}>
          <Typography variant="h6" gutterBottom>
            <h3>TIME :</h3>
          </Typography>
          <TextField id="outlined-basic" variant="filled" />
        </Stack>
        <Stack direction="row" spacing={2}>
          <Typography variant="h6" gutterBottom>
            <h3>SubIn : </h3>
          </Typography>
          <select value={homeLineup?.playerID} onChange={handlePlayerChange}>
            {activeTeam === "Home" &&
              homeLineup.map((player) => (
                <option key={player.id} value={player.id}>
                  {`${player.position} ${player.playerName} ${player.shirtNo}`}
                </option>
              ))}
            {/* ... other options for Away Team */}
            {activeTeam === "Away" &&
              awayLineup.map((player) => (
                <option key={player.id} value={player.id}>
                  {`${player.position} ${player.playerName} ${player.shirtNo}`}
                </option>
              ))}
          </select>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Typography variant="h6" gutterBottom>
            <h3>SubOut :</h3>
          </Typography>
        </Stack>
      </InnerPaper>
    ),
    injured: (
      <InnerPaper key="injured">
        <Typography variant="h6" gutterBottom>
          <h3>TIME : {team === "A" ? "aaaaa" : "bbbb"}</h3>
          <h3>Injured player : </h3>
          <h3>How long : หหหห </h3>
        </Typography>
      </InnerPaper>
    ),
    foul: (
      <InnerPaper key="foul">
        <Typography variant="h6" gutterBottom>
          <h3>TIME : {team === "A" ? "aaaaa" : "bbbb"}</h3>
          <h3>Booked Player : </h3>
          <h3>Booked Card : ดดดด</h3>
        </Typography>
      </InnerPaper>
    ),
  };

  return contentMap[eventTypeKey] || null;
};

export default AddMatchEvent;
