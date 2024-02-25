import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import displayRazorPay from './DisplayRazorPay'
import { useLocation,useNavigate} from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { useContext,useEffect } from 'react';




const defaultTheme = createTheme();

export default function Buy() {
  let {authTokens, user} = useContext(AuthContext)
  const location = useLocation();
  const navigate= useNavigate();
//   const stock = { id: 1, name: 'Stock A', price: 100 }
    const eventId=location.state?.eventId
    // const eventId=new URL(document.location).searchParams;
  const [events,setEvents]=React.useState([])
  var id=1;
  const fetchData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/events/display/student/');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    fetchData(); 
  }, []);


//   console.log(events);
  const [tickets, setTickets] = React.useState(0); // Initialize shares state
  const [totalPrice, setTotalPrice] = React.useState(0); // Initialize totalPrice state


  const handleSharesChange = (event) => {
    const newShares = parseFloat(event.target.value);
    setTickets(newShares);
    console.log(eventId)
    const newTotalPrice = calculateTotalPrice(eventId, newShares);
    setTotalPrice(newTotalPrice);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({
      totalPrice
    });
    displayRazorPay(totalPrice,tickets,eventId,user,navigate)

  };

  const calculateTotalPrice = (price, tickets) => {
    const totalPrice = price * tickets;
    return Math.round(totalPrice);
};


  return (
    // <ThemeProvider theme={defaultTheme}>
    <Box className='bg-gradient-to-br from-cyan-800 to-indigo-950 h-screen w-full mt-0 p-8 flex justify-center items-center'>
      <Box component="main" maxWidth="xs" className='w-lg'>
        <CssBaseline />
        <Box
          // sx={{
          //   // marginTop: 8,
          //   display: 'flex',
          //   flexDirection: 'column',
          //   alignItems: 'center',
          // }}
          className='bg-white w-96 px-4 flex flex-col items-center justify-center'
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Buy Tickets
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>

                <p>Event name: {events.name}</p>
                <p>Price: {eventId}</p>

              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="shares"
                  label="Number of Tickets"
                  name="shares"
                  type="number"
                  InputProps={{ inputProps: { min: 1 } }}
                  onChange={handleSharesChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  disabled
                  id="totalPrice"
                  label="Total Price"
                  name="totalPrice"
                  value={totalPrice}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Buy
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
      </Box>
    // </ThemeProvider>
  );
}