import './App.css';
import { Container } from '@mui/material';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Auth from './components/Auth/Auth'

function App() {

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
