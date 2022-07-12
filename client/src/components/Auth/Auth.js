import React, { useEffect, useState } from 'react';
import { Avatar, Container, Button, Grid, Paper, Typography, InputAdornment, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import './auth.css';
import { auth, provider, signInWithPopup } from './Firebase';
import axios from 'axios';
import { signupSchema, signinSchema } from '../../utils/validation';
import Form from '../FormUI/Form';
import Input from '../FormUI/Input';
import Submit from '../FormUI/Submit';
import SnackbarMsg from '../Snackbar';

const SignUp = () => {
  let initialValues = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);


  const switchMode = () => {
    initialValues = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };


  const signUpWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);

      const userInformation = { firstName: result.user.displayName.split(' ')[0], lastName: result.user.displayName.split(' ')[1] || '', email: result.user.email, password: result.user.accessToken, confirmPassword: result.user.accessToken };
      await axios.post('/api/v1/user/signup', userInformation);
      navigate('/');
    } catch (error) {
      const { message } = error.response?.data || { message: 'Google Sign In was unsuccessful. Try again later' };
      setError(message);
    }


  };


  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const userInformation = { email: result.user.email, password: result.user.accessToken };
      await axios.post('/api/v1/user/signin', userInformation);
      navigate('/');
    } catch (error) {
      const { message } = error.response?.data || { message: 'Google Sign In was unsuccessful. Try again later' };
      setError(message);
    }

  };


  const handleSubmit = async (userInformation) => {

    if (isSignup) {
      try {
        await axios.post('/api/v1/user/signup', { ...userInformation });
        navigate('/');

      } catch (error) {
        const { message } = error.response?.data;
        if (message) setError(message);

        if (error.response.status === 500) navigate('/error');
      }
    } else {
      try {
        await axios.post('/api/v1/user/signin', { ...userInformation });
        navigate('/');

      } catch (error) {
        const { message } = error.response?.data;
        if (message) setError(message);

        if (error.response.status === 500) navigate('/error');

      }
    }
  };



  const signWithGoogle = async () => {
    if (isSignup) {
      signUpWithGoogle();
    } else {
      signInWithGoogle();
    }
  };


  return (
    <Container component='main' maxWidth='xs' >
      <Paper className='paperAuth' elevation={3}>
        <Avatar className='avatar'>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">{isSignup ? 'Sign up' : 'Sign in'}</Typography>
        <Form
          initialValues={initialValues}
          validationSchema={isSignup ? signupSchema : signinSchema}
          onSubmit={handleSubmit}
        >

          <Grid container spacing={3}>
            {isSignup &&
              <>
                <Grid item xs={12} sm={6}>
                  <Input name="firstName" label="First Name" />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Input name="lastName" label="Last Name" />
                </Grid>
              </>
            }
            <Grid item xs={12}>
              <Input name='email' label='Email Address' type="email" />
            </Grid>

            <Grid item xs={12}>
              <Input
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowPassword}>
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>

            {isSignup &&
              <Grid item xs={12}>
                <Input name="confirmPassword" label="Repeat Password" type="password" />
              </Grid>
            }

          </Grid>

          <Submit fullWidth variant="contained" color="primary" className='submitButton'>
            {isSignup ? 'Sign Up' : 'Sign In'}
          </Submit>

          <button className='login-with-google-btn' onClick={signWithGoogle}>Sign in with Google</button>



          <Grid container justifyContent={'flex-end'}>
            <Grid item>
              <Button onClick={switchMode} className='switchModeBtn'>
                {isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </Form>
        {error && <SnackbarMsg message={error} severity={'error'} />}
      </Paper>
    </Container>
  )
}

export default SignUp;
