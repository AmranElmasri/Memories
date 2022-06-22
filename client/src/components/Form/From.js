import React, { useState } from 'react';
import './style.css';
import { TextField, Button, Typography, Paper } from '@mui/material';
import FileBase from 'react-file-base64';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { createPostAction } from '../../redux/postSlice';

export default function From() {
  const [postData, setPostData] = useState({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
  const dispatch = useDispatch()


  const handleSubmit = (e) => {
    e.preventDefault();

    const createPost = async () => {
      try {
        const { data } = await axios.post('http://localhost:4000/api/v1/posts', postData);
        dispatch(createPostAction(data));

      } catch (error) {
        console.log(error.message)

      }
    }
    createPost();

  }
  return (
    <Paper className='paper'>
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Typography variant="h6">Creating a Memory'</Typography>
        <TextField className='field' name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator} onChange={(e) => setPostData({ ...postData, creator: e.target.value })} />
        <TextField className='field' name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
        <TextField className='field' name="message" variant="outlined" label="Message" fullWidth multiline rows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
        <TextField className='field' name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
        <div className='fileInput'><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
        <Button className='submitBtn' variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        {/* <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button> */}
      </form>
    </Paper>
  )
}
