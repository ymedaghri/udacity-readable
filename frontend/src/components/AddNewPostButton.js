import React from 'react';
import { Button } from 'reactstrap';
import FaPlus from 'react-icons/lib/fa/plus'
import { Link } from 'react-router-dom'

const AddNewPostButton = function(props) {
  return (
            <Link to={`/${props.categoryName}/${Date.now()}/new-post`}>
                        <Button color="success" size="sm">Add a new Post <FaPlus/></Button>
                    </Link>
  )
}

export default AddNewPostButton