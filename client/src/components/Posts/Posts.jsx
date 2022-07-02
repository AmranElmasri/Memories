import React from 'react'
import { useSelector } from 'react-redux';
import { Grid, CircularProgress } from '@mui/material';
import Post from './Post/Post';
import './style.css';
import Spinner from '../Spinner';


export default function Posts() {
  const { posts } = useSelector(state => state.posts);

  return (
    !posts.length ? <Spinner /> : (
      <Grid  container alignItems={'stretch'} spacing={3}>
        {posts.map(post => (
          <Grid className='postGrid' item xs={12} sm={6} md={6} key={post._id}>
            <Post post={post} />
          </Grid>
        ))}
      </Grid>
    )
  )
}
