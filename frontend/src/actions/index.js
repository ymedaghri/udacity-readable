export const LOAD_CATEGORIES = 'LOAD_CATEGORIES'
export const LOAD_POSTS = 'LOAD_POSTS'
export const RESET_POSTS = 'RESET_POSTS'
export const LOAD_POSTS_BY_ID = 'LOAD_POSTS_BY_ID'
export const LOAD_COMMENTS_BY_POSTS_ID = 'LOAD_COMMENTS_BY_POSTS_ID'
export const SORT_POSTS_BY_VOTE = 'SORT_POSTS_BY_VOTE'
export const SORT_POSTS_BY_TIMESTAMP = 'SORT_POSTS_BY_TIMESTAMP'

export function loadCategories (categories) {
  return {
    type: LOAD_CATEGORIES,
    categories
  }
}

export function loadPosts (posts) {
  return {
    type: LOAD_POSTS,
    posts,
    postsLoaded:true
  }
}

export function loadPostById (post) {
  return {
    type: LOAD_POSTS_BY_ID,
    post
  }
}

export function loadCommentsByPostId (comments) {
  return {
    type: LOAD_COMMENTS_BY_POSTS_ID,
    comments
  }
}



export function resetPosts (posts) {
  return {
    type: RESET_POSTS,
    posts
  }
}