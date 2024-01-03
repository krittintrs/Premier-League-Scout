// Header.js
import React from 'react';

const Header = () => {
  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    padding: '10px', // Add padding for spacing
    background: 'linear-gradient(0deg, rgba(127.50, 127.50, 127.50, 0.60) 0%, rgba(127.50, 127.50, 127.50, 0.60) 100%)',
    borderRadius: 5,
  };

  const logoStyle = {
    maxWidth: '100%', 
    maxHeight: '100%',
  };

  return (
    <div style={headerStyle}>
      <img style={logoStyle} src="https://wallpapercave.com/wp/wp8859298.jpg" alt="Header Image" />
      
    </div>
  );
};

export default Header;
