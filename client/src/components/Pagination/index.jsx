import React from 'react';
import { Pagination, PaginationItem } from '@mui/material';
import { Link } from 'react-router-dom';
import useStyles from './styles';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPostsByPageAction, isLoadingAction } from '../../redux/postSlice';


function Paginate({ page }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { totalPages } = useSelector((state) => state.posts);

  useEffect(() => {
    const getPostsByPage = async (page) => {
      dispatch(isLoadingAction(true));
      const response = await fetch(`/api/v1/posts?page=${page}`);
      const data = await response.json();
      dispatch(getPostsByPageAction(data))
      dispatch(isLoadingAction(false));
    }

    getPostsByPage(page);

  }, [page, dispatch]);

  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={totalPages}
      page={Number(page) || 1}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
      )}
    />
  )
}

export default Paginate;