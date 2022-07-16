import React, { useState } from 'react';
import './style.css';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@mui/material';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { createCurrentId, deletePostAction, likePostAction } from '../../../redux/postSlice'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import default_memory from '../../../assets/images/default_memory.jpg'

export default function Post({ post }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let userInfo = useSelector((state) => state.auth.authData);

  const [likes, setLikes] = useState(post?.likes); //(to speed up rendering) 


  const deletePost = async (id) => {
    try {
      await axios.delete(`/api/v1/posts/${id}`);
      dispatch(deletePostAction(id));

    } catch (error) {
      console.log(error);
    }
  };

  const hasLikedPost = post.likes.find((like) => like === userInfo?.id);


  const likePost = async (id) => {
    try {

      if (hasLikedPost) { // if user has already liked post, remove like from likes array (to speed up rendering)
        setLikes(post.likes.filter((id) => id !== userInfo?.id));
      } else {
        setLikes([...post.likes, userInfo?.id]);
      }

      const { data } = await axios.patch(`/api/v1/posts/${id}/like`);
      dispatch(likePostAction(data));


    } catch (error) {
      console.log(error);
    }
  };


  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((id) => id === userInfo?.id)
        ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}`}</>
        ) : (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }

    return <><ThumbUpOffAltIcon fontSize="small" />&nbsp;Like</>;
  };

  const openPost = () => navigate(`/posts/${post._id}`);


  return (
    <Card className='card' raised elevation={6}>

      {(JSON.parse(localStorage.getItem('user'))?.user.uid === post.creatorId || userInfo?.id === post.creatorId) &&
        <div className='overlay2'>
          <Button style={{ color: 'white' }} size='small' onClick={() => { dispatch(createCurrentId(post._id)) }}>
            <EditIcon fontSize='small' />
          </Button>
        </div>
      }
      <ButtonBase
        component="span"
        name="test"
        className='cardAction'
        onClick={openPost}
      >
        <CardMedia className='cardMedia' image={post.selectedFile || default_memory} />
        <div className='overlay'>
          <Typography variant='h6'>{post.creator}</Typography>
          <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
        </div>
        <div className='details'>
          <Typography variant='body2' color='textSecondary'> {post.tags.map((tag) => `#${tag} `)}</Typography>
        </div>
        <Typography className='title' gutterBottom variant="h5" component="h2">{post.title}</Typography>

        <CardContent>
          <Typography className='message' variant="body2" color="textSecondary" component="p">{post.message.split('').slice(0, 40).join('')} ...</Typography>
        </CardContent>
      </ButtonBase>

      <CardActions className='cardActions' >
        <Button size="small" color="primary" className='btn' disabled={!userInfo && !JSON.parse(localStorage.getItem('user'))} onClick={() => { likePost(post._id) }}>
          <Likes />
        </Button>

        {(JSON.parse(localStorage.getItem('user'))?.user.uid === post.creatorId || userInfo?.id === post.creatorId) &&
          <Button size="small" color="error" onClick={() => { deletePost(post._id) }} >
            <DeleteIcon fontSize="small" />
            Delete
          </Button>
        }
      </CardActions>

    </Card>
  )
}
