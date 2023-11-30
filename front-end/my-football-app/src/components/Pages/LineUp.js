import React from "react";
import { Paper, styled } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { useEffect } from "react";
import * as adminService from "../../services/adminService";
import { MenuItem, Stack, Button } from "@mui/material"; // Import necessary components from Material-UI
import { handleApiError } from "../../utils/apiUtils";

const LineUpModal = React.memo(
  ({ open, handleClose, side, lineup, matchInfo }) => {
    const [availableHomePlayers, setAvailableHomePlayers] = useState([]);
    const [availableAwayPlayers, setAvailableAwayPlayers] = useState([]);
    const [homeselectedPlayers, setHomeSelectedPlayers] = useState([]);
    const [awayselectedPlayers, setAwaySelectedPlayers] = useState([]);
    const [selectedPlayer, setSelectedPlayer] = useState("");

    const [homeLineup, setHomeLineup] = useState([]);
    const [awayLineup, setAwayLineup] = useState([]);

    const addHomeToLineup = (player) => {
      setHomeLineup((prevLineup) => [...prevLineup, player]);
    };

    const addAwayToLineup = (player) => {
      setAwayLineup((prevLineup) => [...prevLineup, player]);
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

    const handleAddClick = () => {
      if (selectedPlayer) {
        if (side === "Home Team") {
          const playerToAdd = availableHomePlayers.find(
            (player) => player.id === selectedPlayer.id
          );
          addHomeToLineup(playerToAdd);
          console.log("lineup now:", homeLineup);
          const playerToRemove = availableHomePlayers.find(
            (player) => player.id === selectedPlayer.id
          );
          removeHomeFromSelected(playerToRemove);
        } else if (side === "Away Team") {
          console.log("Available Away Players:", availableAwayPlayers);
          const playerToAdd = availableAwayPlayers.find(
            (player) => player.id === selectedPlayer.id
          );
          addAwayToLineup(playerToAdd);
          console.log("Lineup now:", awayLineup);
          const playerToRemove = availableAwayPlayers.find(
            (player) => player.id === selectedPlayer.id
          );
          removeAwayFromSelected(playerToRemove);
        }

        // Clear selected player after adding to lineup
        setSelectedPlayer(null);
      } else {
        console.warn("No player selected");
      }
    };

    const handlePost = () => {
      if (side === "Home Team") {
        const lineups = [];
        homeLineup.map((player) => {
          const lineup = {
            matchID: matchInfo.id,
            playerID: player.id,
            side: "HOME",
            shirtNo: player.shirtNo,
            position: player.position,
          };
          lineups.push(lineup);
        });
        adminService.PostLineups(lineup);
      } else if (side === "Away Team") {
        const lineups = [];
        awayLineup.map((player) => {
          const lineup = {
            matchID: matchInfo.id,
            playerID: player.id,
            side: "AWAY",
            shirtNo: player.shirtNo,
            position: player.position,
          };
          lineups.push(lineup);
        });
        adminService.PostLineups(lineup);
      }
    };

    const ADDButton = styled("div")({
      position: "absolute",
      bottom: "5%",
      left: "90%", // Adjust the margin-left to align the buttons to the right of the switch
      padding: "10px",
      paddingTop: "10px",
      marginTop: "10px",
      marginBottom: "10px",
    });

    const TeamAPaper = styled(Paper)(({ theme }) => ({
      width: 900,
      height: "auto",
      maxHeight: 600,
      padding: theme.spacing(2),
      ...theme.typography.body2,
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      margin: "50px",
      position: "relative",
    }));

    const Item = styled(Paper)(({ theme }) => ({
      backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
      ...theme.typography.body2,
      padding: theme.spacing(1),
      textAlign: "center",
      color: theme.palette.text.secondary,
    }));

    const loadPlayers = async (side) => {
      try {
        if (matchInfo && matchInfo.homeTeamID) {
          let data;
          if (side === "HOME") {
            console.log("teamid: " + matchInfo.homeTeamID);
            data = await adminService.GetPlayers(matchInfo.homeTeamID);
            setAvailableHomePlayers(data);

            // Set the first player as the default selected player
            if (data.length > 0) {
              setSelectedPlayer(data[0]);
            }
          } else if (side === "AWAY") {
            console.log("teamid: " + matchInfo.awayTeamID);
            data = await adminService.GetPlayers(matchInfo.awayTeamID);
            setAvailableAwayPlayers(data);

            // Set the first player as the default selected player
            if (data.length > 0) {
              setSelectedPlayer(data[0]);
            }
          }

          if (data && data.length > 0) {
            console.log("player " + data[0].lastName);
            console.log(data[0]);
            console.log(availableAwayPlayers);
          } else {
            console.log("No players available");
          }
        } else {
          console.error("Match information is undefined or missing homeTeamId");
        }
      } catch (error) {
        handleApiError(error);
      }
    };

    const handlePlayerChange = (event) => {
      if (side === "Home Team") {
        const playerId = parseInt(event.target.value, 10);
        const player = availableHomePlayers.find((p) => p.id === playerId);

        console.log("Selected Player:", player);
        setSelectedPlayer(player);
      } else if (side === "Away Team") {
        const playerId = parseInt(event.target.value, 10);
        const player = availableAwayPlayers.find((p) => p.id === playerId);

        console.log("Selected Player:", player);
        setSelectedPlayer(player);
      }
    };

    useEffect(() => {
      console.log("matchInfo:", matchInfo);
      if (matchInfo) {
        console.log("matchInfo in lineup:", matchInfo);
        loadPlayers("HOME");
        loadPlayers("AWAY");
      }
    }, []);

    return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box>
          <div
            style={{ width: "100%", height: "50%", position: "relative" }}
          ></div>
          <TeamAPaper square={false}>
            <Box sx={{ width: "100%", position: "relative" }}>
              {side === "Home Team" ? (
                <h2 className="team-name">
                  {"Home Lineups: " + matchInfo?.homeTeamName}
                </h2>
              ) : (
                <h2 className="team-name">
                  {"Away Lineups: " + matchInfo?.awayTeamName}
                </h2>
              )}
              <Stack direction="column" spacing={2}>
                {/* Render a dropdown list of availableHomePlayers */}
                <select
                  value={selectedPlayer?.id}
                  onChange={handlePlayerChange}
                >
                  {side === "Home Team" &&
                    availableHomePlayers.map((player) => (
                      <option key={player.id} value={player.id}>
                        {`${player.position} ${player.lastName} ${player.shirtNo}`}
                      </option>
                    ))}
                  {/* ... other options for Away Team */}
                  {side === "Away Team" &&
                    availableAwayPlayers.map((player) => (
                      <option key={player.id} value={player.id}>
                        {`${player.position} ${player.lastName} ${player.shirtNo}`}
                      </option>
                    ))}
                </select>
                {side === "Home Team" && (
                  <Item>
                    {homeLineup.map((player) => (
                      <Item key={player?.id}>
                        {`${player?.position} ${player?.lastName} ${player?.shirtNo}`}
                      </Item>
                    ))}
                  </Item>
                )}
                {side === "Away Team" && (
                  <Item>
                    {awayLineup.map((player) => (
                      <Item key={player?.id}>
                        {`${player?.position} ${player?.lastName} ${player?.shirtNo}`}
                      </Item>
                    ))}
                  </Item>
                )}

                <Button
                  className="btn-icon"
                  onClick={handleAddClick}
                  style={{
                    bottom: 0,
                    right: 0,
                    marginBottom: "10px",
                  }}
                >
                  Add
                </Button>
                <Button
                  className="btn-icon"
                  onClick={handlePost}
                  style={{
                    bottom: 0,
                    right: 0,
                    marginBottom: "10px",
                  }}
                >
                  Post
                </Button>
              </Stack>
            </Box>
          </TeamAPaper>
        </Box>
      </Modal>
    );
  }
);

export default LineUpModal;
