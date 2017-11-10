import * as PostsApi from '../services/PostsApi'
import { LOAD_POSTS, SORT_POSTS_BY_VOTE, SORT_POSTS_BY_TIMESTAMP, LOAD_POSTS_BY_ID } from '../actions'

/* TODO : sortByVote */

export const getPostsReducer = (state={sortPostsByVote:false, sortPostsByTimestamp:false}, action) => {  
	const { posts, post } = action
  switch (action.type) {
    case LOAD_POSTS :
      return {...state,posts}
    case SORT_POSTS_BY_VOTE :
      return {...state,sortPostsByVote:!state.sortPostsByVote,sortPostsByTimestamp:false}
    case SORT_POSTS_BY_TIMESTAMP:
      return {...state,sortPostsByTimestamp:!state.sortPostsByTimestamp,sortPostsByVote:false}
    case LOAD_POSTS_BY_ID:
      return {...state,post} 
    default :
      return state
  }
}

export const getPostsAction = (posts) => {
  return {
    type: LOAD_POSTS,
    posts
  }
}

export const loadPostByIdAction = (post) => {
  return {
    type: LOAD_POSTS_BY_ID,
    post
  }
}

export const fetchPosts = (dispatch, category) => ((category)?PostsApi.getPostsByCategory(category):PostsApi.getAllPosts())
      .then(posts => dispatch(getPostsAction(posts)))

export const fetchPost = (dispatch, postId) => PostsApi.getPostById(postId)
    					.then( post => dispatch(loadPostByIdAction(post)) )
      

export const sortPostsByVoteAction = () => {
  return {
    type: SORT_POSTS_BY_VOTE
  }
}

export const sortPostsByTimestampAction = () => {
  return {
    type: SORT_POSTS_BY_TIMESTAMP
  }
}