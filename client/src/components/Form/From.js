import React, { useEffect, useState } from 'react';
import './style.css';
import { TextField, Button, Typography, Paper } from '@mui/material';
import FileBase from 'react-file-base64';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { createPostAction, updatePostAction, createCurrentId } from '../../redux/postSlice';

export default function From() {
  const [postData, setPostData] = useState({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
  const dispatch = useDispatch();
  const { currentId } = useSelector((state => state.posts));
  const { posts } = useSelector((state => state.posts));

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
          const { data } = await axios.patch(`http://localhost:4000/api/v1/posts/${currentId}`, postData);
          dispatch(updatePostAction(data));
        } catch (error) {
          console.log(error);
        }
      }

      updatePost();

    } else {
      const createPost = async () => {
        try {
          const { data } = await axios.post('http://localhost:4000/api/v1/posts', postData);
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
    setPostData({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
  }


  return (
    <Paper className='paper'>
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? 'Update Memory' : 'Creating a Memory'} </Typography>
        <TextField className='field' name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator} onChange={(e) => setPostData({ ...postData, creator: e.target.value })} />
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


