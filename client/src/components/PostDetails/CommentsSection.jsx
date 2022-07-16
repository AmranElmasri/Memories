import { Button, TextField, Typography } from '@mui/material';
import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import useStyles from './styles';
import axios from 'axios';
import { updatePostAction } from '../../redux/postSlice';

const CommentsSection = ({ post }) => {
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState('');

  const dispatch = useDispatch();
  const classes = useStyles();
  const commentsRef = useRef();
  const userInfo = useSelector((state) => state.auth.authData)


  const handelComments = async () => {
    const finalComment = `${userInfo.name}: ${comment}`;
    try {
      setComments([...comments, finalComment]);  // to speed up the rendering
      setComment('');
      const { data } = await axios.post(`/api/v1/posts/${post._id}/comments`, { finalComment });
      dispatch(updatePostAction(data));


      commentsRef.current.scrollIntoView({ behavior: 'smooth' }); // scroll to bottom of current comment that was added

    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">Comments</Typography>
          {comments?.map((comment, index) => (
            <Typography key={index} gutterBottom variant="subtitle1">
              <strong>{comment.split(':')[0]} :</strong>
              {comment.split(':')[1]}
            </Typography>
          ))}
          <div ref={commentsRef} />
        </div>
        {userInfo && (
          <div style={{ width: '70%' }}>
            <Typography gutterBottom variant='h6'> Write a comment</Typography>
            <TextField
              variant='outlined'
              multiline
              rows={4}
              fullWidth
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              label="Comment"
            />
            <Button style={{ marginTop: '10px' }} variant='contained' fullWidth color='primary' disabled={!comment} onClick={handelComments}> Comment</Button>
          </div>
        )}

      </div>
    </div>
  )
}

export default CommentsSection;