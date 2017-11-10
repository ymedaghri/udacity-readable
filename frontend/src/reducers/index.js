import { combineReducers } from 'redux'
import { CategoriesReducer } from './CategoriesReducer';
import { PostsReducer } from './PostsReducer';

export default combineReducers({
  CategoriesReducer,
  PostsReducer
})