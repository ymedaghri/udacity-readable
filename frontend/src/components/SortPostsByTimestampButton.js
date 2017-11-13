import React, { Component } from 'react'
import { Button } from 'reactstrap'
import { sortPostsByTimestampAction } from '../reducers/PostsActions'
import { connect } from 'react-redux'
import FaSortAsc from 'react-icons/lib/fa/sort-asc'
import FaSortDesc from 'react-icons/lib/fa/sort-desc'
import FaSort from 'react-icons/lib/fa/sort'

class SortPostsByTimestampButton extends Component {

    render() {
    	const {sortPostsByTimestamp, sortPostsByTimestampDirection} = this.props

        return (
            <Button color={(sortPostsByTimestamp === true) ? 'warning' : 'primary'} size="sm" onClick={()=>this.props.dispatchSortPostsByTimestamp()}>Sort By Timestamp
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
                )(sortPostsByTimestamp, sortPostsByTimestampDirection)
            }
            </Button>

        )
    }
}

const mapStateToProps = state => {
    return {
        sortPostsByTimestamp: state.PostsReducer.sortPostsByTimestamp,
        sortPostsByTimestampDirection: state.PostsReducer.sortPostsByTimestampDirection
    }
}

const mapDispatchToProps = dispatch => {
    return {
        dispatchSortPostsByTimestamp: () => dispatch(sortPostsByTimestampAction())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SortPostsByTimestampButton);
