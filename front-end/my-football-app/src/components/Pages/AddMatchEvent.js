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

const ButtonContainer = styled('div')({
  position: 'absolute',
  top: '140px', 
  right: '30px',
});

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

const AddMatchEvent = () => {
  const [activeTeam, setActiveTeam] = useState('A');

  const onSelectTeam = (team) => {
    setActiveTeam(team);
  };

  return (
    <div>
      <DemoPaper square={false}>
        <Typography variant="h6" gutterBottom>
          <h2> ADD/UPDATE Match Event </h2>
        </Typography>

        <MinWidthButtonGroup onSelectTeam={onSelectTeam} />
        <ButtonContainer>
          <Stack direction="row" spacing={2}>
            <h2>Event Type: </h2>
            <Button variant="outlined">Score</Button>
            <Button variant="outlined">Sub</Button>
            <Button variant="outlined">Injured</Button>
            <Button variant="outlined">Foul</Button>
          </Stack>
        </ButtonContainer>
        {activeTeam === 'A' ? (
          <InnerPaper>
            {/* InnerPaper1 content */}
            <Typography variant="h6" gutterBottom>
              <h3>TIME : aaaaa</h3>
              <h3>Scorer’s Name : </h3>
              <h3>Assister’s Name : </h3>
            </Typography>
          </InnerPaper>
        ) : (
          <InnerPaper>
            {/* InnerPaper2 content */}
            <Typography variant="h6" gutterBottom>
              <h3>TIME : bbbb</h3>
              <h3>Scorer’s Name : </h3>
              <h3>Assister’s Name : </h3>
            </Typography>
          </InnerPaper>
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

export default AddMatchEvent;
