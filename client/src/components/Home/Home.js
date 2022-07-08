import React, { useEffect } from 'react'
import { Container, Grid, Grow } from '@mui/material'
import Posts from '../Posts/Posts'
import Form from '../Form/From'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { getPostsAction } from '../../redux/postSlice';
import { useNavigate, Location, useSearchParams } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input'

export default function Home() {
  const dispatch = useDispatch();
  const { currentId } = useSelector((state => state.posts));

  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams, 888)

  useEffect(() => {
    const getPosts = async () => {
      try {
        const { data } = await axios.get('/api/v1/posts');
        dispatch(getPostsAction(data));
      } catch (error) {
        console.log(error);
      }
    }
    getPosts();

  }, [currentId, dispatch]);

  return (
    <Grow in>
      <Container maxWidth='xl'>
        <Grid className='grid-content' container spacing={3} >
          <Grid item xs={12} sm={6} md={9}>
            <Posts />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Form />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  )
}
