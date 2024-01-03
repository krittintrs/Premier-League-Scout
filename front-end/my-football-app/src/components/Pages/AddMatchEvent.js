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
  height: 320,
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

  const [eventDetails, setEventDetails] = useState({
    minuteOccur: "",
    matchId: matchId,
    eventType: selectedEvent
  });

  const onSelectTeam = (eventType) => {
    console.log("Selected Event:", eventType);
    setSelectedEvent(eventType);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    
    if (name === "eventType") {
      setSelectedEvent(value);
    }
    if (name === 'minuteOccur') {
      // Parse time to float
      const timeValue = parseFloat(value);
  
      setEventDetails((prevDetails) => ({
        ...prevDetails,
        [name]: timeValue,
      }));
    } else {
      // Assuming other inputs are player IDs
      console.log('Name:', name);
      console.log('Value:', value);
      const playerId = parseInt(value, 10);
      
      setEventDetails((prevDetails) => ({
        ...prevDetails,
        [name]: playerId,
      }));
    }
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

  const validateEventDetails = () => {
    // Add your validation logic here based on the selected event type
    if (selectedEvent === 'score' && !eventDetails.scorerPlayerID) {
      // Display an error or handle the missing information for scoring event
      return false;
    }
    // Add similar checks for other event types
    return true;
  };

  const onSave = async () => {
    if (validateEventDetails()) {
      try {
        // Assuming eventDetails is properly structured according to your API requirements
        console.log(eventDetails);
        const response = await adminService.PostMatchEvents(eventDetails);

        // Handle the response as needed
        console.log("PostMatchEvents response:", response);

        // Redirect or perform other actions upon successful save
        navigate("/MatchDetails");
      } catch (error) {
        // Handle errors from the API call
        console.error("Error while saving match event:", error);
      }
    } else {
      // Display an error or handle the validation failure
      console.error("Validation failed");
    }
  };

  return (
    <div>
      <DemoPaper square={false}>
        {/* ... (your existing code) */}
        {eventTypes.map((eventType) =>
          generateInnerPaperContent(
            activeTeam,
            selectedEvent,
            eventType.key,
            homeLineup,
            awayLineup,
            handlePlayerChange,
            activeTeam,
            handleInputChange,
            eventDetails
          )
        )}
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
            activeTeam,
            handleInputChange,
            eventDetails
          )
        )}

        <DoneButton>
          <Link to="/MatchDetails">
            <Stack direction="row" spacing={2}>
              <Button variant="outlined" onClick={onSave}>
                DONE
              </Button>
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
  activeTeam,
  handleInputChange,
  eventDetails
) => {
  console.log("Selected Event in generateInnerPaperContent:", selectedEvent);
  console.log("eventTypeKey:", eventTypeKey);
  console.log("activeTeam:", activeTeam);
  console.log("eventDetails:", eventDetails);

  const contentMap = {
    score: (
      <InnerPaper key="score">
        <Stack direction="row" spacing={2}>
            <Typography variant="h6" gutterBottom>
              <h3>Time :</h3>
            </Typography>
            <TextField
              type="text"
              name="time"
              value={eventDetails.time}
              onChange={handleInputChange}
            />
          </Stack>
        {/* ... (existing content) */}
        <Stack direction="row" spacing={2}>
          <Typography variant="h6" gutterBottom>
            <h3>Scorer :</h3>
          </Typography>
          <select
            name="scorerPlayerID"
            value={eventDetails.scorerPlayerID}
            onChange={handleInputChange}
          >
            <option value="">Select Player</option>
            {activeTeam === "HOME" &&
              homeLineup.map((player) => (
                <option key={player.id} value={player.id}>
                  {`${player.position} ${player.playerName} ${player.shirtNo}`}
                </option>
              ))}
            {activeTeam === "AWAY" &&
              awayLineup.map((player) => (
                <option key={player.id} value={player.id}>
                  {`${player.position} ${player.playerName} ${player.shirtNo}`}
                </option>
              ))}
          </select>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Typography variant="h6" gutterBottom>
            <h3>Assister :</h3>
          </Typography>
          <select
            name="assistPlayerID"
            value={eventDetails.assistPlayerID}
            onChange={handleInputChange}
          >
            <option value="">Select Player</option>
            {activeTeam === "HOME" &&
              homeLineup.map((player) => (
                <option key={player.id} value={player.id}>
                  {`${player.position} ${player.playerName} ${player.shirtNo}`}
                </option>
              ))}
            {activeTeam === "AWAY" &&
              awayLineup.map((player) => (
                <option key={player.id} value={player.id}>
                  {`${player.position} ${player.playerName} ${player.shirtNo}`}
                </option>
              ))}
          </select>
        </Stack>
        {/* ... (existing content) */}
      </InnerPaper>
    ),
    sub: (
      <InnerPaper key="sub">
        <Stack direction="row" spacing={2}>
          <Typography variant="h6" gutterBottom>
            <h3>Time :</h3>
          </Typography>
          <TextField
            type="text"
            name="minuteOccur"
            value={eventDetails.time}
            onChange={handleInputChange}
          />
        </Stack>
        {/* ... (existing content) */}
        <Stack direction="row" spacing={2}>
          <Typography variant="h6" gutterBottom>
            <h3>SubIn :</h3>
          </Typography>
          <select
            name="subInPlayerID"
            value={eventDetails.subInPlayerID}
            onChange={handleInputChange}
          >
            <option value="">Select Player</option>
            {activeTeam === "HOME" &&
              homeLineup.map((player) => (
                <option key={player.playerID} value={player.playerID}>
                  {`${player.position} ${player.playerName} ${player.shirtNo}`}
                </option>
              ))}
            {activeTeam === "AWAY" &&
              awayLineup.map((player) => (
                <option key={player.playerID} value={player.playerID}>
                  {`${player.position} ${player.playerName} ${player.shirtNo}`}
                </option>
              ))}
          </select>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Typography variant="h6" gutterBottom>
            <h3>SubOut :</h3>
          </Typography>
          <select
            name="subOutPlayerID"
            value={eventDetails.subOutPlayerID}
            onChange={handleInputChange}
          >
            <option value="">Select Player</option>
            {activeTeam === "HOME" &&
              homeLineup.map((player) => (
                <option key={player.playerID} value={player.playerID}>
                  {`${player.position} ${player.playerName} ${player.shirtNo}`}
                </option>
              ))}
            {activeTeam === "AWAY" &&
              awayLineup.map((player) => (
                <option key={player.playerID} value={player.playerID}>
                  {`${player.position} ${player.playerName} ${player.shirtNo}`}
                </option>
              ))}
          </select>
        </Stack>
        {/* ... (existing content) */}
      </InnerPaper>
    ),
    injured: (
      <InnerPaper key="injured">
        <Stack direction="row" spacing={2}>
          <Typography variant="h6" gutterBottom>
            <h3>Time :</h3>
          </Typography>
          <TextField
            type="text"
            name="minuteOccur"
            value={eventDetails.time}
            onChange={handleInputChange}
          />
        </Stack>
        {/* ... (existing content) */}
        <Stack direction="row" spacing={2}>
          <Typography variant="h6" gutterBottom>
            <h3>Injured player :</h3>
          </Typography>
          <select
            name="injuredPlayerID"
            value={eventDetails.injuredPlayerID}
            onChange={handleInputChange}
          >
            <option value="">Select Player</option>
            {activeTeam === "HOME" &&
              homeLineup.map((player) => (
                <option key={player.playerID} value={player.playerID}>
                  {`${player.position} ${player.playerName} ${player.shirtNo}`}
                </option>
              ))}
            {activeTeam === "AWAY" &&
              awayLineup.map((player) => (
                <option key={player.playerID} value={player.playerID}>
                  {`${player.position} ${player.playerName} ${player.shirtNo}`}
                </option>
              ))}
          </select>
        </Stack>
        {/* ... (existing content) */}
      </InnerPaper>
    ),
    foul: (
      <InnerPaper key="foul">
        <Stack direction="row" spacing={2}>
          <Typography variant="h6" gutterBottom>
            <h3>Time :</h3>
          </Typography>
          <TextField
            type="text"
            name="minuteOccur"
            value={eventDetails.time}
            onChange={handleInputChange}
          />
        </Stack>
        {/* ... (existing content) */}
        <Stack direction="row" spacing={2}>
          <Typography variant="h6" gutterBottom>
            <h3>Booked Player :</h3>
          </Typography>
          <select
            name="bookedPlayerID"
            value={eventDetails.bookedPlayerID}
            onChange={handleInputChange}
          >
            <option value="">Select Player</option>
            {activeTeam === "HOME" &&
              homeLineup.map((player) => (
                <option key={player.playerID} value={player.playerID}>
                  {`${player.position} ${player.playerName} ${player.shirtNo}`}
                </option>
              ))}
            {activeTeam === "AWAY" &&
              awayLineup.map((player) => (
                <option key={player.playerID} value={player.playerID}>
                  {`${player.position} ${player.playerName} ${player.shirtNo}`}
                </option>
              ))}
          </select>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Typography variant="h6" gutterBottom>
            <h3>Booked Card :</h3>
          </Typography>
          <select
            name="bookedCardType"
            value={eventDetails.bookedCardType}
            onChange={handleInputChange}
          >
            <option value="">Select Card Type</option>
            <option value="YELLOW">Yellow Card</option>
            <option value="RED">Red Card</option>
            <option value="SECONDYELLOW">Second Yellow Card</option>
          </select>
        </Stack>
      </InnerPaper>
    ),
  };

  eventTypeKey = selectedEvent.toLowerCase(); // Convert to lowercase for consistency

  const generatedContent = contentMap[eventTypeKey] || null;

  return generatedContent;
};

export default AddMatchEvent;