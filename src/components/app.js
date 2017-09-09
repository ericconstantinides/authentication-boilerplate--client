import React, { Component } from 'react'
import Header from './header'
import { Route } from 'react-router-dom'

import Signin from './auth/signin'
import Signout from './auth/signout'
import Signup from './auth/signup'
import Welcome from './welcome'
import Feature from './feature'
import RequireAuth from './auth/require_auth'

export default class App extends Component {
  render () {
    return (
      <div>
        <Header />
        <Route exact path='/' component={Welcome} />
        <Route path='/signin' component={Signin} />
        <Route path='/signout' component={Signout} />
        <Route path='/signup' component={Signup} />
        <Route path='/feature' component={RequireAuth(Feature)} />
      </div>
    )
  }
}
