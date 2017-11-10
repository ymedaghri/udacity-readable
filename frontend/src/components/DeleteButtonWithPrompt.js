import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import FaDelete from 'react-icons/lib/fa/trash'
import { deletePost } from '../services/PostsApi'
import { Redirect } from 'react-router';

class DeleteButtonWithPrompt extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
  }
  
  askForDeletion(postIdToDelete) {
    this.setState({
      modal: !this.state.modal,
      postIdToDelete: postIdToDelete
    });
  }
  
  onDelete = () => {
        deletePost(this.state.postIdToDelete)
        	.then((result)=>
				{
                  this.setState({
                    modal: !this.state.modal,
                    redirectAfterDeletion: true
                  });
          			this.props.dispatchGetPosts()
        		}
        )
  }

render() {
  const { post } = this.props
  const categoryName=(this.props.categoryName)?this.props.categoryName:''
	if(this.state.redirectAfterDeletion===true)
	{
		return <Redirect to={`/${categoryName}`}/>
	}

    return (
      <span>
      <Modal isOpen={this.state.modal} toggle={()=>this.askForDeletion()} className={this.props.className}>
            <ModalHeader>Confirm Deletion</ModalHeader>
            <ModalBody>
              Do your confirm the deletion of this post ? 
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={()=>this.onDelete()}>Yes</Button>{' '}
              <Button color="secondary" onClick={()=>this.askForDeletion()}>No</Button>
            </ModalFooter>
          </Modal>  
                <Button color="danger" onClick={()=>this.askForDeletion(post.id)} size="sm"><FaDelete /> Delete</Button>
</span>
  )
}
}

export default DeleteButtonWithPrompt