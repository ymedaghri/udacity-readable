import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import Header from './components/Header'
import Main from './components/Main'
/*
import * as CategoriesApi from './services/CategoriesApi'
import * as PostsApi from './services/PostsApi'
import * as CommentsApi from './services/CommentsApi'

import ListCategories from './components/ListCategories'
import ViewCategory from './components/ViewCategory'
import NewPost from './components/NewPost'
import NewComment from './components/NewComment'
import ViewPost from './components/ViewPost'
import EditPost from './components/EditPost'


import { loadCategories, loadPosts, resetPosts, loadPostById, loadCommentsByPostId } from './actions'
*/
import './App.css';

//import { Container, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

class App extends Component {
  /*
  
  
  componentDidMount() {
    this.props.loadCategories();    
  }
*/
  
  render() {
    return (
      <div>
      	<div className="main-wrapper">  
      		<Header/>
      	</div>
			<Switch>
				<Route path="/" component={Main} />
			</Switch>      	
	  </div>
    )
  }
}
  /*
  render() {
    const { categories, posts } = this.props
    return (
      <div>
      
      <Container>
      <Route exact path="/" render={()=>(
          <ListCategories
            categories={ categories }
            posts={ posts.posts }
		    loadPosts={ this.props.loadPosts }
		    postsLoaded = {posts.postsLoaded}
      		reset={ this.props.resetPosts }
      		sortByVote={ ()=>this.props.sortByVote(posts.posts) }
      		sortByTimestamp={ ()=>this.props.sortByTimestamp(posts.posts) }
          />
        )}/>

      <Route exact path="/:categoryName" render={(props)=>(
          <ViewCategory
            categoryName={ props.match.params.categoryName }
      		loadPosts={ this.props.loadPosts }
			posts={ posts.posts }
		    postsLoaded = {posts.postsLoaded}
      		sortByVote={ ()=> this.props.sortByVote(posts.posts) }
      		sortByTimestamp={ ()=>this.props.sortByTimestamp(posts.posts) }
          />
        )}/>  

      <Route exact path="/:categoryName/:postId/new" render={(props)=>(
          <NewPost categories={categories}/>
        )}/>  

	<Route exact path="/:categoryName/:postId" render={(props)=>(
          <ViewPost   
			categories={categories}
			reset={this.props.resetPosts}
      		loadPostById={ this.props.loadPostById }
			loadCommentsByPostId={ this.props.loadCommentsByPostId}
            postId={ props.match.params.postId }
			post = { posts.post }
			comments = { posts.comments }
            />
        )}/>

	<Route exact path="/:categoryName/:postId/edit" render={(props)=>(
          <EditPost    
			categories={categories}
      		loadPostById={ this.props.loadPostById }
			loadCommentsByPostId={ this.props.loadCommentsByPostId}
            postId={ props.match.params.postId }
			post = { posts.post }
			comments = { posts.comments }
            />
        )}/>

	<Route exact path="/:categoryName/:postId/comment/new" render={(props)=>(
          <NewComment post={ posts.post }/>
        )}/>
      </Container>
	</div>
    );
  }
}

*/

/*
function mapStateToProps ({ categories, posts }) { 
  return {
    categories,
    posts
  }
}


function mapDispatchToProps (dispatch) {
  return {                 
    loadPosts: (category) => {
      if(category)
      PostsApi.getPostsByCategory(category)
    					.then( posts => dispatch(loadPosts(sortByVote(posts))) )
      else
        PostsApi.getAllPosts()
    					.then( posts => dispatch(loadPosts(sortByVote(posts))) )
    },
   
    loadCommentsByPostId: (id) => {
      CommentsApi.getComments(id)
    					.then( comments => dispatch(loadCommentsByPostId(comments)) )
    },
    resetPosts: () => dispatch(resetPosts()),
    sortByVote: (posts)=>dispatch(loadPosts(sortByVote(posts))),
    sortByTimestamp: (posts)=>dispatch(loadPosts(sortByTimestamp(posts))),
  }
}
*/
  
export default connect()(App)
