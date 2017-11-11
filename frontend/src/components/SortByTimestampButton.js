import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { sortPostsByTimestampAction } from '../reducers/PostsReducer'
import { connect } from 'react-redux';

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