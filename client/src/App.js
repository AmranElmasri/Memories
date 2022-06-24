import './App.css';
import { Container } from '@mui/material';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {


  return (
    <BrowserRouter>
      <div className="App">
        <Container maxWidth='lg'>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
          </Routes>
        </Container>
      </div>
    </BrowserRouter>
  );
}

export default App;
