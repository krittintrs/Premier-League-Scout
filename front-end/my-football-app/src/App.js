import React from 'react';
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './components/FixturePage/Header';
import SubHeader from './components/FixturePage/SubHeader';
import CalendarItem from './components/FixturePage/CalendarItem';
import StackTable from "./components/FixturePage/StackTable";
import BottomDiv from './components/FixturePage/BottomDiv';
import MatchCard from './components/FixturePage/MatchCard';
import DetailsPage from './components/MatchDetails/DetailsPage';

function App() {
  const handleClick = () => {
    console.log('Button clicked!');
  };


  return (
    <div className="w-full md:w-[350px] lg:w-[800px] m-auto">
        <Header />
        <SubHeader />
        <CalendarItem label="Click me" onClick={handleClick} />   
        <StackTable/>  
        <BottomDiv />
      
    </div>
  );
}

export default App;
