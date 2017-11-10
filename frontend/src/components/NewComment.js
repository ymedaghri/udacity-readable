import React, { Component } from 'react';
import FaArrowLeft from 'react-icons/lib/fa/arrow-left'
import { Link } from 'react-router-dom'
import { Jumbotron, Form, Button, FormGroup, Label, Input } from 'reactstrap'
import { newComment } from '../services/CommentsApi'
import { Redirect } from 'react-router';

class NewComment extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      		comment:
            {
                body: '',
                author: ''
            }
    }
  }
   
  
  onChange = (event) => {
        const state = this.state
        state.comment[event.target.name] = event.target.value;
        this.setState(state);
      }

onSubmit = (event) => {
        event.preventDefault();
        // get our form data out of state
        const { comment } = this.state;  
  
  		comment['timestamp']=Date.now()
  		comment['id']=Date.now()
		comment['parentId']=this.props.post.id
        newComment(comment).then((comment)=>this.setState({redirect:true}))
      }

render() {
  if(this.state.redirect) {
       return <Redirect to={`/${this.props.post.category}/${this.props.post.id}`}/>
     }
  	const { post } = this.props
    const { body, author } = this.state.comment

 if(!post) {
       return <Redirect to='/'/>;
     }
    	return (
          <Jumbotron > 
			<span className="right"><Link to={`/post/${this.props.post.id}`}><Button color="primary"><FaArrowLeft /> Back</Button></Link></span>
		  <h2>New comment for post {post.title}</h2>
          <hr className="my-2" />
          <Form onSubmit={this.onSubmit}>
        <FormGroup>
          <Label for="body">Body</Label>
          <Input type="textarea" name="body" id="body" value={body} onChange={this.onChange} />
        </FormGroup>          
        <FormGroup>
          <Label for="author">Author</Label>
          <Input type="text" name="author" id="author" value={author} onChange={this.onChange}/>
        </FormGroup>
		<span className="right"><Button color="primary">Save</Button></span>
		</Form>
       </Jumbotron>
  )
}
}

export default NewComment