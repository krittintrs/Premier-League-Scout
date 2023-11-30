import React from 'react';

const Scoreboard = () => {
  const sampleData = [
    { id: 1, name: 'Manchester United', wins: 7, draws: 2, losses: 1 },
    { id: 2, name: 'Manchester City', wins: 6, draws: 3, losses: 1 },
    { id: 3, name: 'Liverpool', wins: 5, draws: 4, losses: 1 },
    { id: 4, name: 'Chelsea', wins: 5, draws: 3, losses: 2 },
    { id: 5, name: 'Arsenal', wins: 4, draws: 4, losses: 2 },
    { id: 6, name: 'Tottenham Hotspur', wins: 4, draws: 3, losses: 3 },
    { id: 7, name: 'Leicester City', wins: 3, draws: 5, losses: 2 },
    { id: 8, name: 'West Ham United', wins: 3, draws: 4, losses: 3 },
    { id: 9, name: 'Everton', wins: 3, draws: 3, losses: 4 },
    { id: 10, name: 'Leeds United', wins: 2, draws: 2, losses: 6 },
  ];

  const calculatePoints = (wins, draws) => wins * 3 + draws;

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', padding: '8px', justifyContent: 'space-between', borderBottom: '1px solid #ccc' }}>
      <div style={{ width: '50%' }}>Rank</div>
      <div style={{ width: '50%' }}></div>
        <div style={{ width: '50%' }}>Club</div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', width: '50%' }}>
          <div style={{ width: 60, textAlign: 'center' }}>W</div>
          <div style={{ width: 60, textAlign: 'center' }}>D</div>
          <div style={{ width: 60, textAlign: 'center' }}>L</div>
          <div style={{ width: 60, textAlign: 'center' }}>Point</div>
          
        </div>
      </div>

      {/* Match Data */}
      <ul style={{ padding: 0 }}>
        {sampleData.map((team, index) => (
          <li key={index} style={{ listStyle: 'none', borderBottom: '1px solid #ccc', display: 'flex', padding: '8px' }}>
             <div style={{ width: '20%' }}>{team.id}</div>
             <div style={{ width: '20%' }}>
              <img src={'./images/premier.png'} alt={team.name} style={{ maxWidth: '100%', height: 'auto' }} />
            </div>
            <div style={{ width: '50%' }}>{team.name}</div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', width: '50%' }}>
              <div style={{ width: 60, textAlign: 'center' }}>{team.wins}</div>
              <div style={{ width: 60, textAlign: 'center' }}>{team.draws}</div>
              <div style={{ width: 60, textAlign: 'center' }}>{team.losses}</div>
              <div style={{ width: 60, textAlign: 'center' }}>{calculatePoints(team.wins, team.draws)}</div>
             
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Scoreboard;
