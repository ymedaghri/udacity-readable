import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { ListGroup, Button, Badge, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap'
import { upVote } from '../services/PostsApi'
import { downVote } from '../services/PostsApi'
import FaPlus from 'react-icons/lib/fa/plus'
import FaEdit from 'react-icons/lib/fa/edit'
import FaView from 'react-icons/lib/fa/eye'
import FaMinus from 'react-icons/lib/fa/minus'
import DeletePostButtonWithPrompt from './DeletePostButtonWithPrompt'
import { connect } from 'react-redux';
import Loading from 'react-loading'
import SortPostsByVoteButton from './SortPostsByVoteButton'
import SortPostsByTimestampButton from './SortPostsByTimestampButton'
import AddNewPostButton from './AddNewPostButton'
import { fetchPosts } from '../reducers/PostsReducer'

class PostsTable extends Component {

    render() {

        const {sortPostsByVote, sortPostsByTimestamp, sortPostsByVoteDirection, sortPostsByTimestampDirection, posts} = this.props
        const eventuallySortedPosts = (sortPostsByVote === true) ? sortByVote(posts, sortPostsByVoteDirection) : (sortPostsByTimestamp === true) ? sortByTimestamp(posts, sortPostsByTimestampDirection) : posts

        return (posts) ? (
            <ListGroup>
				        		<ListGroupItem action>
				        			<SortPostsByVoteButton/> <SortPostsByTimestampButton/>
				        				<span className="right">
				        					<AddNewPostButton/>
				        				</span>
								</ListGroupItem>

        					{
            eventuallySortedPosts
                .filter((post) => post.deleted === false)
                .map((post) => (
                    <ListGroupItem key={post.id}>
										<ListGroupItemHeading>
											<Badge pill>vote score : {post.voteScore}</Badge>
											<Badge pill>
												<a href="#" className="white">
													<FaPlus onClick={() => upVoteClick(post, this)}/>
												</a>
											</Badge>
											<Badge pill>
												<a href="#" className="white">
													<FaMinus onClick={() => downVoteClick(post, this)}/>
												</a>
											</Badge>
											<span className="right">
												<Badge pill>Comments : {post.commentCount}</Badge>
											</span>
											<br/>
											<br/>
											{post.title}
              							</ListGroupItemHeading>
              							<ListGroupItemText>
	              							{post.body} ({post.category})
	              							<br/>
	              							Author : {post.author}
	              							<div className="right">
	              								<Link to={`/${post.category}/${post.id}/edit`} >
	              									<Button color="primary" size="sm"><FaEdit /> Edit</Button>
	              								</Link>
	              								 
	              								<Link key={post.id} to={`/${post.category}/${post.id}/view`} >
	              									<Button color="primary" size="sm"><FaView /> View</Button>
	              								</Link> 
	              								<DeletePostButtonWithPrompt post={post} category={post.category} categoryName={this.props.categoryName} dispatchGetPosts={() => this.props.dispatchGetPosts(this.props.categoryName)}/>
	              							</div>
										</ListGroupItemText>
           							</ListGroupItem>
                ))
            }
							</ListGroup>
            ) : (<Loading delay={0} type='spin' color='#222' className='loading' />)
    }
}

function upVoteClick(post, stateContext) {
    upVote(post.id).then((updatedPost) => {
        post.voteScore = updatedPost.voteScore
        stateContext.setState(post)
    })
}

function downVoteClick(post, stateContext) {
    downVote(post.id).then((updatedPost) => {
        post.voteScore = updatedPost.voteScore
        stateContext.setState(post)
    })
}

function sortByVote(posts, direction) {
    return posts.slice().sort((p1, p2) => (direction==='asc')?(p1.voteScore - p2.voteScore):(p2.voteScore - p1.voteScore));
}

function sortByTimestamp(posts, direction) {
    return posts.slice().sort((p1, p2) => (direction==='asc')?(p1.timestamp - p2.timestamp):(p2.timestamp - p1.timestamp));
}

const mapStateToProps = state => {
    return {
        sortPostsByTimestamp: state.PostsReducer.sortPostsByTimestamp,
        sortPostsByVote: state.PostsReducer.sortPostsByVote,
        sortPostsByVoteDirection: state.PostsReducer.sortPostsByVoteDirection,
        sortPostsByTimestampDirection: state.PostsReducer.sortPostsByTimestampDirection,
        posts: state.PostsReducer.posts
    }
}


const mapDispatchToProps = dispatch => {
    return {
        dispatchGetPosts: (category) => {
            fetchPosts(dispatch, category)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsTable);