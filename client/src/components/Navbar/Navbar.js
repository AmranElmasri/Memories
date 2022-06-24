import React from 'react'
import { AppBar, Avatar, Button, Toolbar, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import memories from '../../images/memories.png';
import './navbar.css'

export default function Navbar() {
  const user = null;

  return (
    <AppBar className='AppBar' position='static' color='inherit' >
      <div className='brandContainer'>
        <Typography className='Typography' variant='h2' align='center'> Memories</Typography>
        <img src={memories} alt='meomories' className="logo" />
      </div>
      <Toolbar className='toolbar'>
        {user ?
          <div className='profile'>
            <Avatar className='purple' alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
            <Typography className='userName' variant='h6'> {user.result.name}</Typography>
            <Button className='logout' variant='contained' color="secondary" onClick={() => { }}> Logout</Button>
          </div>
          :
          <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
        }

      </Toolbar>
    </AppBar>
  )
}
