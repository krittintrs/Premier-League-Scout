import React from 'react';
import "./App.css";
import { Routes, Route } from 'react-router-dom';
import FixturePage from './components/Pages/fixturePage';
import MatchDetails from './components/Pages/MatchDetails';
import AddMatchEvent from './components/Pages/AddMatchEvent';
import LineUp from './components/Pages/LineUp';

function App() {
  return (
    <Routes>
      <Route path="/" element={<FixturePage />} />
      <Route path="/MatchDetails" element={<MatchDetails />} />
      <Route path="/AddMatchEvent" element={<AddMatchEvent/>} />
      <Route path="/LineUp" element={<LineUp />} />
    </Routes>
  );
}

export default App;
