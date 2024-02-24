import React, { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';
import { Button, TextField, Grid, Paper, Typography, Link } from '@mui/material';
import { styled } from '@mui/system';

const StyledPaper = styled(Paper)({
  padding: 20,
  height: '50vh',
  width: 280,
  margin: '20px auto',
});

const StyledButton = styled(Button)({
  marginTop: 20,
});

const RegisterPage = () => {
    const { registerUser } = useContext(AuthContext);  // Get the registerUser function from context

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        registerUser(username, password);  // Call the registerUser function with username and password
    };

    return (
        <Grid>
            <StyledPaper elevation={10}>
                <Grid align='center'>
                    <Typography variant='h4' color='primary'>
                        Register
                    </Typography>
                </Grid>
                <form onSubmit={handleSubmit}>
                    <TextField label='Username' placeholder='Enter username' fullWidth required onChange={(e) => setUsername(e.target.value)} />
                    <TextField label='Password' placeholder='Enter password' type='password' fullWidth required onChange={(e) => setPassword(e.target.value)} />
                    <StyledButton type='submit' color='primary' variant='contained' fullWidth>
                        Register
                    </StyledButton>
                </form>
                <Typography>
                    <br />
                    <Link href="/login">
                        Already have an account? Login
                    </Link>
                </Typography>
            </StyledPaper>
        </Grid>
    );
};

export default RegisterPage;
