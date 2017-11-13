import React, { Component } from 'react'
import { Button } from 'reactstrap'
import { sortCommentsByVoteAction } from '../reducers/PostsActions'
import { connect } from 'react-redux'
import FaSortAsc from 'react-icons/lib/fa/sort-asc'
import FaSortDesc from 'react-icons/lib/fa/sort-desc'
import FaSort from 'react-icons/lib/fa/sort'

class SortCommentsByVoteButton extends Component {

    render() {
    	const {sortCommentsByVote, sortCommentsByVoteDirection} = this.props

        return (
            <Button color={(sortCommentsByVote === true) ? 'warning' : 'primary'} size="sm" onClick={()=>this.props.dispatchSortCommentsByVote()}>Sort By Vote
            &nbsp;
            { ((sorted, sortDirection) =>
                {
                  if(sorted===true)
                    {
                        if(sortDirection==='asc')
                            return <FaSortAsc/>;
                        else return <FaSortDesc/>
                    }
                    else
                    {
                       return <FaSort/>
                    }
                }
                )(sortCommentsByVote, sortCommentsByVoteDirection)
            }
            </Button>
        )
    }
}

const mapStateToProps = state => {
    return {
        sortCommentsByVote: state.PostsReducer.sortCommentsByVote,
        sortCommentsByVoteDirection: state.PostsReducer.sortCommentsByVoteDirection
    }
}

const mapDispatchToProps = dispatch => {
    return {
        dispatchSortCommentsByVote: () => dispatch(sortCommentsByVoteAction())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SortCommentsByVoteButton);
