import React, { useState } from 'react';
import CustomButton from './CustomButton';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CalendarItem = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleButtonClick = () => {
    setShowCalendar(!showCalendar);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowCalendar(false); // Close the calendar after selecting a date
    // Additional logic if needed
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%', // Adjust the width as needed
    padding: '10px', // Add padding for spacing
  };

  const calendarContainerStyle = {
    position: 'absolute',
    top: '100%', // Adjust as needed
    left: '0',
    zIndex: '100',
  };

  return (
    <div style={containerStyle}>
      <CustomButton lines='Wednesday' onClick={() => handleButtonClick('Button 1')} />
      <CustomButton lines='Button 2' onClick={() => handleButtonClick('Button 2')} />
      <CustomButton lines='Button 3' onClick={() => handleButtonClick('Button 3')} />
      <CustomButton lines='Button 4' onClick={() => handleButtonClick('Button 4')} />
      <CustomButton lines='Button 5' onClick={() => handleButtonClick('Button 5')} />
      <CustomButton lines='Button 6' onClick={() => handleButtonClick('Button 6')} />

      <div style={{ position: 'relative' }}>
        <CustomButton label="View Calendar" onClick={handleButtonClick} />
        {showCalendar && (
          <div style={calendarContainerStyle}>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="MMMM d, yyyy"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarItem;
