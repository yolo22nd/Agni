import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';
import { CircularProgress } from '@mui/material';

const Display = () => {
    const location = useLocation();
    const [memeUrl, setMemeUrl] = useState('');
    const [loading, setLoading] = useState(true);
    const memeid = location.state?.memeId;
    const textboxval = location.state?.textboxValues;

    
      useEffect(() => {
        async function makeRequest() {
          try {
            const data = {
              template_id: memeid,
              username: 'omtank22',
              password: 'imgflipp',
            };

            // Create the "boxes" array
            const boxes = textboxval.map((text) => ({
              text,
            }));
      
            // Add the "boxes" array to the data object
            data.boxes = boxes;
      
            const requestData = qs.stringify(data);

            const config = {
              method: 'post',
              maxBodyLength: Infinity,
              url: 'https://api.imgflip.com/caption_image',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
              data: requestData,
            };
      
            const response = await axios.request(config);
            console.log(JSON.stringify(response.data));
      
            if (response.data.success) {
              setMemeUrl(response.data.data.url);
            } else {
              console.error('Failed to generate meme:', response.data.error_message);
            }
          } catch (error) {
            console.log(error);
          } finally {
            setLoading(false);
          }
        }
      
        makeRequest();
      }, [memeid, textboxval]);
      
  if (loading) {
    return <CircularProgress />;
  }

  console.log('Meme URL:', memeUrl);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      {isValidURL(memeUrl) && (
        <img
          src={memeUrl}
          alt="Generated Meme"
          style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
        />
      )}
    </div>
  );
};

function isValidURL(string) {
    try {
      new URL(string);
      return true;
    } catch (error) {
      return false;
    }
  }

export default Display;
