import React from 'react';
import './style.css';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';


export default function Post({ post }) {
  return (
    <Card className='card'>
      <CardMedia className='cardMedia' image={post.selectedFile} title={post.title} />
      <div className='overlay'>
        <Typography variant='h6'>{post.creator}</Typography>
        <Typography variant='body2'>{moment(post.createAt).fromNow()}</Typography>
      </div>
      <div className='overlay2'>
        <Button style={{ color: 'white' }} size='small' onClick={() => { }}>
          <MoreHorizIcon fontSize='small' />
        </Button>
      </div>
      <div className='details'>
        <Typography variant='body2' color='textSecondary'> {post.tags.map((tag) => `#${tag} `)}</Typography>
      </div>
      <Typography className='title' gutterBottom variant="h5" component="h2">{post.title}</Typography>

      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
      </CardContent>

      <CardActions className='cardActions'>
        <Button size="small" color="primary" onClick={() => { }}>
          <ThumbUpOffAltIcon fontSize="small" />
          Like {post.likeCount}
        </Button>
        <Button size="small" color="primary" onClick={() => { }}>
          <DeleteIcon fontSize="small" />
          Delete
        </Button>
      </CardActions>

    </Card>
  )
}
