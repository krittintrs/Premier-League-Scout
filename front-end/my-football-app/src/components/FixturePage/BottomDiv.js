// BottomDiv.js
import React from 'react';
import ColorButtons from './ColorButtons'; // Import the Button component

const BottomDiv = () => {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'flex-end', // Aligns items to the right
    alignItems: 'center',
    padding: '10px',
 
    color: '#fff',
  };

  return (
    <div style={containerStyle}>
      {/* ColorButtons component */}
      <ColorButtons />
    </div>
  );
};

export default BottomDiv;
