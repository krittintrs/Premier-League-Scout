import { Paper } from "@mui/material";
import React from "react";

const EventTable = ({ events }) => {
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
                            <th>Player 1</th>
                            <th>Player 2</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map((event, index) => (
                            <tr key={index}>
                                <td>{event.minuteOccur}</td>
                                <td>{event.eventType}</td>
                                {event.eventType === "score" ? (
                                    <>
                                        <td>{event.scorerPlayerID}</td>
                                        <td>{event.assistPlayerID}</td>
                                    </>
                                ) : event.eventType === "sub" ? (
                                    <>
                                        <td>{event.subInPlayerID}</td>
                                        <td>{event.subOutPlayerID}</td>
                                    </>
                                ) : event.eventType === "injured" ? (
                                    <td>{event.injuredPlayerID}</td>
                                ) : event.eventType === "Booked" ? (
                                    <>
                                        <td>{event.bookedPlayerID}</td>
                                        <td>{event.bookedCardType}</td>
                                    </>
                                ) : null}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Paper>
        </div>
    );
};

export default EventTable;
