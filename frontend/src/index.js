import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import reducers from './reducers'
import { BrowserRouter, Route } from 'react-router-dom'
import { applyMiddleware, createStore } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import 'bootstrap/dist/css/bootstrap.css'

const store = createStore(reducers, applyMiddleware(logger, thunk));

ReactDOM.render(
  <Provider store={store}><BrowserRouter><Route path="/:filter?" component={App} /></BrowserRouter></Provider>, document.getElementById('root'));
registerServiceWorker();
