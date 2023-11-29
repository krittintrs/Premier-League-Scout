import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

function AddMatchEvent() {
  const IOSSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
  ))(({ theme }) => ({
    position: 'absolute',
    top: '20%',
    right: '52%',
    width: 600,
    height: 45,
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
          opacity: 1,
          border: 0,
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.5,
        },
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: '#33cf4d',
        border: '6px solid #fff',
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color:
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
      },
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 300,
      height: 45,
    },
    '& .MuiSwitch-track': {
      borderRadius:  45/ 2,
      backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500,
      }),
    },
  }));

  const [isChecked, setChecked] = useState(true);

  const handleToggleChange = () => {
    setChecked(!isChecked);
  };

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
    marginTop: '20px', // Adjust the margin-top to create space between switch and inner paper
  }));

  const SwitchContainer = styled('div')({
    position: 'absolute',
    top: 0,
    left: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  });

  const ButtonContainer = styled('div')({
    position: 'absolute',
    top: '24%',
    left: '56%', // Adjust the margin-left to align the buttons to the right of the switch
  });

  const DoneButton = styled('div')({
    position: 'absolute',
    bottom: '5%',
    left: '90%', // Adjust the margin-left to align the buttons to the right of the switch
  });

  return (
    <div>
      <DemoPaper square={false}>
        <Typography variant="h6" gutterBottom>
          <h2> ADD/UPDATE Match Event </h2>
        </Typography>
        <SwitchContainer>
          <FormGroup>
            <FormControlLabel
              control={<IOSSwitch sx={{ m: 1 }} checked={isChecked} onChange={handleToggleChange} />}
            
            />
          </FormGroup>
          <ButtonContainer>
          <Stack direction="row" spacing={2}>
                  <h2>Event Type: </h2>
                  <Button variant="outlined">Score</Button>
                  <Button variant="outlined" >Sub</Button>
                  <Button variant="outlined" >Injured</Button>
                  <Button variant="outlined" >Foul</Button>
                </Stack>
          </ButtonContainer>
        </SwitchContainer>
        <InnerPaper>
          <Typography variant="h6" gutterBottom>
          <h3>TIME :  </h3>
          <h3>Scorer’s Name : </h3>
          <h3>Assister’s Name : </h3>
          </Typography>
          {/* Add your content inside the InnerPaper component */}
        </InnerPaper>
        <DoneButton>
        <Stack direction="row" spacing={2}>
                  <Button variant="outlined" >DONE</Button>
                </Stack>
        </DoneButton>
      </DemoPaper>

      <div style={{ width: '100%', height: '100%', background: 'rgba(27, 28, 33, 0.40)', borderRadius: 16, marginTop: '16px' }} />
    </div>
  );
}

export default AddMatchEvent;
