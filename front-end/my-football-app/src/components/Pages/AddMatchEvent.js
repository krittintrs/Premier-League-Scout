import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const DemoPaper = styled(Paper)(({ theme }) => ({
  width: 1292,
  height: 550,
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  margin: '16px',
  position: 'relative',
}));

const InnerPaper = styled(Paper)(({ theme }) => ({
  width: 1250,
  height: 250,
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: 'left',
  position: 'absolute',
  top: '35%',
  marginTop: '20px',
}));

const DoneButton = styled('div')({
  position: 'absolute',
  bottom: '5%',
  left: '90%', 
});

const MinWidthButtonGroup = ({ onSelectTeam }) => {
  return (
    <div
      variant="solid"
      size="lg"
      aria-label="solid button group"
      sx={{
        width: '10000px',
        height: '75px',
        position: 'absolute',
        top: '0px',
        left: '10px',
      }}
    >
      <Stack
        direction="row"
        spacing={2}
        sx={{
          p: 2,
          width: '100%',
          height: '75px',
        }}
      >
        <Button onClick={() => onSelectTeam('A')}>Team A</Button>
        <Button onClick={() => onSelectTeam('B')}>Team B</Button>
      </Stack>
    </div>
  );
};

const EventBar = ({ onSelectTeam }) => {
  return (
    <div
      variant="solid"
      size="lg"
      aria-label="solid button group"
      sx={{
        width: '10000px',
        height: '75px',
        position: 'absolute',
        top: '0px',
        right: '10px',
      }}
    >
      <Stack
        direction="row"
        spacing={2}
        sx={{
          p: 2,
          width: '100%',
          height: '75px',
        }}
      >
        <Button onClick={() => onSelectTeam('score', 'score')}>Score</Button>
        <Button onClick={() => onSelectTeam('sub', 'sub')}>Sub</Button>
        <Button onClick={() => onSelectTeam('injured', 'injured')}>Injured</Button>
        <Button onClick={() => onSelectTeam('foul', 'foul')}>Foul</Button>
      </Stack>
    </div>
  );
};

const BarContainer = styled('div')({
  position: 'absolute',
  top: '120px',
  left: '700px',
  width: '100%',
  height: '75px',
  display: 'flex',
  justifyContent: 'space-between',
});

const eventTypes = [
  { key: 'score', label: 'Score' },
  { key: 'sub', label: 'Sub' },
  { key: 'injured', label: 'Injured' },
  { key: 'foul', label: 'Foul' },
  // Add more event types as needed
];

const AddMatchEvent = () => {
  const [activeTeam, setActiveTeam] = useState('A');
  const [selectedEvent, setSelectedEvent] = useState('');

  const onSelectTeam = (team, event) => {
    console.log('Selected Event:', event);
    setActiveTeam(team);
    setSelectedEvent(event);
  };

  return (
    <div>
      <DemoPaper square={false}>
        <Typography variant="h6" gutterBottom>
          <h2> ADD/UPDATE Match Event </h2>
        </Typography>

        <MinWidthButtonGroup onSelectTeam={onSelectTeam} />
        <BarContainer>
          <EventBar onSelectTeam={onSelectTeam} />
        </BarContainer>

        
        {eventTypes.map((eventType) =>
          generateInnerPaperContent(activeTeam, selectedEvent, eventType.key)
        )}

        <DoneButton>
          <Link to="/MatchDetails">
            <Stack direction="row" spacing={2}>
              <Button variant="outlined">DONE</Button>
            </Stack>
          </Link>
        </DoneButton>
      </DemoPaper>
    </div>
  );
};

const generateInnerPaperContent = (team, eventTypeKey) => {
  const contentMap = {
    score: (
      <InnerPaper key="score">
        <Typography variant="h6" gutterBottom>
          <h3>TIME : {team === 'A' ? 'aaaaa' : 'bbbb'}</h3>
          <h3>Scorer’s Name : </h3>
          <h3>Assister’s Name : เเพเด </h3>
        </Typography>
      </InnerPaper>
    ),
    sub: (
      <InnerPaper key="sub">
        <Typography variant="h6" gutterBottom>
          <h3>TIME : {team === 'A' ? 'aaaaa' : 'bbbb'}</h3>
          <h3>Scorer’s Name : </h3>
          <h3>Assister’s Name : ำำำ</h3>
        </Typography>
      </InnerPaper>
    ),
    injured: (
      <InnerPaper key="injured">
        <Typography variant="h6" gutterBottom>
          <h3>TIME : {team === 'A' ? 'aaaaa' : 'bbbb'}</h3>
          <h3>Scorer’s Name : </h3>
          <h3>Assister’s Name : หหหห </h3>
        </Typography>
      </InnerPaper>
    ),
    foul: (
      <InnerPaper key="foul">
        <Typography variant="h6" gutterBottom>
          <h3>TIME : {team === 'A' ? 'aaaaa' : 'bbbb'}</h3>
          <h3>Scorer’s Name : </h3>
          <h3>Assister’s Name : ดดดด</h3>
        </Typography>
      </InnerPaper>
    ),
  };

  return contentMap[eventTypeKey] || null;
};

export default AddMatchEvent;
