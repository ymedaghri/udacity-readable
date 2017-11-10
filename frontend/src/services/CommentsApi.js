import * as Backend from './Backend'

export const getComments = (postId) =>
	fetch(`${Backend.url}/posts/${postId}/comments`, Backend.tokens)
      .then(res => res.json())
      .then(data=>data)

export const newComment = (comment) => 
  {
    
  return fetch(`${Backend.url}/comments`, {
    method: 'POST',
    headers:{
      ...Backend.tokens.headers,
    	'Content-Type': 'application/json'
    }, 
    credentials:'include',
    body: JSON.stringify( comment )
  }).then(res => res.json())
  
}