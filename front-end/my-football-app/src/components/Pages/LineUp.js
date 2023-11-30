import React from "react";
import Button from "@mui/material/Button";
import { Paper, styled } from "@mui/material";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const LineUpModal = ({ open, handleClose, lineup }) => {
  const handleAddClick = () => {
    console.log("ADD button clicked!");
  };

  const ADDButton = styled("div")({
    position: "absolute",
    bottom: "5%",
    left: "90%", // Adjust the margin-left to align the buttons to the right of the switch
  });

  const TeamAPaper = styled(Paper)(({ theme }) => ({
    width: 900,
    height: 300,
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
        <div style={{ width: "100%", height: "50%", position: "relative" }}>
          {/* ... Team A content ... */}
        </div>
        <TeamAPaper square={false}>
          <Box sx={{ width: "100%" }}>
            <h2 className="team-name">{"Home Lineups: " + "Team A"}</h2>
            <Stack direction="column" spacing={2}>
              <Item>Item 1</Item>
              <Item>Item 2</Item>
              <Item>Item 3</Item>
              <Item>Item 4</Item>
            </Stack>
          </Box>
          <ADDButton>
            <Button
              variant="contained"
              disableElevation
              onClick={handleAddClick}
            >
              ADD
            </Button>
          </ADDButton>
        </TeamAPaper>
      </Box>
    </Modal>
  );
};

export default LineUpModal;
