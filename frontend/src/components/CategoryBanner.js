import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Row, Col, Card, CardTitle } from 'reactstrap'
import Loading from 'react-loading'
import { fetchPosts } from '../reducers/getPosts'
import { connect } from 'react-redux';


class CategoryBanner extends Component {

render() {
  	const { categories, categoryName } = this.props

    return ((categories)?<div>
            <h2>Categories</h2>
          <hr className="my-2" />
            <Row>
          { 
            categories.map((category) => (
            <Col key={category.name} sm="4">
      		{(categoryName===category.name)?<Link to={'/'} onClick={()=>this.props.dispatchGetPosts()} >
					{(categoryName===category.name)?<Card body inverse color="success"><CardTitle>{category.name}</CardTitle></Card>:
					<Card body><CardTitle>{category.name}</CardTitle></Card>}                  		
				</Link>: <Link to={`/${category.name}`} onClick={()=>this.props.dispatchGetPosts(category.name)} >
					{(categoryName===category.name)?<Card body inverse color="success"><CardTitle>{category.name}</CardTitle></Card>:
					<Card body><CardTitle>{category.name}</CardTitle></Card>}                  		
				</Link>}
               
            </Col>
            ))
		  }
          </Row>
		</div>:<Loading delay={0} type='spin' color='#222' className='loading' />)   
}
}


const mapStateToProps = state => state

const mapDispatchToProps = dispatch => {
	return {
		dispatchGetPosts: (category) => {
			return fetchPosts(dispatch, category)
		}
	}
}



export default connect(mapStateToProps, mapDispatchToProps)(CategoryBanner);
