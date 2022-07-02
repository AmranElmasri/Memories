import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useState } from 'react';

// function flash(props){
//     return <Alert elevation={6} variant='outlined' {...props} />    
// }

function SnackbarMsg({ severity, message }) {
  const [open, setOpen] = useState(true);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  }

  return (
    <div className='snckbar'>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert elevation={6} severity={severity} onClose={handleClose} >
          {message}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default SnackbarMsg