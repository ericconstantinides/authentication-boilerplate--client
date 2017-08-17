import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'

import registerServiceWorker from './registerServiceWorker'
import './index.css'

import reducers from './reducers'

const createStoreWithMiddleware = applyMiddleware()(createStore)

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <div>
      <h1>APP GOES HERE</h1>
    </div>
  </Provider>
  , document.getElementById('root'))
registerServiceWorker()
