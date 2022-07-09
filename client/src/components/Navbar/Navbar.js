import React, { useEffect, useState } from 'react'
import { AppBar, Avatar, Button, Toolbar, Typography } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'
import memories from '../../images/memories.png';
import './navbar.css'
import { useDispatch, useSelector } from 'react-redux';
import { authAction } from '../../redux/authSlice';
import getToken from '../../utils/helpers/getToken';
import axios from 'axios';


export default function Navbar() {
  const dispatch = useDispatch();

  let userInfo = useSelector((state) => state.auth.authData);

  const location = useLocation();

  const logout = async () => {
    try {
      await axios.get('/api/v1/user/logout')
      dispatch(authAction(null));
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => { 
    const user = getToken();
    user && dispatch(authAction(user))
  }, [dispatch, location])

  return (
    <AppBar className='AppBar' position='static' color='inherit' >
      <Link className='brandContainer' to={'/'}>
        <Typography className='Typography' variant='h2' align='center'> Memories</Typography>
        <img src={memories} alt='meomories' className="logo" />
      </Link>
      <Toolbar className='toolbar'>
        {userInfo ?
          <div className='profile'>
            <Avatar className='purple' alt={userInfo?.name}>{userInfo?.name.charAt(0)}</Avatar>
            <Typography className='userName' variant='h6'> {userInfo?.name}</Typography>
            <Button className='logout-btn' variant='contained' onClick={logout}> Logout</Button>
          </div>
          :
          <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
        }

      </Toolbar>
    </AppBar>
  )
}
