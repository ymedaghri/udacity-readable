import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import FaDelete from 'react-icons/lib/fa/trash'
import { deleteComment } from '../services/CommentsApi'
import { Redirect } from 'react-router';

class DeleteCommentButtonWithPrompt extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
  }

  askForDeletion(commentIdToDelete) {
    this.setState({
      modal: !this.state.modal,
      commentIdToDelete: commentIdToDelete
    });
  }

  onDelete = () => {
        deleteComment(this.state.commentIdToDelete)
        	.then((result)=>
				{
                  this.setState({
                    modal: !this.state.modal,
                    redirectAfterDeletion: true
                  });
          			this.props.dispatchGetCommentsByPost()
        		}
        )
  }

render() {
  const { comment, post } = this.props
	if(this.state.redirectAfterDeletion===true)
	{
		return <Redirect to={`/${post.category}/${post.id}/view`}/>
	}

    return (
      <span>
      <Modal isOpen={this.state.modal} toggle={()=>this.askForDeletion()} className={this.props.className}>
            <ModalHeader>Confirm Deletion</ModalHeader>
            <ModalBody>
              Do your confirm the deletion of this comment ?
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={()=>this.onDelete()}>Yes</Button>{' '}
              <Button color="secondary" onClick={()=>this.askForDeletion()}>No</Button>
            </ModalFooter>
          </Modal>
                <Button color="danger" onClick={()=>this.askForDeletion(comment.id)} size="sm"><FaDelete /> Delete</Button>
</span>
  )
}
}

export default DeleteCommentButtonWithPrompt