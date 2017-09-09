import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'

class Feature extends Component {
  componentWillMount () {
    this.props.fetchGated()
  }
  render () {
    return (
      <div>
        <p>{this.props.gated}</p>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    gated: state.auth.gated
  }
}

export default connect(mapStateToProps, actions)(Feature)
