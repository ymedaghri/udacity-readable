import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Loading from 'react-loading'
import { Jumbotron, Badge, Button, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import FaArrowLeft from 'react-icons/lib/fa/arrow-left'
import { Redirect } from 'react-router';
import Moment from 'moment'
import FaPlus from 'react-icons/lib/fa/plus'
import CategoryBanner from './CategoryBanner'

class ViewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };

  }

  
  
   componentDidMount() {
    this.props.loadPostById(this.props.postId);
    this.props.loadCommentsByPostId(this.props.postId);
  }
  
  

render() {
   if(this.state.redirect) {
       return <Redirect to='/'/>;
     }
  	const { post, comments, categories, reset} = this.props

    	return (post)?(            
          <Jumbotron >      
          <CategoryBanner categories={categories} reset={reset}/> 
          <br/>
		  <span className="right"><Link to='/'><Button color="primary" ><FaArrowLeft /> Back</Button></Link></span>
          <h2>Details of post #{post.id}</h2>
          <hr className="my-2" />
         <ListGroup>
         <ListGroupItem key={post.id}>
			<ListGroupItemHeading>{post.title}<span className="right"><Badge pill>vote score : {post.voteScore}</Badge></span>   
            </ListGroupItemHeading>
			<ListGroupItemText>{post.body}</ListGroupItemText>
			<ListGroupItemText>Author : {post.author}</ListGroupItemText>
			<ListGroupItemText>Timestamp : {Moment(post.timestamp).format("lll")}
		</ListGroupItemText>
		 </ListGroupItem>
		
      </ListGroup>          
		<br/><br/>
		
{  (comments) ? 
(
		<div>
        <span className="right">
        <Link to={`/new-comment`} >
        <Button color="primary" size="sm">Add a new Comment <FaPlus/></Button>
        </Link>
        </span>
		<h2>Comments</h2>
        <hr className="my-2" />
		<ListGroup>        
	{       
      comments.map((comment) => (
           <ListGroupItem key={comment.id}>
              <ListGroupItemHeading>{comment.title}
              </ListGroupItemHeading>
              <ListGroupItemText>{comment.body}</ListGroupItemText>
           </ListGroupItem>
		))
        }
      </ListGroup>
</div>
)

: (<Loading delay={0} type='spin' color='#222' className='loading' />)
}




</Jumbotron>
  ):(<div><Loading delay={200} type='spin' color='#222' className='loading' /></div>
        )
}
}

export default ViewPost