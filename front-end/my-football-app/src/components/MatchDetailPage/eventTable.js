import { Paper } from "@mui/material";
import React, { useState } from "react";
import EventModal from "./eventModal";

const EventTable = ({ events }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleRowClick = (event) => {
    setSelectedEvent(event);
  };

  return (
    <div style={{ width: "100%", textAlign: "center" }}>
      <Paper
        style={{
          width: "60%", // Adjust the width of the Paper as needed
          overflowX: "auto",
          margin: "10px auto",
        }}
        elevation={3}
      >
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>Time</th>
              <th>EventType</th>
              <th>Player</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => (
              <tr
                key={index}
                style={{ cursor: "pointer" }}
                onClick={() => handleRowClick(event)}
              >
                <td>{event.minuteOccur}</td>
                <td>{event.eventType}</td>
                <td>
                  {event.eventType === "score" && (
                    <>
                      {event.scorerPlayerID} (Scorer)
                      {event.assistPlayerID && `, ${event.assistPlayerID} (Assist)`}
                    </>
                  )}
                  {event.eventType === "sub" && (
                    <>
                      {event.subInPlayerID} (Sub In)
                      {event.subOutPlayerID && `, ${event.subOutPlayerID} (Sub Out)`}
                    </>
                  )}
                  {event.eventType === "injured" && (
                    <>
                      {event.injuredPlayerID} (Injured)
                    </>
                  )}
                  {event.eventType === "booked" && (
                    <>
                      {event.bookedPlayerID} (Booked - {event.bookedCardType})
                    </>
                  )}
                </td>
                <td>Details Here</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Paper>

      {/* EventModal */}
      {selectedEvent && (
        <EventModal
          open={selectedEvent !== null}
          handleClose={() => setSelectedEvent(null)} // Close the modal
          event={selectedEvent} // Pass the selected event data to the modal
        />
      )}
    </div>
  );
};

export default EventTable;
