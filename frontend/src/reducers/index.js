import { combineReducers } from 'redux'
import { getCategoriesReducer } from './CategoriesReducer';
import { getPostsReducer } from './getPosts';

export default combineReducers({
  getCategoriesReducer,
  getPostsReducer
})