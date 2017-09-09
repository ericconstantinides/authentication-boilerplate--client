import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import * as actions from '../../actions'

class Signin extends Component {
  // gets called after successful validation:
  handleFormSubmit ({ email, password }) {
    // do something to log user in:
    // create an action creator
    this.props.signinUser({ email, password }, this.props.history)
  }
  renderAlert () {
    if (this.props.errorMessage) {
      return (
        <div className='alert alert-danger'>
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      )
    }
  }
  renderField ({ label, type, ...field }) {
    return (
      <fieldset className='form-group'>
        <label>
          {label}:
        </label>
        <input {...field.input} className='form-control' type={type} />
      </fieldset>
    )
  }
  render () {
    return (
      <form onSubmit={this.props.handleSubmit(this.handleFormSubmit.bind(this))}>
        <Field name='email' component={this.renderField} label='Email'
          type='text' />
        <Field name='password' component={this.renderField} label='Password'
          type='password' />
        {this.renderAlert()}
        <button className='btn btn-primary' action='submit'>
          Sign in
        </button>
      </form>
    )
  }
}

function mapStateToProps (state) {
  return { errorMessage: state.auth.error }
}

export default reduxForm({
  form: 'signin'
})(connect(mapStateToProps, actions)(Signin))
