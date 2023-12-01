import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import * as adminService from "../../services/adminService";

const PlayerModal = ({ open, handleClose, player }) => {
  const [shirtNo, setShirtNo] = useState(player.shirtNo);
  const [lineup, setLineup] = useState(player);

  useEffect(() => {
    // Update shirtNo whenever the player changes
    setShirtNo(player.shirtNo);
  }, [player]);

  const handleShirtNoChange = (e) => {
    setShirtNo(e.target.value);
  };

  const handleUpdate = () => {
    const updatedShirtNo = parseInt(shirtNo, 10);
    const lineup = {
      matchID: player.matchID,
      playerID: player.playerID,
      playName: player.playerName,
      side: player.side,
      shirtNo: updatedShirtNo,
      position: player.position,
    };
    console.log(player);
    console.log(lineup);
    adminService.updateLineup(lineup);
    handleClose();
  };

  const handleDelete = () => {
    const updatedShirtNo = parseInt(shirtNo, 10);
    const lineup = {
      matchID: player.matchID,
      playerID: player.playerID,
      playName: player.playerName,
      side: player.side,
      shirtNo: updatedShirtNo,
      position: player.position,
    };
    console.log(player);
    console.log(lineup);
    adminService.deleteLineup(lineup);
    handleClose();
  };

  useEffect(() => {
    // Update shirtNo whenever the player changes
    setShirtNo(player.shirtNo);
    setLineup(player);
  }, [player]);

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
      <div>
        <label htmlFor="shirtNo">Shirt Number:</label>
        <input
          type="text"
          id="shirtNo"
          value={shirtNo}
          onChange={handleShirtNoChange}
        />
        <button onClick={handleUpdate}>Update</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </Modal>
  );
};

export default PlayerModal;
