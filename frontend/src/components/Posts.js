import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Badge, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap'
import { fetchPosts, sortPostsByVoteAction, sortPostsByTimestampAction } from '../reducers/PostsReducer'
import { connect } from 'react-redux';
import { upVote } from '../services/PostsApi'
import { downVote } from '../services/PostsApi'
import FaPlus from 'react-icons/lib/fa/plus'
import FaEdit from 'react-icons/lib/fa/edit'
import FaView from 'react-icons/lib/fa/eye'
import FaMinus from 'react-icons/lib/fa/minus'
import DeletePostButtonWithPrompt from './DeletePostButtonWithPrompt'
import Loading from 'react-loading'

class Posts extends Component {

  componentDidMount() {
		const {
			dispatchGetPosts
		} = this.props;

		dispatchGetPosts(this.props.categoryName);
	}

render() {
  	const {sortPostsByVote, sortPostsByTimestamp} = this.props
    const posts = (sortPostsByVote===true)?sortByVote(this.props.posts):(sortPostsByTimestamp===true)?sortByTimestamp(this.props.posts):this.props.posts

    return (<div>
            <h2>Posts</h2>
			<hr className="my-2" />
            <ListGroup>
		<ListGroupItem action>
			<Button color={(sortPostsByVote===true)?'warning':'primary'} size="sm" onClick={this.props.dispatchSortPostsByVote}>Sort By Vote</Button>&nbsp;<Button color={(sortPostsByTimestamp===true)?'warning':'primary'} size="sm" onClick={this.props.dispatchSortPostsByTimestamp}>Sort By Timestamp</Button>
<span className="right">
<Link to={`/${this.props.categoryName}/${Date.now()}/new-post`}>
<Button color="success" size="sm">Add a new Post <FaPlus/></Button>
</Link>
</span>
		</ListGroupItem>

	{
      (posts)?(posts.filter((post)=>post.deleted===false).map((post) => (
           <ListGroupItem key={post.id}>
              <ListGroupItemHeading>
			  	<Badge pill>vote score : {post.voteScore}</Badge> <Badge pill><a href="#" className="white"><FaPlus onClick={()=>upVote(post.id).then((updatedPost)=>{post.voteScore=updatedPost.voteScore; this.setState(post)})}/></a></Badge> <Badge pill><a href="#" className="white"><FaMinus onClick={()=>downVote(post.id).then((updatedPost)=>{post.voteScore=updatedPost.voteScore; this.setState(post)})}/></a></Badge>
				<span className="right"><Badge pill>Comments : {post.commentCount}</Badge></span>
				<br/><br/>
				{post.title}
              </ListGroupItemHeading>
              <ListGroupItemText>{post.body} ({post.category})
				<br/>Author : {post.author}
				<div className="right">
                &nbsp;
                <Link to={`/${post.category}/${post.id}/edit`} >
                	<Button color="primary" size="sm"><FaEdit /> Edit</Button>
                </Link>
                &nbsp;
                <Link key={post.id} to={`/${post.category}/${post.id}/view`} >
                	<Button color="primary" size="sm"><FaView /> View</Button>
                </Link>&nbsp;
                <DeletePostButtonWithPrompt post={post} category={post.category} categoryName={this.props.categoryName} dispatchGetPosts={()=>this.props.dispatchGetPosts(this.props.categoryName)}/>
				</div>
			</ListGroupItemText>
           </ListGroupItem>
		))):(<Loading delay={0} type='spin' color='#222' className='loading' />)
        }
      </ListGroup>
		</div>)
}
}
const mapStateToProps = state => {
	return {
		sortPostsByVote:state.PostsReducer.sortPostsByVote,
		sortPostsByTimestamp:state.PostsReducer.sortPostsByTimestamp,
		posts: state.PostsReducer.posts
	}
}

const mapDispatchToProps = dispatch => {
	return {
		dispatchGetPosts: (category) => {
			fetchPosts(dispatch, category)
		},
		dispatchSortPostsByVote: () => {
			dispatch(sortPostsByVoteAction())
		},
		dispatchSortPostsByTimestamp: () => {
			dispatch(sortPostsByTimestampAction())
		}

	}
}

function sortByVote(posts){
	return posts.slice().sort((p1,p2) => p1.voteScore - p2.voteScore);
}
function sortByTimestamp(posts){
	return posts.slice().sort((p1,p2) => p2.timestamp - p1.timestamp
                     );
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);