import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Container, Button, Box } from '@mui/material';
import './style.css';

function Error({ status }) {
  const navigate = useNavigate();

  return (
    <Box className='box'>
      <Container className='container'>
        <Typography variant="h1" fontWeight="bold" color="primary">{status}</Typography>
        <Typography
          component="p"
          variant="h5"
          fontSize="1.8"
          marginBottom="1rem"
        >
          {status === 404 ? 'Page Not Found' : 'Internal Server Error'}
        </Typography>
        {status === 404 ? (
          <Typography component="span" fontSize="1.3rem">
            The page you&apos;re looking for is not found, Go back to
            {' '}
            <Button variant="contained" onClick={() => navigate('/')} >Homepage</Button>
          </Typography>
        ) : (
          <Typography
            component="span"
            fontSize="1.3rem"
          >
            We are having some issues with our server, please try again later.
          </Typography>
        )}
      </Container>
    </Box>
  );
}

export default Error;
