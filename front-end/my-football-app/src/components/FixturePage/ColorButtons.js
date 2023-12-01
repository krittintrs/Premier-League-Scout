// ColorButtons.js
import React from 'react';
import Button from '@mui/material/Button';

// Extract the Button component
const ColorButtons = ({game, onClick}) => {
  return (
    <Button variant="contained" color="success" onClick={onClick}>
      {game}
    </Button>
  );
};

export default ColorButtons;
