import React, { useEffect, useState } from 'react';
import { Avatar, Button, Container, Grid, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Input from './Input';
import { useDispatch } from 'react-redux';
import './auth.css';
import { authAction } from '../../redux/authSlice';
import { auth, provider, signInWithPopup } from './Firebase';
import axios from 'axios';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const SignUp = () => {

  const [form, setForm] = useState(initialState);
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
      const result = await signInWithPopup(auth, provider);
      localStorage.setItem('user', JSON.stringify(result));
      navigate('/');
    } catch (error) {
      alert('Google Sign In was unsuccessful. Try again later');
    }

  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSignup) {
      try {
        const { data } = await axios.post('/api/v1/user/signup', form)
        navigate('/');


      } catch (error) {
        console.log(error)
      }
    } else {
      try {
        const { data } = await axios.post('/api/v1/user/signin', form);
        navigate('/');

      } catch (error) {
        console.log(error)

      }
    }
  };


  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <Container component='main' maxWidth='xs' >
      <Paper className='paperAuth' elevation={3}>
        <Avatar className='avatar'>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">{isSignup ? 'Sign up' : 'Sign in'}</Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {isSignup &&
              <>
                <Input name="firstName" label="First Name" autoFocus half handleChange={handleChange} />
                <Input name="lastName" label="Last Name" half handleChange={handleChange} />
              </>
            }
            <Input name='email' label='Email Address' type="email" handleChange={handleChange} />
            <Input
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              handleShowPassword={handleShowPassword}
              handleChange={handleChange}
            />

            {isSignup && <Input name="confirmPassword" label="Repeat Password" type="password" handleChange={handleChange} />}
          </Grid>

          <Button type="submit" fullWidth variant="contained" color="primary" className='submitButton'>
            {isSignup ? 'Sign Up' : 'Sign In'}
          </Button>

          <button className='login-with-google-btn' onClick={signInWithGoogle}>Sign in with Google</button>



          <Grid container justifyContent={'flex-end'}>
            <Grid item>
              <Button onClick={switchMode} className='switchModeBtn'>
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
