import React, { Component } from 'react'
import { Button } from 'reactstrap'
import { sortPostsByTimestampAction } from '../reducers/PostsActions'
import { connect } from 'react-redux'
import FaSortAsc from 'react-icons/lib/fa/sort-asc'
import FaSortDesc from 'react-icons/lib/fa/sort-desc'

class SortByTimestampButton extends Component {

    render() {
    	const {sortPostsByTimestamp} = this.props

        return (
            <Button color={(sortPostsByTimestamp === true) ? 'warning' : 'primary'} size="sm" onClick={()=>this.props.dispatchSortPostsByTimestamp()}>Sort By Timestamp</Button>
        )
    }
}

const mapStateToProps = state => {
    return {
        sortPostsByTimestamp: state.PostsReducer.sortPostsByTimestamp
    }
}

const mapDispatchToProps = dispatch => {
    return {
        dispatchSortPostsByTimestamp: () => dispatch(sortPostsByTimestampAction())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SortByTimestampButton);
