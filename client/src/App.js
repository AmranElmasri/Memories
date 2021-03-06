import { Box, Container, createTheme, ThemeProvider } from '@mui/material';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Auth from './components/Auth/Auth'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authAction } from './redux/authSlice';
import getToken from './utils/helpers/getToken';
import Error from './components/Error';
import PostDetails from './components/PostDetails/PostDetails';



function App() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.authData);
  const [mode, setMode] = useState('light');


  useEffect(() => {
    const user = getToken();
    user && dispatch(authAction(user))
  }, [dispatch]);


  const darkTheme = createTheme({
    palette: {
      mode: mode,
    }
  })

  return (
    <BrowserRouter>
      <ThemeProvider theme={darkTheme}>
        <Box bgcolor={"background.default"} color={"text.primary"} sx={{ width: '100vw', height: 'lvh' }}>
          <Container maxWidth='xl'>
            <Navbar mode={mode} setMode={setMode} />
            <Routes>
              <Route path='/' element={<Navigate to='posts' />} />
              <Route path='/posts' element={<Home />} />
              <Route path='/posts/search' element={<Home />} />
              <Route path='/posts/:id' element={<PostDetails />} />
              <Route path='/auth' element={!userInfo ? <Auth /> : <Navigate to='/' replace />} />
              <Route path='*' element={<Error status={404} />} />
              <Route path='/error' element={<Error status={500} />} />
            </Routes>
          </Container>
        </Box>
      </ThemeProvider>
    </BrowserRouter>
  );
}

// you can use use useNavigate instead of Navigate component

/* To keep the history clean,
  you should set replace prop.
   This will avoid extra redirects after the user click back. 
  */

export default App;
