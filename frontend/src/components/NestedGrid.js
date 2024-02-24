import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import Card from '../components/Card'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  borderRadius: 15, // Rounded corners for the cards
  transition: "0.3s", // Smooth transition effects
  boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)", // Custom shadow effect
  "&:hover": {
    boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)", // Hover effect
  },
}));

export default function NestedGrid( {memes ,saved} ) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container rowSpacing={2} columnSpacing={{ xs: 3, sm: 4, md: 2 }} className='grid-img'>
        {memes.map((meme,index)=>(
        <Grid item xs={6}  md={3} key={index}>
          <Item>
            <Card meme={meme} saved={saved}/>
            {/* <p>{index}</p> */}
          </Item>
        </Grid>
        ))}
      </Grid>
    </Box>
  );
}
