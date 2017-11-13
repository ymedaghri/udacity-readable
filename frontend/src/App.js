import React  from 'react';
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import Header from './components/Header'
import Main from './components/Main'
import './App.css';


const App = function(props) {


    return (
      <div>
      	<div className="main-wrapper">
      		<Header/>
      	</div>
			<Switch>
				<Route path="/" component={Main} />
			</Switch>
	  </div>
    )
  }

export default connect()(App)
