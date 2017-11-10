import React, { Component } from 'react'
import { Jumbotron, Container } from 'reactstrap'
import { connect } from 'react-redux'
import { fetchCategories } from '../reducers/CategoriesReducer'
import { Switch, Route } from 'react-router-dom'
import CategoryBanner from './CategoryBanner'
import Posts from './Posts'
import EditPost from './EditPost'
import ViewPost from './ViewPost'
import NewComment from './NewComment'
//import Loading from 'react-loading'

class Main extends Component {
  componentDidMount() {
		const {
			dispatchGetCategories
		} = this.props;

		dispatchGetCategories()
	}
  render()
  {
    const {
			categories
		} = this.props;    
    return (
      		<Container>
            <Jumbotron>
            <Switch>
			    <Route exact path="/" render={(props)=>(<div>
                                                        <CategoryBanner categories={categories} />
                                                        <br/>
                                                        <Posts />
                                                        </div>)} />
            	<Route exact path="/:categoryName" render={(props)=>(<div>
                                                                     <CategoryBanner categories={categories} categoryName={props.match.params.categoryName} />
                                                                     <br/>
                                                                     <Posts categoryName={props.match.params.categoryName}/>
                                                                     </div> )} />
			      <Route exact path="/:categoryName/:postId/edit" render={(props)=>(<div>
                                                                                    <CategoryBanner categories={categories} categoryName={props.match.params.categoryName} />
                                                                                    <br/>
                                                                                    <EditPost postId={props.match.params.postId} categories={categories} />
                                                                                    </div> )} />
			      <Route exact path="/:categoryName/:postId/view" render={(props)=>(
      				<div>
      					<CategoryBanner categories={categories} categoryName={props.match.params.categoryName} />
      					<br/>
      					<ViewPost postId={props.match.params.postId} categories={categories} />
      				</div> )} />
      				<Route exact path="/:categoryName/:postId/new-comment" render={(props)=>(
      				<div>
      					<NewComment />
      				</div> )} />

			</Switch> 
            </Jumbotron>
			</Container>
           )
  }
}


const mapStateToProps = state => {
	return {
		categories: state.getCategoriesReducer.categories
	}
}

const mapDispatchToProps = dispatch => {
	return {
		dispatchGetCategories: () => {
			fetchCategories(dispatch)
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
