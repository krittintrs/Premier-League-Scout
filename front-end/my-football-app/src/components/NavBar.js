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
    <Box component="nav" aria-label="My site" sx={{ flexGrow: 1, width: '100vw', position: 'sticky', top: 0, background: '#fff', zIndex: 1000 }}>
      <List role="menubar" sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <ListItem role="none">
          <Home />
          <ListItemButton
            role="menuitem"
            component={Link}
            to="/FixTurePage"
            aria-label="Home"
          >
            Premier-League-Scout
          </ListItemButton>
        </ListItem>
        <Divider orientation="vertical" flexItem />
        <ListItem role="none">
          <ListItemButton component={Link} to="/LineUP">
            LineUP
          </ListItemButton>
        </ListItem>
        <Divider orientation="vertical" flexItem />
        <ListItem role="none">
          <ListItemButton component={Link} to="/ScoreBoard">
            ScoreBoard
          </ListItemButton>
        </ListItem>
        <Divider orientation="vertical" flexItem />
        <Link to="/LoginPage">
          <ListItem role="none">
            <ListItemButton
              role="menuitem"
              component="a"
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
