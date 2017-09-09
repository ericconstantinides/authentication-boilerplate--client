import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export default function (ComposedComponent) {
  class Authentication extends Component {
    // static keyword creates a variable available on the entire class
    // EVERY instance
    static contextTypes = {
      router: PropTypes.object
    }
    componentWillMount() {
      if (!this.props.auth) {
        this.context.router.history.push('/')
      }
    }
    // already mounted but now we're updating
    componentWillUpdate(nextProps) {
      if (!nextProps.auth) {
        this.context.router.history.push('/')
      }
    }
    // {...this.props} just JSX's the same props down to its child ↓
    render () {
      return <ComposedComponent {...this.props} />
    }
  }
  function mapStateToProps (state) {
    return { auth: state.auth.authenticated }
  }

  return connect(mapStateToProps)(Authentication)
}
