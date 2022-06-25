import React, { useEffect, useState } from 'react';
import { Avatar, Button, Container, Grid, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Input from './Input';
import { useDispatch } from 'react-redux';
import './auth.css';
import { authAction } from '../../redux/authSlice';
import { auth, provider, signInWithPopup } from './Firebase';

const SignUp = () => {

  const [isSignup, setIsSignup] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);


  const switchMode = () => {
    // setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };


  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider)
      localStorage.setItem('user', JSON.stringify(result))
      navigate('/');
    } catch (error) {
      alert('Google Sign In was unsuccessful. Try again later');
    }

  };



  return (
    <Container component='main' maxWidth='xs' >
      <Paper className='paperAuth' elevation={3}>
        <Avatar className='avatar'>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">{isSignup ? 'Sign up' : 'Sign in'}</Typography>
        <form>
          <Grid container spacing={3}>
            {isSignup &&
              <>
                <Input name="firstName" label="First Name" autoFocus half />
                <Input name="lastName" label="Last Name" half />
              </>
            }
            <Input name='email' label='Email Address' type="email" />
            <Input
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              handleShowPassword={handleShowPassword} />

            {isSignup && <Input name="confirmPassword" label="Repeat Password" type="password" />}
          </Grid>

          <Button type="submit" fullWidth variant="contained" color="primary" className='submitButton'>
            {isSignup ? 'Sign Up' : 'Sign In'}
          </Button>

          <button className='login-with-google-btn' onClick={signInWithGoogle}>Sign in with Google</button>



          <Grid container justifyContent={'flex-end'}>
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}

export default SignUp;
