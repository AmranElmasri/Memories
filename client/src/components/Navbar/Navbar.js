import React, { useEffect, useState } from 'react'
import { AppBar, Avatar, Button, Toolbar, Typography } from '@mui/material'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import memories from '../../images/memories.png';
import './navbar.css'

export default function Navbar() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem('user');
    navigate('/auth');
  }

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')))
  }, [location])

  return (
    <AppBar className='AppBar' position='static' color='inherit' >
      <div className='brandContainer'>
        <Typography className='Typography' variant='h2' align='center'> Memories</Typography>
        <img src={memories} alt='meomories' className="logo" />
      </div>
      <Toolbar className='toolbar'>
        {user ?
          <div className='profile'>
            <Avatar className='purple' alt={user?.user.displayName} src={user?.user.photoURL}>{user?.user.displayName.charAt(0)}</Avatar>
            <Typography className='userName' variant='h6'> {user?.user.displayName}</Typography>
            <Button className='logout-btn' variant='contained' onClick={logout}> Logout</Button>
          </div>
          :
          <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
        }

      </Toolbar>
    </AppBar>
  )
}
