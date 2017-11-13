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
import NewPost from './NewPost'
import EditComment from './EditComment'
import { Redirect } from 'react-router';

const NotFound = () => (
  <div>
    <h3>404 page not found</h3>
    <p>We are sorry but the page you are looking for does not exist.</p>
  </div>)

class Main extends Component {
    componentDidMount() {
        const {dispatchGetCategories} = this.props;

        dispatchGetCategories()
    }
    render() {
        const {categories} = this.props;
        return (
            <Container>
            <Jumbotron>

            <Switch>


              <Route exact path="/404.html" component={NotFound} />

              <Route exact path="/" render={(props) => (

                <div>
                  <CategoryBanner categories={categories} />
                  <br/>
                  <Posts />
                </div> )} />

              <Route exact path="/:categoryName" render={(props) => (
                <div>
                {(()=> {
                           if(categories && categories.filter((c)=>c.name===props.match.params.categoryName).length===0) return <Redirect to={'/404.html'}/>
                          })()}
                  <CategoryBanner categories={categories} categoryName={props.match.params.categoryName} />
                  <br/>
                  <Posts categoryName={props.match.params.categoryName} />
                </div> )} />

              <Route exact path="/:categoryName/:postId/edit" render={(props) => (
                <div>
                  <CategoryBanner categories={categories} categoryName={props.match.params.categoryName} />
                  <br/>
                  <EditPost postId={props.match.params.postId} categories={categories} />
                </div> )} />

              <Route exact path="/:categoryName/:postId/view" render={(props) => (
                <div>
                  <CategoryBanner categories={categories} categoryName={props.match.params.categoryName} />
                  <br/>
                  <ViewPost postId={props.match.params.postId} categories={categories} />
                </div> )} />

              <Route exact path="/:categoryName/:postId/new-comment" render={(props) => (
                <div>
                  <NewComment postId={props.match.params.postId}/>
                </div> )} />

              <Route exact path="/:categoryName/:postId/new-post" render={(props) => (
                <div>
                  <CategoryBanner categories={categories} categoryName={props.match.params.categoryName} />
                  <br/>
                  <NewPost categories={categories}/>
                </div>)} />

              <Route exact path="/:categoryName/:postId/:commentId/edit" render={(props) => (
                <div>
                  <CategoryBanner categories={categories} categoryName={props.match.params.categoryName} />
                  <br/>
                  <EditComment commentId={props.match.params.commentId} postId={props.match.params.postId} categories={categories} />
                </div> )} />


                <Route path="*" component={NotFound} />

            </Switch>
          </Jumbotron>
      </Container>

        )
    }
}


const mapStateToProps = state => {
    return {
        categories: state.CategoriesReducer.categories
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
