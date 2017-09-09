import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { BrowserRouter } from 'react-router-dom'
import reduxThunk from 'redux-thunk'
import App from './components/app'

import { AUTH_USER } from './actions/types'

import registerServiceWorker from './registerServiceWorker'
import './index.css'

import reducers from './reducers'

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore)
const store = createStoreWithMiddleware(reducers)

// ↑ The store was created _first_ before getting the token ↓
const token = window.localStorage.getItem('token')
// if we have a token, consider the user to be signed in
if (token) {
  // we need to update application state
  store.dispatch({ type: AUTH_USER })
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'))
registerServiceWorker()
