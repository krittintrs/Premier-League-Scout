import { Paper } from "@mui/material";
import React, { useState } from "react";
import EventModal from "./eventModal";

const EventTable = ({ events, homeLineup = [], awayLineup = [] }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleRowClick = (event) => {
    setSelectedEvent(event);
  };

  useState(() => {
    console.log("events");
    console.log(events);
    console.log("homeLineup");
    console.log(homeLineup);
    console.log("awayLineup");
    console.log(awayLineup);
  }, [homeLineup, awayLineup, events]);

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
              <th></th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => (
              <tr
                key={index}
                style={{ cursor: "pointer" }}
                onClick={() => handleRowClick(event)}
              >
                <td>
                  <strong>{event.minuteOccur + " `"}</strong>
                </td>
                <td>
                  {event.eventType === "sub" && (
                    <img
                      src="/images/substitution.png"
                      alt="substitution"
                      style={{ width: "20px", height: "20px" }}
                    />
                  )}
                  {event.eventType === "injured" && (
                    <img
                      src="/images/injured.png"
                      alt="injured"
                      style={{ width: "20px", height: "20px" }}
                    />
                  )}
                  {event.eventType === "booked" &&
                    {event.bookedCardType === "YELLOW" ? (
                        <img
                            src="/images/yellow-card.png"
                            alt="yellow-card"
                            style={{ width: "20px", height: "20px" }}
                        />
                    ) : event.bookedCardType === "RED" ? (
                        <img
                            src="/images/red-card.png"
                            alt="red-card"
                            style={{ width: "20px", height: "20px" }}
                        />
                    ) : (
                        <img
                            src="/images/other-card.png"
                            alt="other-card"
                            style={{ width: "20px", height: "20px" }}
                        />
                    )}
                  {event.eventType === "score" && (
                    <img
                      src="/images/score.png"
                      alt="score"
                      style={{ width: "20px", height: "20px" }}
                    />
                  )}
                </td>
                <td>
                  {event.eventType === "score" && (
                    <>
                      <strong>
                        {
                          homeLineup.find(
                            (player) => player.playerID === event.scorerPlayerID
                          )?.playerName
                        }{" "}
                        {
                          awayLineup.find(
                            (player) => player.playerID === event.scorerPlayerID
                          )?.playerName
                        }{" "}
                      </strong>
                      {event.empty ? "" : ": Scorer"}
                    </>
                  )}

                  {event.eventType === "sub" && (
                    <>
                      <strong>
                        {
                          homeLineup.find(
                            (player) => player.playerID === event.subInPlayerID
                          )?.playerName
                        }{" "}
                        {
                          awayLineup.find(
                            (player) => player.playerID === event.subInPlayerID
                          )?.playerName
                        }{" "}
                      </strong>
                      {event.empty ? "" : ": Sub In"}
                    </>
                  )}

                  {event.eventType === "injured" && (
                    <>
                      {
                        homeLineup.find(
                          (player) => player.playerID === event.injuredPlayerID
                        )?.playerName
                      }{" "}
                      {
                        awayLineup.find(
                          (player) => player.playerID === event.injuredPlayerID
                        )?.playerName
                      }{" "}
                      (Injured)
                    </>
                  )}

                  {event.eventType === "booked" && (
                    <>
                      {
                        homeLineup.find(
                          (player) => player.playerID === event.bookedPlayerID
                        )?.playerName
                      }{" "}
                      {
                        awayLineup.find(
                          (player) => player.playerID === event.bookedPlayerID
                        )?.playerName
                      }{" "}
                      (Booked - {event.bookedCardType})
                    </>
                  )}
                </td>
                <td>
                  {event.eventType === "score" && (
                    <>
                      {
                        homeLineup.find(
                          (player) => player.playerID === event.assistPlayerID
                        )?.playerName
                      }{" "}
                      {
                        awayLineup.find(
                          (player) => player.playerID === event.assistPlayerID
                        )?.playerName
                      }{" "}
                      {event.empty ? "" : ": Assist"}
                    </>
                  )}
                  {event.eventType === "sub" && (
                    <>
                      {
                        homeLineup.find(
                          (player) => player.playerID === event.subOutPlayerID
                        )?.playerName
                      }{" "}
                      {
                        awayLineup.find(
                          (player) => player.playerID === event.subOutPlayerID
                        )?.playerName
                      }{" "}
                      (Sub Out)
                    </>
                  )}
                  {event.eventType === "injured" && (
                    <>
                      {
                        homeLineup.find(
                          (player) => player.playerID === event.injuredPlayerID
                        )?.playerName
                      }{" "}
                      {
                        awayLineup.find(
                          (player) => player.playerID === event.injuredPlayerID
                        )?.playerName
                      }{" "}
                      (Injured)
                    </>
                  )}
                  {event.eventType === "booked" && (
                    <>
                      {
                        homeLineup.find(
                          (player) => player.playerID === event.bookedPlayerID
                        )?.playerName
                      }{" "}
                      {
                        awayLineup.find(
                          (player) => player.playerID === event.bookedPlayerID
                        )?.playerName
                      }{" "}
                      (Booked - {event.bookedCardType})
                    </>
                  )}
                </td>
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
