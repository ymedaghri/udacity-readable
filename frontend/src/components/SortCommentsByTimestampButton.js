import React, { Component } from 'react'
import { Button } from 'reactstrap'
import { sortCommentsByTimestampAction } from '../reducers/PostsActions'
import { connect } from 'react-redux'
import FaSortAsc from 'react-icons/lib/fa/sort-asc'
import FaSortDesc from 'react-icons/lib/fa/sort-desc'
import FaSort from 'react-icons/lib/fa/sort'

class SortCommentsByTimestampButton extends Component {

    render() {
    	const {sortCommentsByTimestamp, sortCommentsByTimestampDirection} = this.props

        return (
            <Button color={(sortCommentsByTimestamp === true) ? 'warning' : 'primary'} size="sm" onClick={()=>this.props.dispatchSortCommentsByTimestamp()}>Sort By Timestamp
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
                )(sortCommentsByTimestamp, sortCommentsByTimestampDirection)
            }
            </Button>

        )
    }
}

const mapStateToProps = state => {
    return {
        sortCommentsByTimestamp: state.PostsReducer.sortCommentsByTimestamp,
        sortCommentsByTimestampDirection: state.PostsReducer.sortCommentsByTimestampDirection
    }
}

const mapDispatchToProps = dispatch => {
    return {
        dispatchSortCommentsByTimestamp: () => dispatch(sortCommentsByTimestampAction())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SortCommentsByTimestampButton);
