import React, { Component } from 'react'
import { Button } from 'reactstrap'
import { sortPostsByVoteAction } from '../reducers/PostsActions'
import { connect } from 'react-redux'
import FaSortAsc from 'react-icons/lib/fa/sort-asc'
import FaSortDesc from 'react-icons/lib/fa/sort-desc'

class SortByVoteButton extends Component {

    render() {
    	const {sortPostsByVote, sortDirection} = this.props

        return (
            <Button color={(sortPostsByVote === true) ? 'warning' : 'primary'} size="sm" onClick={()=>this.props.dispatchSortPostsByVote()}>Sort By Vote
            &nbsp;
            { ((sorted, sortDirection) => {
              if(sorted===true)
                if(sortDirection==='asc')
                  return <FaSortAsc/>;
                  else return <FaSortDesc/>
                })(sortPostsByVote, sortDirection)}
            </Button>
        )
    }
}

const mapStateToProps = state => {
    return {
        sortPostsByVote: state.PostsReducer.sortPostsByVote,
        sortDirection: 'desc'
    }
}

const mapDispatchToProps = dispatch => {
    return {
        dispatchSortPostsByVote: () => dispatch(sortPostsByVoteAction())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SortByVoteButton);
