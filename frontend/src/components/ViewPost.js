import React, { Component } from 'react';
import Loading from 'react-loading'
import { Form, Button, FormGroup, Label, Input, Row, Col, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { fetchPost } from '../reducers/getPosts'
import FaEdit from 'react-icons/lib/fa/edit'
import FaPlus from 'react-icons/lib/fa/plus'

class EditPost extends Component {
  componentDidMount() {
		const {
			dispatchGetPostById
		} = this.props

		dispatchGetPostById(this.props.postId)
	}
  
render() {
  	const { post } = this.props
	const comments = [{id:123, title:'title of comment', body:'content of the comment'}]
	return (post)?(            
          <div>
          <h2>Details of post #{post.id}</h2>
          <hr className="my-2" />
         <Form>
      <Row>
      	<Col xs="6">
          <FormGroup>
            <Label for="title">Title</Label>
            <Input type="text" name="title" id="title" value={post.title} readOnly/>
          </FormGroup>
      	</Col>
		<Col xs="6">
      		<FormGroup>
	          <Label for="body">Body</Label>
          		<Input type="textarea" name="body" id="body" value={post.body} readOnly />
        	</FormGroup>
      	</Col>
      </Row>
            <Row>
      	<Col xs="6">
          <FormGroup>
          <Label for="author">Author</Label>
          <Input type="text" name="author" id="author" value={post.author} readOnly />
	        </FormGroup>
      	</Col>
		<Col xs="6">
      		<FormGroup>
          <Label for="category">Category</Label>
          <Input type="text" name="category" id="category" value={post.category} readOnly />
          </FormGroup>
      	</Col>
      </Row>    
            <Row>
      	<Col xs="6">
          <FormGroup>
          <Label for="voteScore">Vote Score</Label>
          <Input type="text" name="voteScore" id="voteScore" value={post.voteScore} readOnly/>          
          </FormGroup>
      </Col>
		<Col xs="6">      		
      	</Col>
      </Row>
      <Row>
		<Col>     
      <span className="right">
<Link to={`/${post.category}`}><Button color="primary">Back</Button></Link> &nbsp;
<Link to={`/${post.category}/${post.id}/edit`}><Button color="primary" ><FaEdit /> Edit</Button></Link></span>
      	</Col>
      </Row>
          <hr className="my-2" />
		</Form>  
		<br/>

{  (comments) ? 
(
		<div>
        <h2>Comments ({post.commentCount})</h2>
        <hr className="my-2" />
		<ListGroup>      
		<ListGroupItem action>
		<span className="right">
		<Link to={`/${post.category}/${post.id}/new-comment`}>
        <Button color="primary" size="sm">Add a new Comment <FaPlus/></Button>
        </Link>
        </span>
		</ListGroupItem>
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

      </div>
  ):(<div><Loading delay={200} type='spin' color='#222' className='loading' /></div>
        )
}
}


const mapStateToProps = state => {
	return {
		post: state.getPostsReducer.post
	}
}

const mapDispatchToProps = dispatch => {
	return {
		dispatchGetPostById: (postId) => {
			return fetchPost(dispatch, postId)
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPost);