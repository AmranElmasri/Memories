import React from 'react'
import { CircularProgress, Divider, Paper, Typography } from '@mui/material'
import moment from 'moment';
import useStyles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getPostAction, isLoadingAction } from '../../redux/postSlice';
import { useEffect } from 'react';
import axios from 'axios';
import CommentsSection from './CommentsSection';
import default_memory from '../../assets/images/default_memory.jpg'

function PostDetails() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { post, isLoading, posts } = useSelector((state) => state.posts);


  useEffect(() => {
    const getPost = async (id) => {
      try {
        dispatch(isLoadingAction(true));
        const { data } = await axios(`/api/v1/posts/${id}`);
        dispatch(getPostAction(data));
        dispatch(isLoadingAction(false));
      } catch (error) {
        console.log(error);
      }
    }
    getPost(id);
  }, [dispatch, id]);


  if (!post) return null;

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  };


  const openPost = (id) => navigate(`/posts/${id}`);


  const recommendedPosts = posts.filter(post => post._id !== id);

  return (
    <Paper style={{ padding: '20px', borderRadius: '15px'}} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">{post.title}</Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
          <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
          <Typography variant="h6">Created by: {post.creator}</Typography>
          <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <CommentsSection post={post}/>
          <Divider style={{ margin: '20px 0' }} />
        </div>
        <div className={classes.imageSection}>
          <img className={classes.media} src={post.selectedFile || default_memory} alt={post.title} />
        </div>
      </div>
      {recommendedPosts.length && (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5">You might also like:</Typography>
          <Divider />
          <div className={classes.recommendedPosts}>
            {recommendedPosts.map(({ title, creator, message, likes, selectedFile, _id }) => (
              <div style={{ margin: "20px", cursor: "pointer" }} onClick={() => openPost(_id)} key={_id}>
                <Typography gutterBottom variant='h6'>{title}</Typography>
                <Typography gutterBottom variant="subtitle2">{creator}</Typography>
                <Typography gutterBottom variant="subtitle2">{message.split('').slice(0, 30).join('')}...</Typography>
                <Typography gutterBottom variant="subtitle1">Likes: {likes.length}</Typography>
                <img className={classes.recomImg} src={selectedFile || default_memory} width="200px" alt='post-img' style={{maxHeight: "150px"}}/>
              </div>
            ))}
          </div>
        </div>
      )}
    </Paper>
  )
}

export default PostDetails