import React from "react";
import Button from "@mui/material/Button";
import { Paper, styled, Modal, Box, Stack } from "@mui/material";

const LineUpModal = ({ open, handleClose, handleAddClick }) => {
  const ADDButton = styled("div")({
    position: "absolute",
    bottom: "5%",
    left: "90%",
  });

  const TeamPaper = styled(Paper)(({ theme }) => ({
    width: 900,
    height: 300,
    padding: theme.spacing(2),
    ...theme.typography.body2,
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
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
    >
      <>
        {/* Your existing styling for Team A */}
        <div style={{ width: "50%", height: "50%", position: "relative" }}>
          {/* ... */}
        </div>
        <TeamPaper square={false}>
          <Box sx={{ width: "100%" }}>
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
        </TeamPaper>

        {/* Your existing styling for Team B */}
        <div style={{ width: "100%", height: "100%", position: "relative" }}>
          {/* ... */}
        </div>
        <TeamPaper square={false}>
          <Box sx={{ width: "100%" }}>
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
        </TeamPaper>
      </>
    </Modal>
  );
};

export default LineUpModal;
