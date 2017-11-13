import React, { Component } from 'react';
import Loading from 'react-loading'
import { Form, Button, FormGroup, Label, Input } from 'reactstrap'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { fetchPost, fetchPosts } from '../reducers/PostsReducer'
import { updatePost } from '../services/PostsApi'
import { Redirect } from 'react-router';

class EditPost extends Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }

    componentDidMount() {
        const {dispatchGetPostById} = this.props

        dispatchGetPostById(this.props.postId).then(action=>this.setState({ post: action.post }))
    }


    onChange = (event) => {
        const state = this.state
        state.post[event.target.name] = event.target.value;
        this.setState(state);
    }

    onSubmit = (event) => {
        event.preventDefault()
        // get our form data out of state
        const {post} = this.state;
        updatePost(post, this.props.post.id).then((post) => {
            this.props.dispatchFetchPosts(post.category)
            this.setState({
                redirect: true
            })
        })
    }

    render() {

        const categoryReferer = (this.props.categoryReferer) ? this.props.categoryReferer : ''
        const {categories} = this.props
        const {post} = this.state

        if (post && post.error) {
            return <Redirect to={'/404.html'} />
        }

        if (this.state.redirect) {
            return <Redirect to={`/${categoryReferer}`} />
        }



        return (post && categories) ? (
            <div>
          <h2>Details of post #{post.id}</h2>
          <hr className="my-2" />
         <Form onSubmit={this.onSubmit}>
        <FormGroup>
          <Label for="title">Title</Label>
          <Input type="text" name="title" id="title" value={post.title} onChange={this.onChange}/>
        </FormGroup>
        <FormGroup>
          <Label for="body">Body</Label>
          <Input type="textarea" name="body" id="body" value={post.body} onChange={this.onChange} />
        </FormGroup>
        <FormGroup>
          <Label for="author">Author</Label>
          <Input type="text" name="author" id="author" value={post.author} onChange={this.onChange}/>
        </FormGroup>
          <FormGroup>
          <Label for="category">Category</Label>
          <Input type="select" name="category" id="category" value={post.category} onChange={this.onChange}>
          {
            categories.map(category => (
                <option key={category.name}>{category.name}</option>
            ))
            }
          </Input>
          </FormGroup>
      <FormGroup>
          <Label for="voteScore">Vote Score</Label>
          <Input type="select" name="voteScore" id="voteScore" value={post.voteScore} onChange={this.onChange}>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
          <option>6</option>
          </Input>
          </FormGroup>
          <span className="right">
          <Link to={`/${categoryReferer}`}>
          <Button color="primary">Back</Button>
          </Link> 
          <Button color="primary">Save</Button></span>
          </Form>
      </div>
            ) : (<div><Loading delay={200} type='spin' color='#222' className='loading' /></div>
            )
    }
}


const mapStateToProps = state => {
    return {
        post: state.PostsReducer.post,
        categoryReferer: state.PostsReducer.categoryReferer
    }
}

const mapDispatchToProps = dispatch => {
    return {
        dispatchGetPostById: (postId) => fetchPost(dispatch, postId),
        dispatchFetchPosts: (category) => fetchPosts(dispatch, category)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPost);