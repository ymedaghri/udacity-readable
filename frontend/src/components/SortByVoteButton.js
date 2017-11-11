import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { sortPostsByVoteAction } from '../reducers/PostsReducer'
import { connect } from 'react-redux';

class SortByVoteButton extends Component {

    render() {
    	const {sortPostsByVote} = this.props

        return (
            <Button color={(sortPostsByVote === true) ? 'warning' : 'primary'} size="sm" onClick={()=>this.props.dispatchSortPostsByVote()}>Sort By Vote</Button>
        )
    }
}

const mapStateToProps = state => {
    return {
        sortPostsByVote: state.PostsReducer.sortPostsByVote
    }
}

const mapDispatchToProps = dispatch => {
    return {
        dispatchSortPostsByVote: () => dispatch(sortPostsByVoteAction())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SortByVoteButton);