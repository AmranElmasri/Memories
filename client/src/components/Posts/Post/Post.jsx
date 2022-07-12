import React from 'react';
import './style.css';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { createCurrentId, deletePostAction, likePostAction } from '../../../redux/postSlice'
import axios from 'axios';


export default function Post({ post }) {
  const dispatch = useDispatch();
  let userInfo = useSelector((state) => state.auth.authData);


  const deletePost = async (id) => {
    try {
      await axios.delete(`/api/v1/posts/${id}`);
      dispatch(deletePostAction(id));

    } catch (error) {
      console.log(error);
    }
  };

  const likePost = async (id) => {
    try {
      const { data } = await axios.patch(`/api/v1/posts/${id}/like`);
      dispatch(likePostAction(data));

    } catch (error) {
      console.log(error);
    }
  };


  const Likes = () => {
    if (post.likes?.length > 0) {
      return post.likes.find((like) => like === (JSON.parse(localStorage.getItem('user')))?.user.uid || userInfo?.id)
        ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}</>
        ) : (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }

    return <><ThumbUpOffAltIcon fontSize="small" />&nbsp;Like</>;
  };

  return (
    <Card className='card' raised elevation={6}>
      <CardMedia className='cardMedia' image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} />
      <div className='overlay'>
        <Typography variant='h6'>{post.creator}</Typography>
        <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
      </div>
      {(JSON.parse(localStorage.getItem('user'))?.user.uid === post.creatorId || userInfo?.id === post.creatorId) &&
        <div className='overlay2'>
          <Button style={{ color: 'white' }} size='small' onClick={() => { dispatch(createCurrentId(post._id)) }}>
            <MoreHorizIcon fontSize='small' />
          </Button>
        </div>
      }
      <div className='details'>
        <Typography variant='body2' color='textSecondary'> {post.tags.map((tag) => `#${tag} `)}</Typography>
      </div>
      <Typography className='title' gutterBottom variant="h5" component="h2">{post.title}</Typography>

      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
      </CardContent>

      <CardActions className='cardActions'>
        <Button size="small" color="primary" className='btn' disabled={!userInfo && !JSON.parse(localStorage.getItem('user'))} onClick={() => { likePost(post._id) }}>
          <Likes />
        </Button>

        {(JSON.parse(localStorage.getItem('user'))?.user.uid === post.creatorId || userInfo?.id === post.creatorId) &&
          <Button size="small" color="primary" onClick={() => { deletePost(post._id) }}>
            <DeleteIcon fontSize="small" />
            Delete
          </Button>
        }
      </CardActions>

    </Card>
  )
}
