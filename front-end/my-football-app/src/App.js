import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import FixturePage from './components/Pages/fixturePage';
import MatchDetails from './components/Pages/MatchDetails';
import AddMatchEvent from './components/Pages/AddMatchEvent';
import LineUp from './components/Pages/LineUp';
import ScoreBoard from './components/Pages/ScoreBoard';
import NavBar from './components/NavBar';
import LoginPage from './components/Pages/LoginPage';
import SignUpPage from './components/Pages/SignUpPage';


function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<FixturePage />} />
        <Route path="/MatchDetails/:matchId" element={<MatchDetails />} />
        <Route path="/AddMatchEvent/:matchId" element={<AddMatchEvent />} />
        <Route path="/LineUp" element={<LineUp/>} />
        <Route path="/ScoreBoard" element={<ScoreBoard />} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/SignUpPage" element={<SignUpPage/>} />
      </Routes>
    </div>
  );
}

export default App;
