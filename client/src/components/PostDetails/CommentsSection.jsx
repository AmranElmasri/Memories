import { Button, TextField, Typography } from '@mui/material';
import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import useStyles from './styles';


const CommentsSection = ({ post }) => {
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState('');

  const dispatch = useDispatch();
  const classes = useStyles();
  const commentsRef = useRef();


  const handelComment = async() => {

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
        <Button style={{ marginTop: '10px' }} variant='contained' fullWidth color='primary' disabled={!comment} onClick={handelComment}> Comment</Button>
      </div>

    </div>
    </div>
  )
}

export default CommentsSection;