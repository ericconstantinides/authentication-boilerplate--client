import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class Header extends Component {
  renderLinks () {
    if (this.props.authenticated) {
      return (
        <li className='nav-item'>
          <Link className='nav-link' to='/signout'>Sign Out</Link>
        </li>
      )
    }
    return [
      <li className='nav-item' key='signin'>
        <Link className='nav-link' to='/signin'>Sign In</Link>
      </li>,
      <li className='nav-item' key='signup'>
        <Link className='nav-link' to='/signup'>Sign Up</Link>
      </li>
    ]
  }
  render () {
    return (
      <nav className='navbar navbar-light navbar-expand-sm'>
        <Link to='/' className='navbar-brand'>Redux Auth</Link>
        <ul className='navbar-nav mr-auto'>
          {this.renderLinks()}
        </ul>
      </nav>
    )
  }
}

function mapStateToProps (state) {
  return { authenticated: state.auth.authenticated }
}

export default connect(mapStateToProps)(Header)
