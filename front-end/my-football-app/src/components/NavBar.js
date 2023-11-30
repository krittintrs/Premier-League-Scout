import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Home from '@mui/icons-material/Home';
import Person from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <Box component="nav" aria-label="My site" sx={{ flexGrow: 1 }}>
      <List role="menubar" sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <ListItem role="none">
        <Home/>
          <ListItemButton
            role="menuitem"
            component="a"
            href="#FixTurePage"
            aria-label="Home"
            
          > Premier-League-Scout
            
          </ListItemButton>
        </ListItem>
        <Divider orientation="vertical" flexItem />
        <ListItem role="none">
          <ListItemButton role="menuitem" component="a" href="#LineUP">
          LineUP
          </ListItemButton>
        </ListItem>
        <Divider orientation="vertical" flexItem />
      
        <ListItem role="none">
          <ListItemButton role="menuitem" component="a" href="#blog">
            ScoreBoard
          </ListItemButton>
        </ListItem>
        
        <Divider orientation="vertical" flexItem />
        <Link to="/LoginPage">
        <ListItem role="none">
          <ListItemButton
            role="menuitem"
            component="a"
            href="#profile"
            aria-label="Profile"
          >
            <Person />
          </ListItemButton>
        </ListItem>
        </Link>
      </List>
    </Box>
  );
};

export default NavBar;
