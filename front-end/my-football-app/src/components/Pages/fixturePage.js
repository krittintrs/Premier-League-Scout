import React from "react";
import ColorButtons from '../FixturePage/ColorButtons'; // Import the Button component
import CalendarItem from "../FixturePage/CalendarItem";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import MatchCard from '../FixturePage/MatchCard';
import { useNavigate } from 'react-router-dom';
import Navbar from "../NavBar";
import { CarouselItem } from "reactstrap";

const containerStyle = {
    // Define your styles for the container here
    // For example:
    marginTop: 20,
    padding: 10,
    backgroundColor: '#fff',
};

const FixturePage = () => {
  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "100%",
    padding: "10px", // Add padding for spacing
    background:
      "linear-gradient(0deg, rgba(127.50, 127.50, 127.50, 0.60) 0%, rgba(127.50, 127.50, 127.50, 0.60) 100%)",
    borderRadius: 5,
  };

  const logoStyle = {
    maxWidth: "100%",
    maxHeight: "100%",
  };

  const headingStyle = {
    textAlign: "center",
    color: "black",
    fontSize: 48,
    fontFamily: "Inter",
    fontWeight: "700",
    textTransform: "uppercase",
    wordWrap: "break-word",
  };

  const DateStyle = {
    textAlign: "center",
    color: "black",
    fontSize: 32,
    fontFamily: "Inter",
    fontWeight: "600",
    textTransform: "uppercase",
    wordWrap: "break-word",
  };

  return (
    
    <div className="w-full md:w-[350px] lg:w-[800px] m-auto">
      <div style={headerStyle}>
        <img
          style={logoStyle}
          src="https://wallpapercave.com/wp/wp8859298.jpg"
          alt="Header Image"
        />
      </div>
      <div>
        <div style={headingStyle}>Match Week 1</div>
        <div style={DateStyle}>4 November 2023</div>
      </div>
      <div style={containerStyle}>
        
        <CalendarItem/>
      </div>
      <Box sx={{ width: "100%" }}>
        <Paper>
          <Stack
            direction="row"
            justifyContent="left"
            alignItems="left"
            padding={1}
          >
            <img src="https://assets.codepen.io/285131/pl-logo.svg"></img>,
            <h2> English Premier League</h2>
          </Stack>
        </Paper>
        <Stack spacing={1}>
          <MatchCard />
          <MatchCard />
          <MatchCard />
        </Stack>
      </Box>
      <div style={containerStyle}>
        
        <ColorButtons />
      </div>
    </div>
  );
};

export default FixturePage;
