import './App.css';
import { Container } from '@mui/material';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Auth from './components/Auth/Auth'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { authAction } from './redux/authSlice';
import getToken from './utils/getToken';

function App() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    const user = getToken();
    user && dispatch(authAction(user))
  }, [dispatch])

  
  return (
    <BrowserRouter>
      <div className="App">
        <Container maxWidth='lg'>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/auth' element={<Auth />} />
          </Routes>
        </Container>
      </div>
    </BrowserRouter>
  );
}

export default App;
