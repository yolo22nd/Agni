import React, { useEffect, useState } from 'react';
import Alert from '@mui/joy/Alert';
// import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import PlaylistAddCheckCircleRoundedIcon from '@mui/icons-material/PlaylistAddCheckCircleRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const SaveBanner = () => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {open && (
        // <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
          <Alert
            variant="soft"
            color="success"
            startDecorator={<PlaylistAddCheckCircleRoundedIcon />}
            endDecorator={
              <IconButton variant="soft" color='green' onClick={handleClose}>
                <CloseRoundedIcon />
              </IconButton>
            }
          >
            Meme saved!
          </Alert>
        // </Box>
      )}
    </>
  );
}

export default SaveBanner;
