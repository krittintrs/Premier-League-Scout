import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import { Button, Paper } from "@mui/material";
import * as adminService from "../../services/adminService";

const EventModal = ({ open, handleClose, event }) => {
  const [updatedEventData, setUpdatedEventData] = useState({
    minuteOccur: event.minuteOccur,
    eventType: event.eventType,
    // Add other properties as needed based on your event structure
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      // Assuming you have an updateEvent function in adminService
      await adminService.updateEvent(event.id, updatedEventData);
      handleClose();
    } catch (error) {
      console.error("Error updating event:", error);
      // Handle the error as needed
    }
  };

  const handleDelete = async () => {
    try {
      // Assuming you have a deleteEvent function in adminService
      await adminService.deleteEvent(event.id);
      handleClose();
    } catch (error) {
      console.error("Error deleting event:", error);
      // Handle the error as needed
    }
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
        backgroundColor: "rgba(0, 0, 0, 0.3)",
      }}
    >
      <Paper style={{ padding: "20px" }}>
        {/* Display event details or input fields for update */}
        <h2>{event.eventType} Event</h2>
        <div>
          <label htmlFor="minuteOccur">Minute:</label>
          <input
            type="text"
            id="minuteOccur"
            name="minuteOccur"
            value={updatedEventData.minuteOccur}
            onChange={handleInputChange}
          />
        </div>
        {/* Add other input fields as needed */}
        <div>
          <Button variant="contained" onClick={handleUpdate}>
            Update
          </Button>
          <Button variant="contained" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </Paper>
    </Modal>
  );
};

export default EventModal;
