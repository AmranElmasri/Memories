import React, { useEffect, useState } from 'react';
import './style.css';
import { TextField, Button, Typography, Paper } from '@mui/material';
import FileBase from 'react-file-base64';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { createPostAction, updatePostAction, createCurrentId } from '../../redux/postSlice';

export default function From() {
  const [postData, setPostData] = useState({ title: '', message: '', tags: '', selectedFile: '' });
  const dispatch = useDispatch();
  const { currentId } = useSelector((state => state.posts));
  const { posts } = useSelector((state => state.posts));
  const userInfo = useSelector((state) => state.auth.authData);

  useEffect(() => {
    if (currentId) {
      const post = posts.find((post) => post._id === currentId);
      setPostData(post);
    }
  }, [currentId, posts])

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId) {
      const updatePost = async () => {
        try {
          const { data } = await axios.patch(`/api/v1/posts/${currentId}`, { ...postData, creator: userInfo?.name });
          dispatch(updatePostAction(data));

        } catch (error) {
          console.log(error);
        }
      }

      updatePost();

    } else {
      const createPost = async () => {
        try {
          const { data } = await axios.post('/api/v1/posts', { ...postData, creator: userInfo?.name });
          dispatch(createPostAction(data));

        } catch (error) {
          console.log(error)
        }
      }

      createPost();
    }

    clearInputs();
  }

  const clearInputs = () => {
    dispatch(createCurrentId(null));
    setPostData({ title: '', message: '', tags: '', selectedFile: '' });
  }


  if (!userInfo && !JSON.parse(localStorage.getItem('user'))) {
    return (
      <Paper className='paperText'>
        <Typography variant="h6" align="center">
          Please Sign In to create your own memories and like other's memories.
        </Typography>
      </Paper>
    );
  }


  return (
    <Paper className='paper' elevation={6}>
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Typography sx={{textAlign: 'center'}} variant="h6">{currentId ? 'Update Memory' : 'Creating a Memory'} </Typography>
        <TextField className='field' name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
        <TextField className='field' name="message" variant="outlined" label="Message" fullWidth multiline rows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
        <TextField className='field' name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
        <div className='fileInput'><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
        <Button className='submitBtn' variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button className='clear-btn' variant="contained" size="small" fullWidth onClick={clearInputs}>Clear</Button>
      </form>
    </Paper>
  )
}


