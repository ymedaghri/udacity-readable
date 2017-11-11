import * as Backend from './Backend'

export const getPostsByCategory = (category) =>
	fetch(`${Backend.url}/${category}/posts`, Backend.tokens)
      .then(res => res.json())
      .then(data=>data)

export const getPostById = (id) =>
	fetch(`${Backend.url}/posts/${id}`, Backend.tokens)
      .then(res => res.json())
      .then(data=>data)

export const getAllPosts = () =>
	fetch(`${Backend.url}/posts`, Backend.tokens)
      .then(res => res.json())
      .then(data=>data)

export const newPost = (post) =>
  {
  	return fetch(`${Backend.url}/posts`, {
    method: 'POST',
    headers:{
      ...Backend.tokens.headers,
    	'Content-Type': 'application/json'
    },
    credentials:'include',
    body: JSON.stringify( post)
  }).then(res => res.json())

}

export const updatePost = (post, postId) =>
  {
    return fetch(`${Backend.url}/posts/${postId}`, {
    method: 'PUT',
    headers:{
      ...Backend.tokens.headers,
    	'Content-Type': 'application/json'
    },
    credentials:'include',
    body: JSON.stringify( post)
  }).then(res => res.json())
}

export const upVote = (postId) =>
  {
    console.log(postId)
  	return fetch(`${Backend.url}/posts/${postId}`, {
    method: 'POST',
    headers:{
      ...Backend.tokens.headers,
    	'Content-Type': 'application/json'
    },
    credentials:'include',
    body: JSON.stringify( {option:'upVote'} )
  }).then(res => res.json())
}

export const downVote = (postId) =>
  {
    console.log(postId)
  	return fetch(`${Backend.url}/posts/${postId}`, {
    method: 'POST',
    headers:{
      ...Backend.tokens.headers,
    	'Content-Type': 'application/json'
    },
    credentials:'include',
    body: JSON.stringify( {option:'downVote'} )
  }).then(res => res.json())
}

export const deletePost = (id) =>
  {

  return fetch(`${Backend.url}/posts/${id}`, {
    method: 'DELETE',
    headers:{
      ...Backend.tokens.headers,
    	'Content-Type': 'application/json'
    },
    credentials:'include'
  }).then(res => res)

}
