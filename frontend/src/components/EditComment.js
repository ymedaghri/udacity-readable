import React, { Component } from 'react';
import FaArrowLeft from 'react-icons/lib/fa/arrow-left'
import { Link } from 'react-router-dom'
import { Form, Button, FormGroup, Label, Input } from 'reactstrap'
import { Redirect } from 'react-router';
import { fetchPost, fetchComments, fetchComment } from '../reducers/PostsReducer'
import { connect } from 'react-redux';
import Loading from 'react-loading'
import { updateComment } from '../services/CommentsApi'

class EditComment extends Component {
      constructor(props) {
    super(props);

    this.state = {
    }
  }

    componentDidMount() {
        const {
            dispatchGetCommentById
        } = this.props

        dispatchGetCommentById(this.props.commentId).then(action=>this.setState({ comment: action.comment }))
    }

    onChange = (event) => {
        const state = this.state
        state.comment[event.target.name] = event.target.value;
        this.setState(state);
    }

    onSubmit = (event) => {
        event.preventDefault()
        // get our form data out of state
        const { comment } = this.state;
        updateComment(comment, this.props.comment.id).then((comment)=>{
            this.props.dispatchGetPostById(this.props.postId)
            this.props.dispatchGetCommentsByPost(this.props.postId)
          this.setState({redirect:true})
        })
      }

    render() {

        if (this.state.redirect) {
            return <Redirect to={`/${this.props.post.category}/${this.props.post.id}/view`}/>
        }

        const { post} = this.props
        const {comment} = this.state

        if (!post) {
            return <Redirect to='/'/>;
        }

        return (comment) ? (
            <div>
                <h2>Details of comment #{comment.id}</h2>
                <hr className="my-2" />
                <Form onSubmit={this.onSubmit}>
                    <FormGroup>
                        <Label for="body">Body</Label>
                        <Input type="textarea" name="body" id="body" value={comment.body} onChange={this.onChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="author">Author</Label>
                        <Input type="text" name="author" id="author" value={comment.author} onChange={this.onChange}/>
                    </FormGroup>
                    <span className="right">
                        <Link to={`/${post.category}/${post.id}/view`}><Button color="primary"><FaArrowLeft /> Back</Button></Link>
                        <Button color="primary">Save</Button></span>
                    </Form>
            </div>
        )
        :
        (
            <div><Loading delay={200} type='spin' color='#222' className='loading' /></div>
        )
    }
}

const mapStateToProps = state => {
    return {
        post: state.PostsReducer.post,
        comment: state.PostsReducer.comment
    }
}

const mapDispatchToProps = dispatch => {
    return {
        dispatchGetPostById: (postId) => {
            fetchPost(dispatch, postId)
        },
        dispatchGetCommentById: (commentId) => {
            return fetchComment(dispatch, commentId)
        },
        dispatchGetCommentsByPost: (postId) => {
            return fetchComments(dispatch, postId)
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(EditComment);