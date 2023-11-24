import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import MatchCard from './MatchCard';
import { useNavigate } from 'react-router-dom';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function BasicStack() {
  return (
    <Box sx={{ width: '100%'}}>
      <Paper>
        <Stack direction="row" justifyContent="left" alignItems="left" padding={1}>
        <img src="https://assets.codepen.io/285131/pl-logo.svg"></img>,<h2> English Premier League</h2> 
          
        </Stack>
      </Paper>
      <Stack spacing={1}>
          <MatchCard />
          <MatchCard />
          <MatchCard />
        
      </Stack>
    </Box>
  );
}
