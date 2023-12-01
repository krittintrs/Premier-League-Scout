import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";

const PlayerModal = ({ open, handleClose, player, onUpdate, onDelete }) => {
  const [shirtNo, setShirtNo] = useState(player.shirtNo);

  useEffect(() => {
    // Update shirtNo whenever the player changes
    setShirtNo(player.shirtNo);
  }, [player]);

  const handleShirtNoChange = (e) => {
    setShirtNo(e.target.value);
  };

  const handleUpdate = () => {
    onUpdate(player.id, shirtNo);
    handleClose();
  };

  const handleDelete = () => {
    onDelete(player.id);
    handleClose();
  };

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
