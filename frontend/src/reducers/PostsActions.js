import { LOAD_POSTS, SORT_POSTS_BY_VOTE, SORT_POSTS_BY_TIMESTAMP, SORT_COMMENTS_BY_VOTE, SORT_COMMENTS_BY_TIMESTAMP, LOAD_POST_BY_ID, LOAD_COMMENT_BY_ID, STORE_CATEGORY_REFERER, LOAD_COMMENTS_BY_POSTS_ID } from './actionTypes'

export const loadPostsAction = (posts) => {
  return {
    type: LOAD_POSTS,
    posts
  }
}

export const getCommentsAction = (comments) => {
  return {
    type: LOAD_COMMENTS_BY_POSTS_ID,
    comments
  }
}

export const storeCategoryRefererAction = (categoryReferer) => {
  return {
    type: STORE_CATEGORY_REFERER,
    categoryReferer
  }
}

export const loadPostByIdAction = (post) => {

  return {
    type: LOAD_POST_BY_ID,
    post:(Object.keys(post).length === 0)?{error:'not found'}:post
  }
}

export const loadCommentByIdAction = (comment) => {
  return {
    type: LOAD_COMMENT_BY_ID,
    comment
  }
}


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

export const sortCommentsByVoteAction = () => {
    return {
        type: SORT_COMMENTS_BY_VOTE
    }
}

export const sortCommentsByTimestampAction = () => {
    return {
        type: SORT_COMMENTS_BY_TIMESTAMP
    }
}