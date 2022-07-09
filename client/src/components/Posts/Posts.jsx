import React from 'react'
import { useSelector } from 'react-redux';
import { Grid, CircularProgress } from '@mui/material';
import Post from './Post/Post';
import './style.css';
import Spinner from '../Spinner';


export default function Posts() {
  const { posts } = useSelector(state => state.posts);
  const { isLoading } = useSelector(state => state.posts);

  if(!posts.length && !isLoading) return <div className="no-posts">No posts</div>;
    

  return (
    isLoading ? <Spinner /> : (
      <Grid  container alignItems={'stretch'} spacing={2}>
        {posts.map(post => (
          <Grid className='postGrid' item xs={12} sm={12} md={6} lg={3} key={post._id}>
            <Post post={post} />
          </Grid>
        ))}
      </Grid>
    )
  )
}
