import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, FormGroup, Label, Input } from 'reactstrap'
import { newPost } from '../services/PostsApi'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'

class NewPost extends Component {
    constructor(props) {
        super(props)

        this.state = {
            post: {
                title: '',
                body: '',
                author: '',
                category: 'react',
                voteScore: 1
            }
        }
    }


    onChange = (event) => {
        const state = this.state
        state.post[event.target.name] = event.target.value
        this.setState(state)
    }

    onSubmit = (event) => {
        event.preventDefault()
        // get our form data out of state
        const {post} = this.state

        post['timestamp'] = Date.now()
        post['id'] = Date.now()
        newPost(post).then((post) => this.setState({
            redirect: true
        }))
    }

    render() {

        const categoryReferer = (this.props.categoryReferer) ? this.props.categoryReferer : ''

        if (this.state.redirect) {
            return <Redirect to={`/${categoryReferer}`} />
        }

        const {categories} = this.props
        const {title, body, author, category, voteScore} = this.state.post

        return (
            <div >
          <h2>New post</h2>
          <hr className="my-2" />
          <Form onSubmit={this.onSubmit}>
        <FormGroup>
          <Label for="title">Title</Label>
          <Input type="text" name="title" id="title" value={title} onChange={this.onChange}/>
        </FormGroup>
        <FormGroup>
          <Label for="body">Body</Label>
          <Input type="textarea" name="body" id="body" value={body} onChange={this.onChange} />
        </FormGroup>
        <FormGroup>
          <Label for="author">Author</Label>
          <Input type="text" name="author" id="author" value={author} onChange={this.onChange}/>
        </FormGroup>
          <FormGroup>
          <Label for="category">Category</Label>
          <Input type="select" name="category" id="category" value={category} onChange={this.onChange}>
          {
            categories.map(category => (
                <option key={category.name}>{category.name}</option>
            ))
            }
          </Input>
          </FormGroup>
<FormGroup>
          <Label for="voteScore">Vote Score</Label>
          <Input type="select" name="voteScore" id="voteScore" value={voteScore} onChange={this.onChange}>
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
        )
    }
}

const mapStateToProps = state => {
    return {
        categoryReferer: state.PostsReducer.categoryReferer
    }
}

export default connect(mapStateToProps)(NewPost)