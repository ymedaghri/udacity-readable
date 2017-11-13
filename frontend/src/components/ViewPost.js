import React, { Component } from 'react';
import { Badge, Form, Button, FormGroup, Label, Input, Row, Col, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { fetchPost, fetchComments } from '../reducers/PostsReducer'
import FaEdit from 'react-icons/lib/fa/edit'
import FaPlus from 'react-icons/lib/fa/plus'
import DeleteCommentButtonWithPrompt from './DeleteCommentButtonWithPrompt'
import Loading from 'react-loading'
import { upVoteComment } from '../services/PostsApi'
import { downVoteComment } from '../services/PostsApi'
import FaMinus from 'react-icons/lib/fa/minus'
import SortCommentsByVoteButton from './SortCommentsByVoteButton'
import SortCommentsByTimestampButton from './SortCommentsByTimestampButton'
import { Redirect } from 'react-router';

class ViewPost extends Component {
    componentDidMount() {
        const {dispatchGetPostById, dispatchGetCommentsByPost} = this.props
        dispatchGetPostById(this.props.postId)
        dispatchGetCommentsByPost(this.props.postId)
    }

    render() {
        const {sortCommentsByVote, sortCommentsByTimestamp, sortCommentsByVoteDirection, sortCommentsByTimestampDirection, post, comments} = this.props
        const eventuallySortedComments = (sortCommentsByVote === true) ? sortByVote(comments, sortCommentsByVoteDirection) : (sortCommentsByTimestamp === true) ? sortByTimestamp(comments, sortCommentsByTimestampDirection) : comments

        const categoryReferer = (this.props.categoryReferer) ? this.props.categoryReferer : ''

        if (post && post.error) {
            return <Redirect to={'/404.html'} />
        }

        return (post) ? (
            <div>
              <h2>Details of post #{post.id}</h2>
              <hr className="my-2" />
              <ListGroup>
                <ListGroupItem>
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
                      <Col xs="6"></Col>
                    </Row>
                    <Row>
                      <Col>
                        <span className="right">
                          <Link to={`/${categoryReferer}`}><Button color="primary">Back</Button></Link>  
                          <Link to={`/${post.category}/${post.id}/edit`}><Button color="primary" ><FaEdit /> Edit</Button></Link></span>
                      </Col>
                    </Row>
                  </Form>
                </ListGroupItem>
              </ListGroup>
              <br/>

              {
            (comments) ?
                (
                <div>
                    <h2>Comments ({post.commentCount})</h2>
                    <hr className="my-2" />
                    <ListGroup>
                      <ListGroupItem action>
                          <SortCommentsByVoteButton/> <SortCommentsByTimestampButton/>
                            <span className="right">
                              <Link to={`/${post.category}/${post.id}/new-comment`}>
                                <Button color="primary" size="sm">Add a new Comment <FaPlus/></Button>
                              </Link>
                            </span>
                    </ListGroupItem>
                      {
                eventuallySortedComments.map((comment) => (
                    <ListGroupItem key={comment.id}>
                              <ListGroupItemHeading>
                                <Badge pill>vote score : {comment.voteScore}</Badge>
                                <Badge pill>
                                  <a href="#" className="white">
                                    <FaPlus onClick={() => upVoteClick(comment, this)}/>
                                  </a>
                                </Badge>
                                <Badge pill>
                                  <a href="#" className="white">
                                    <FaMinus onClick={() => downVoteClick(comment, this)}/>
                                  </a>
                                </Badge>
                                <br/>{comment.title}
                              </ListGroupItemHeading>
                              <ListGroupItemText>{comment.body}<br/>Author : {comment.author}
                                <div className="right">
                                  <Link to={`/${post.category}/${post.id}/${comment.id}/edit`} >
                                    <Button color="primary" size="sm"><FaEdit /> Edit</Button>
                                  </Link>
                                  &nbsp;
                                  <DeleteCommentButtonWithPrompt comment={comment} post={post} dispatchGetCommentsByPost={() => this.props.dispatchGetCommentsByPost(post.id)}/>
                                </div>
                              </ListGroupItemText>
                           </ListGroupItem>
                ))
                }
                    </ListGroup>
                  </div>
                )
                :
                (
                <Loading delay={0} type='spin' color='#222' className='loading' />
                )
            }

            </div>
            )
            :
            (
            <div><Loading delay={200} type='spin' color='#222' className='loading' /></div>
            )
    }
}


function sortByVote(comments, direction) {
    return comments.slice().sort((p1, p2) => (direction==='asc')?(p1.voteScore - p2.voteScore):(p2.voteScore - p1.voteScore));
}

function sortByTimestamp(comments, direction) {
    return comments.slice().sort((p1, p2) => (direction==='asc')?(p1.timestamp - p2.timestamp):(p2.timestamp - p1.timestamp));
}

function upVoteClick(comment, stateContext) {
    upVoteComment(comment.id).then((updatedComment) => {
        comment.voteScore = updatedComment.voteScore
        stateContext.setState(comment)
    })
}

function downVoteClick(comment, stateContext) {
    downVoteComment(comment.id).then((updatedComment) => {
        comment.voteScore = updatedComment.voteScore
        stateContext.setState(comment)
    })
}

const mapStateToProps = state => {
    return {
        sortCommentsByTimestamp: state.PostsReducer.sortCommentsByTimestamp,
        sortCommentsByVote: state.PostsReducer.sortCommentsByVote,
        sortCommentsByVoteDirection: state.PostsReducer.sortCommentsByVoteDirection,
        sortCommentsByTimestampDirection: state.PostsReducer.sortCommentsByTimestampDirection,
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

export default connect(mapStateToProps, mapDispatchToProps)(ViewPost);