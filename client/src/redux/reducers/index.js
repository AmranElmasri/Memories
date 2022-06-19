import { combineReducers } from 'redux';
import postReducers from './posts'

const reducers = combineReducers({
    posts: postReducers
})
export default reducers;
