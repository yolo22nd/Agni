import React,{useState} from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import { pink } from '@mui/material/colors';
import Download from '../components/Download'

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
color: pink,
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  '& .meme-img': {
    maxWidth: '100%',
    height: '250px',
    borderRadius: '10px',
  },
  '& h6': {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  '& button': {
    color: theme.palette.mode === 'dark' ? '#fff' : '#000',
    borderColor: theme.palette.mode === 'dark' ? '#fff' : '#000',
  },
}));

const Card = ({ meme, saved }) => {
    const navigate = useNavigate();
    let [open, setOpen] = useState(false)
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleCreateMemeClick = (event) => {
      event.stopPropagation();
      !saved? navigate('/create/'+meme.id, { state: { meme:meme, memeId: meme.id, name: meme.name, url: meme.url, box_count: meme.box_count } })
      :setOpen(true)
    };
  
    return (
      <StyledPaper elevation={3} onClick={handleCreateMemeClick}>
         <img className="meme-img" src={meme.url} alt={meme.name} />
        
        <Typography variant="h6">
          {meme.name}
        </Typography>
        {open && (
                  <Download handleClose={handleClose} url={meme.url} open={open} saved={saved}/>
              )}
      </StyledPaper>
    );
  };
  
  export default Card;
  