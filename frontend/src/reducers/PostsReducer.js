import * as PostsApi from '../services/PostsApi'
import * as CommentsApi from '../services/CommentsApi'
import * as PostsActions from './PostsActions'

import { LOAD_POSTS, SORT_POSTS_BY_VOTE, SORT_POSTS_BY_TIMESTAMP,SORT_COMMENTS_BY_VOTE, SORT_COMMENTS_BY_TIMESTAMP, LOAD_POST_BY_ID, LOAD_COMMENT_BY_ID, STORE_CATEGORY_REFERER, LOAD_COMMENTS_BY_POSTS_ID } from './actionTypes'


export const PostsReducer = (state = {
        sortPostsByVote: false,
        sortPostsByTimestamp: false,
        sortPostsByVoteDirection:'desc',
        sortPostsByTimestampDirection:'desc',
        sortCommentsByVote: false,
        sortCommentsByTimestamp: false,
        sortCommentsByVoteDirection:'desc',
        sortCommentsByTimestampDirection:'desc'
    }, action) => {
    const {posts, post, categoryReferer, comments, comment} = action
    switch (action.type) {
    case LOAD_POSTS:
        return {
            ...state,
            posts
        }
    case SORT_POSTS_BY_VOTE:
        return {
            ...state,
            sortPostsByVote: state.sortPostsByVoteDirection==='desc',
            sortPostsByVoteDirection: (state.sortPostsByVote===true)?(state.sortPostsByVoteDirection==='desc')?'asc':'desc':state.sortPostsByVoteDirection,
            sortPostsByTimestampDirection: 'desc',
            sortPostsByTimestamp: false
        }
    case SORT_POSTS_BY_TIMESTAMP:
        return {
            ...state,
            sortPostsByTimestamp: state.sortPostsByTimestampDirection==='desc',
            sortPostsByTimestampDirection: (state.sortPostsByTimestamp===true)?(state.sortPostsByTimestampDirection==='desc')?'asc':'desc':state.sortPostsByTimestampDirection,
            sortPostsByVoteDirection: 'desc',
            sortPostsByVote: false
        }
    case SORT_COMMENTS_BY_VOTE:
        return {
            ...state,
            sortCommentsByVote: state.sortCommentsByVoteDirection==='desc',
            sortCommentsByVoteDirection: (state.sortCommentsByVote===true)?(state.sortCommentsByVoteDirection==='desc')?'asc':'desc':state.sortCommentsByVoteDirection,
            sortCommentsByTimestampDirection: 'desc',
            sortCommentsByTimestamp: false
        }
    case SORT_COMMENTS_BY_TIMESTAMP:
        return {
            ...state,
            sortCommentsByTimestamp: state.sortCommentsByTimestampDirection==='desc',
            sortCommentsByTimestampDirection: (state.sortCommentsByTimestamp===true)?(state.sortCommentsByTimestampDirection==='desc')?'asc':'desc':state.sortCommentsByTimestampDirection,
            sortCommentsByVoteDirection: 'desc',
            sortCommentsByVote: false
        }
    case LOAD_POST_BY_ID:
        return {
            ...state,
            post
        }
    case LOAD_COMMENT_BY_ID:
        return {
            ...state,
            comment
        }
    case STORE_CATEGORY_REFERER:
        return {
            ...state,
            categoryReferer
        }
    case LOAD_COMMENTS_BY_POSTS_ID:
        return {
            ...state,
            comments
        }
    default:
        return state
    }
}


export const fetchPosts = (dispatch, category) => ((category) ? PostsApi.getPostsByCategory(category) : PostsApi.getAllPosts())
    .then(posts => dispatch(PostsActions.loadPostsAction(posts)))

export const fetchPost = (dispatch, postId) => PostsApi.getPostById(postId)
    .then(post => dispatch(PostsActions.loadPostByIdAction(post)))

export const fetchComments = (dispatch, postId) => CommentsApi.getComments(postId)
    .then(comments => dispatch(PostsActions.getCommentsAction(comments)))

export const fetchComment = (dispatch, commentId) => PostsApi.getCommentById(commentId)
    .then(comment => dispatch(PostsActions.loadCommentByIdAction(comment)))