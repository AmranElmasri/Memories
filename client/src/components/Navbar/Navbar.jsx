import React, { useEffect, useState } from 'react'
import { AppBar, Avatar, Button, FormControlLabel, FormGroup, Toolbar, Typography } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'
import memories from '../../assets/images/memories.png';
import textLogo from '../../assets/images/memories-Text.png'
import './navbar.css'
import { useDispatch, useSelector } from 'react-redux';
import { authAction } from '../../redux/authSlice';
import getToken from '../../utils/helpers/getToken';
import axios from 'axios';
import { MaterialUISwitchMode } from '../SwitchDarkMode/CustomSwitchMode';


export default function Navbar({ mode, setMode }) {
  const [darkLogo, setDarkLogo] = useState(false);

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
    <>
      <div style={{ height: "20px" }}></div>
      <AppBar className='AppBar' position='static' color='inherit' >
        <Link className='brandContainer' to={'/'}>
          {darkLogo ?
            <Typography className="darkLogo" variant="h3" style={{ marginRight: "20px", fontWeight: "bold" }}>MEMORIES</Typography>
            :
            <img src={textLogo} alt="logo" height='45px' style={{ marginRight: "20px" }} />
          }
          <img src={memories} alt='logo' height='45px' />
        </Link>
        <Toolbar className='toolbar'>
          {userInfo ?
            <div className='profile'>
              <FormGroup>
                <FormControlLabel
                  control={<MaterialUISwitchMode />}
                  onChange={(e) => {
                    setMode(mode === "light" ? "dark" : "light")
                    setDarkLogo(!darkLogo)
                  }}
                />
              </FormGroup>
              <Avatar className='purple' alt={userInfo?.name} sx={{ display: { xs: "none", sm: "flex" } }}>{userInfo?.name.charAt(0)}</Avatar>
              <Typography className='userName' variant='h6' sx={{ display: { xs: "none", sm: "none", md: "block" } }}> {userInfo?.name}</Typography>
              <Button className='logout-btn' variant='contained' onClick={logout}> Logout</Button>
            </div>
            :
            <>
              <FormGroup>
                <FormControlLabel
                  control={<MaterialUISwitchMode sx={{ m: 1 }} />}
                  onChange={(e) => {
                    setMode(mode === "light" ? "dark" : "light")
                    setDarkLogo(!darkLogo)
                  }}
                />
              </FormGroup>
              <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
            </>
          }

        </Toolbar>
      </AppBar>
    </>
  )
}
