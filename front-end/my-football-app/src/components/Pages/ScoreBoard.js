import React, { useState, useEffect } from 'react';
import { getLeagueTable } from '../../services/userService';

const Scoreboard = () => {
  const [leagueTableData, setLeagueTableData] = useState([]);

  useEffect(() => {
    // Fetch league table data when the component mounts
    const fetchLeagueTable = async () => {
      try {
        const data = await getLeagueTable();
        setLeagueTableData(data);
      } catch (error) {
        // Handle error if needed
        console.error('Error fetching league table:', error);
      }
    };

    fetchLeagueTable();
  }, []);

  return (
    <div style={{ width: '50%', margin: 'auto', marginTop: '80px' }}>
      {/* Header */}
      <div style={{ display: 'flex', padding: '8px', justifyContent: 'space-between', borderBottom: '1px solid #ccc', position: 'sticky', top: 0, background: '#fff', zIndex: 1 }}>
        <div style={{ width: '10%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Rank</div>
        <div style={{ width: '10%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Logo</div>
        <div style={{ width: '25%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Club</div>
        <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', width: '55%' }}>
          <div style={{ textAlign: 'center', width: '8%' }}>P</div>
          <div style={{ textAlign: 'center', width: '8%' }}>W</div>
          <div style={{ textAlign: 'center', width: '8%' }}>D</div>
          <div style={{ textAlign: 'center', width: '8%' }}>L</div>
          <div style={{ textAlign: 'center', width: '8%' }}>GF</div>
          <div style={{ textAlign: 'center', width: '8%' }}>GA</div>
          <div style={{ textAlign: 'center', width: '8%' }}>GD</div>
          <div style={{ textAlign: 'center', width: '8%' }}>PTS</div>
        </div>
      </div>
      {/* Match Data */}
      <div style={{ maxHeight: 'calc(100vh - 48px)', overflowY: 'auto' }}>
        <ul style={{ padding: 0,  marginTop: '0'}}>
          {leagueTableData.map((team, index) => (
            <li key={index} style={{ listStyle: 'none', borderBottom: '1px solid #ccc', display: 'flex', padding: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', width: '10%' }}>{index + 1}</div>
              <div style={{ width: '10%' }}>
                <img src={"/images/clubs/" + team.teamName.replace(/\s+/g, '-') + ".png"} alt={team.teamName} style={{ maxWidth: '100%', height: 'auto' }} />
              </div>
              <div style={{ width: '25%', display: 'flex', alignItems: 'center' }}>{team.teamName}</div>
              <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', width: '55%' }}>
                <div style={{ textAlign: 'center', width: '8%' }}>{team.matchPlayed}</div>
                <div style={{ textAlign: 'center', width: '8%' }}>{team.wins}</div>
                <div style={{ textAlign: 'center', width: '8%' }}>{team.draws}</div>
                <div style={{ textAlign: 'center', width: '8%' }}>{team.losses}</div>
                <div style={{ textAlign: 'center', width: '8%' }}>{team.goalFor}</div>
                <div style={{ textAlign: 'center', width: '8%' }}>{team.goalAgainst}</div>
                <div style={{ textAlign: 'center', width: '8%' }}>{team.goalDifference}</div>
                <div style={{ textAlign: 'center', width: '8%' }}>{team.points}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Scoreboard;
