import React from 'react';
import Button from '@mui/material/Button';
import { Paper, styled } from '@mui/material';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

const LineUp = () => {
  const handleAddClick = () => {
    console.log('ADD button clicked!');
  };

  const ADDButton = styled('div')({
    position: 'absolute',
    bottom: '5%',
    left: '90%', // Adjust the margin-left to align the buttons to the right of the switch
  });

  const TeamAPaper = styled(Paper)(({ theme }) => ({
    width: 900,
    height: 300,
    padding: theme.spacing(2),
    ...theme.typography.body2,
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    margin: '50px',
    position: 'relative',
  }));

  const TeamBPaper = styled(Paper)(({ theme }) => ({
    width: 900,
    height: 300,
    padding: theme.spacing(2),
    ...theme.typography.body2,
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    margin: '68px 50px 5px',
    position: 'relative',
  }));

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  
  return (
    <>
    <div style={{width: '100%', height: '100%', position: 'relative'}}>
    <div style={{width: 150, height: 40, left: 50, top: 3, position: 'absolute', background: 'rgba(27, 28, 33, 0.40)', borderRadius: 10}} />
    <div style={{left: 80, top: 5, position: 'absolute', textAlign: 'center', color: 'rgba(255, 255, 255, 0.60)', fontSize: 24, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Team A</div>
</div>
      <TeamAPaper square={false}>
      <Box sx={{ width: '100%' }}>
      <Stack direction="column" spacing={2}>
        <Item>Item 1</Item>
        <Item>Item 2</Item>
        <Item>Item 3</Item>
        <Item>Item 4</Item>
   
      </Stack>
    </Box>
        <ADDButton>
          <Button variant="contained" disableElevation onClick={handleAddClick}>
            ADD
          </Button>
        </ADDButton>
      </TeamAPaper>

      <div style={{width: '100%', height: '100%', position: 'relative'}}>
    <div style={{width: 150, height: 40, left: 50, top:-30, position: 'absolute', background: 'rgba(127.50, 127.50, 127.50, 0.60)', borderRadius: 10}} />
    <div style={{left: 80, top: -30, position: 'absolute', textAlign: 'center', color: 'rgba(255, 255, 255, 0.60)', fontSize: 24, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Team B</div>
</div>
      <TeamBPaper square={false}>
      <Box sx={{ width: '100%' }}>
      <Stack direction="column" spacing={2}>
        <Item>Item 1</Item>
        <Item>Item 2</Item>
        <Item>Item 3</Item>
        <Item>Item 4</Item>
        
      </Stack>
    </Box>
        <ADDButton>
          <Button variant="contained" disableElevation onClick={handleAddClick}>
            ADD
          </Button>
        </ADDButton>
      </TeamBPaper>
    </>
  );
};

export default LineUp;
