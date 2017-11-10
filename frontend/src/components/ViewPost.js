import React, { Component } from 'react';
import Loading from 'react-loading'
import { Badge, Form, Button, FormGroup, Label, Input, Row, Col, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { fetchPost, fetchComments } from '../reducers/PostsReducer'
import FaEdit from 'react-icons/lib/fa/edit'
import FaPlus from 'react-icons/lib/fa/plus'
import DeleteCommentButtonWithPrompt from './DeleteCommentButtonWithPrompt'

class EditPost extends Component {
  componentDidMount() {
		const {
			dispatchGetPostById, dispatchGetCommentsByPost
		} = this.props

		dispatchGetPostById(this.props.postId)
    dispatchGetCommentsByPost(this.props.postId)
	}

render() {
  	const { post, comments } = this.props
    const categoryReferer = (this.props.categoryReferer)?this.props.categoryReferer:''

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
          <Link to={`/${categoryReferer}`}><Button color="primary">Back</Button></Link> &nbsp;
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
              <ListGroupItemHeading><Badge pill>vote score : {comment.voteScore}</Badge><br/>{comment.title}
              </ListGroupItemHeading>
              <ListGroupItemText>{comment.body}<br/>Author : {comment.author}
              <div className="right">
                &nbsp;
                <Link to={`/${post.category}/${post.id}/${comment.id}/edit`} >
                  <Button color="primary" size="sm"><FaEdit /> Edit</Button>
                </Link>
                &nbsp;
                <DeleteCommentButtonWithPrompt comment={comment} post={post} dispatchGetCommentsByPost={()=>this.props.dispatchGetCommentsByPost(post.id)}/>
        </div></ListGroupItemText>
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
		post: state.PostsReducer.post,
    categoryReferer: state.PostsReducer.categoryReferer,
    comments: state.PostsReducer.comments
	}
}

const mapDispatchToProps = dispatch => {
	return {
		dispatchGetPostById: (postId) => {
      return fetchPost(dispatch, postId)
    },
    dispatchGetCommentsByPost: (postId) => {
      return fetchComments(dispatch, postId)
    }
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPost);