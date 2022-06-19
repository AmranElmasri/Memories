import './App.css';
import { Container, AppBar, Typography, Grid, Grow, } from '@mui/material';
import Form from './components/Form/From';
import Posts from './components/Posts/Posts';
import memories from './images/memories.png';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getPosts } from './redux/actions/post';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    getPosts(dispatch);
  }, [dispatch]);

  return (
    <div className="App">
      <Container maxWidth='lg'>
        <AppBar className='AppBar' position='static' color='inherit' >
          <Typography className='Typography' variant='h2' align='center'> Memories</Typography>
          <img src={memories} alt='meomories' className="logo" />
        </AppBar>
        <Grow in>
          <Container>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={7}>
                <Posts />
              </Grid>
              <Grid item xs={12} sm={5}>
                <Form />
              </Grid>
            </Grid>
          </Container>
        </Grow>
      </Container>
    </div>
  );
}

export default App;
