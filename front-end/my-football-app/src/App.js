import React from 'react';
import "./App.css";
import { Routes, Route } from 'react-router-dom';
import FixturePage from './components/Pages/fixturePage';
import MatchDetails from './components/Pages/MatchDetails';

function App() {
  return (
    <Routes>
      <Route path="/" element={<FixturePage />} />
      <Route path="/MatchDetails" element={<MatchDetails />} />
      <Route path="/contact" element={<FixturePage />} />
      <Route path="/blogs" element={<FixturePage />} />
      <Route path="/sign-up" element={<FixturePage />} />
    </Routes>
  );
}

export default App;
