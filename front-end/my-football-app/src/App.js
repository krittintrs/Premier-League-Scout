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
import fixturePage from './components/Pages/fixturePage';

function App() {
  return (
    <Router>
            <Routes>
                <Route exact path="/" element={<fixturePage />} />
                <Route path="/about" element={<fixturePage />} />
                <Route
                    path="/contact"
                    element={<fixturePage />}
                />
                <Route path="/blogs" element={<fixturePage />} />
                <Route
                    path="/sign-up"
                    element={<fixturePage />}
                />
            </Routes>
        </Router>
    );
  //   <div className="w-full md:w-[350px] lg:w-[800px] m-auto">
  //       <Header />
  //       <SubHeader />
  //       <CalendarItem label="Click me" onClick={handleClick} />   
  //       <StackTable/>  
  //       <BottomDiv />
      
  //   </div>
  // );
}

export default App;
