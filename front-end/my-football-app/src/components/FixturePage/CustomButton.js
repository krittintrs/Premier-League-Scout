// CustonButton.js
import React from 'react';
import Button from '@mui/material/Button';

const CustomButton = ({ label, onClick }) => {
  const buttonStyle = {
    display: 'inline-block',
    margin: '10px', // Adjust the margin as needed for spacing
    width: '180px', // Set the desired width
    height: '60px', // Set the desired height
    backgroundColor: '#007bff',
    color: '#fff',
    borderRadius: '5px',
    border: 'none',
    textAlign: 'center',
    textDecoration: 'none',
    fontSize: '16px',
    cursor: 'pointer',
  };

  return (
    <Button variant="contained" style={buttonStyle} onClick={onClick}>
      {label}
    </Button>
  );
};

export default CustomButton;
