import React from 'react'
import { useSelector } from 'react-redux';
import { Grid, CircularProgress } from '@mui/material';
import Post from './Post/Post';
import './style.css'


export default function Posts() {
  const { posts } = useSelector(state => state.posts);
  console.log(posts)

  return (
    !posts.length ? <CircularProgress /> : (
      <Grid  container alignItems={'stretch'} spacing={3}>
        {posts.map(post => (
          <Grid className='postGrid' key={post._id} item xs={12} sm={6} md={6}>
            <Post post={post} />
          </Grid>
        ))}
      </Grid>
    )
  )
}
