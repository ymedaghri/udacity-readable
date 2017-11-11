import React, { Component } from 'react';
import { Button } from 'reactstrap';
import FaPlus from 'react-icons/lib/fa/plus'
import { Link } from 'react-router-dom'

class AddNewPostButton extends Component {

    render() {

        const {categoryName} = this.props

        return (
            <Link to={`/${categoryName}/${Date.now()}/new-post`}>
                        <Button color="success" size="sm">Add a new Post <FaPlus/></Button>
                    </Link>
        )
    }
}

export default AddNewPostButton;