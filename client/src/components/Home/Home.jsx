import React, { useState } from 'react'
import { AppBar, Button, Container, Grid, Grow, Paper, TextField } from '@mui/material'
import Posts from '../Posts/Posts'
import Form from '../Form/From'
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { isLoadingAction } from '../../redux/postSlice';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';
import useStyles from './styles';
import Pagination from '../Pagination';
import { getPostBySearchAction } from '../../redux/postSlice';


export default function Home() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get('searchQuery');
  const page = searchParams.get('page') || 1;



  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);


  const searchPost = async () => {
    if (search.trim() || tags.length) {
      try {
        dispatch(isLoadingAction(true));
        const { data: { data } } = await axios.get(`/api/v1/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
        dispatch(getPostBySearchAction(data));
        dispatch(isLoadingAction(false));

        navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
      } catch (error) {
        console.log(error);
      }
    } else {
      navigate('/');
    }
  }

  const handleKeyPress = (e) => { // handle enter key
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  const handleAddChip = (tag) => setTags([...tags, tag]);
  const handleDeleteChip = (chipToDelete) => setTags(tags.filter((tag) => tag !== chipToDelete));

  return (
    <Grow in>
      <Container maxWidth='xl'>
        <Grid className='grid-content' container spacing={3} justifyContent="space-between" alignItems="stretch" >
          <Grid item xs={12} sm={6} md={9}>
            <Posts />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar className={classes.appBarSearch} position="static" color='inherit'>
              <TextField
                onKeyDown={handleKeyPress}
                name="search"
                variant="outlined"
                label="Search Memories"
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <ChipInput
                style={{ margin: '10px 0' }}
                value={tags}
                onAdd={(chip) => handleAddChip(chip)}
                onDelete={(chip) => handleDeleteChip(chip)}
                label="Search Tags"
                variant="outlined"
              />
              <Button onClick={searchPost} variant="contained" color="primary">Search</Button>
            </AppBar>
            <Form />
            {(!searchQuery && !tags.length) && (
              <Paper className={classes.pagination} elevation={6}>
                <Pagination page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow >
  )
}
