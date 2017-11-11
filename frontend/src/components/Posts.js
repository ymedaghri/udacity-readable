import React, { Component } from 'react'
import { fetchPosts } from '../reducers/PostsReducer'
import { connect } from 'react-redux';
import PostsTable from './PostsTable'


class Posts extends Component {

    componentDidMount() {
        const {dispatchGetPosts} = this.props;

        dispatchGetPosts(this.props.categoryName);
    }

    render() {

        return (
            <div>
                <h2>Posts</h2>
                <hr className="my-2" />
                <PostsTable/>
            </div>)
    }
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => {
    return {
        dispatchGetPosts: (category) => {
            fetchPosts(dispatch, category)
        }

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Posts);