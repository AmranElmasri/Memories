import React, { useEffect, useState } from 'react'
import { AppBar, Avatar, Button, Toolbar, Typography } from '@mui/material'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import memories from '../../images/memories.png';
import './navbar.css'
import { useDispatch, useSelector } from 'react-redux';
import { authAction } from '../../redux/authSlice';
import getToken from '../../utils/helpers/getToken';

export default function Navbar() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const dispatch = useDispatch();

  let userInfo = useSelector((state) => state.auth.authData);

  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem('user');
    dispatch(authAction(null));
    navigate('/auth');
  }

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')))
  }, [location])

  useEffect(() => {
    const user = getToken();
    user && dispatch(authAction(user))
  }, [dispatch, location])

  return (
    <AppBar className='AppBar' position='static' color='inherit' >
      <div className='brandContainer'>
        <Typography className='Typography' variant='h2' align='center'> Memories</Typography>
        <img src={memories} alt='meomories' className="logo" />
      </div>
      <Toolbar className='toolbar'>
        {user || userInfo ?
          <div className='profile'>
            <Avatar className='purple' alt={user?.user.displayName || userInfo?.name} src={user?.user.photoURL}>{user?.user.displayName.charAt(0) || userInfo?.name.charAt(0)}</Avatar>
            <Typography className='userName' variant='h6'> {user?.user.displayName || userInfo?.name}</Typography>
            <Button className='logout-btn' variant='contained' onClick={logout}> Logout</Button>
          </div>
          :
          <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
        }
        
      </Toolbar>
    </AppBar>
  )
}
