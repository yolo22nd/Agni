import React, { useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { styled } from '@mui/system';

const Header = () => {
  const { user, logOutUser } = useContext(AuthContext);

  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={RouterLink} to="/memes">
          Home
        </Button>
        <Button color="inherit" component={RouterLink} to="/saved">
          Saved Memes
        </Button>
        <Box sx={{ flexGrow: 0.42 }} />
        {user && <Typography variant="h6">Hello {user.username} !</Typography>}
        <Box sx={{ flexGrow: 0.58 }} />
        {user ? (
            <Button color="inherit" onClick={logOutUser}>
            Logout
          </Button>
        ) : (
            <Button color="inherit" component={RouterLink} to="/login">
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
