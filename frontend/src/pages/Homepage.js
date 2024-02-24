import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Paper, Typography } from '@mui/material';
import { styled } from '@mui/system';
import AuthContext from '../context/AuthContext';
import Header from '../components/Header';
import SaveBanner from '../components/SaveBanner';

const StyledPaper = styled(Paper)({
  height: 'calc(100vh - 64px)', // Subtracting the height of the Header
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#f5f5f5',
  },
});

const Homepage = () => {
  const navigate = useNavigate();
  let { authTokens, logOutUser } = useContext(AuthContext);
  let [saved, setSaved] = useState([]);

  const handleMemeClick = () => {
    navigate('/memes');
  };

  const handleUserClick = () => {
    navigate('/saved');
  };

  return (
    <div>
      {saved ? "" : <SaveBanner />}
      <Header />
      <Grid container spacing={0}>
        <Grid item xs={6}>
          <StyledPaper onClick={handleMemeClick}>
            <Typography variant="h4">Memes</Typography>
          </StyledPaper>
        </Grid>
        <Grid item xs={6}>
          <StyledPaper onClick={handleUserClick}>
            <Typography variant="h4">Saved</Typography>
          </StyledPaper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Homepage;
