import React, { useEffect } from 'react'
import { Container, Grid, Grow } from '@mui/material'
import Posts from '../Posts/Posts'
import Form from '../Form/From'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { getPostsAction } from '../../redux/postSlice';

export default function Home() {
  const dispatch = useDispatch();
  const { currentId } = useSelector((state => state.posts));

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
      <Container>
        <Grid className='grid-content' container spacing={3} >
          <Grid item xs={12} sm={7}>
            <Posts />
          </Grid>
          <Grid item xs={12} sm={5}>
            <Form />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  )
}
