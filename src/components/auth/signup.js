import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import * as actions from '../../actions'

class Signup extends Component {
  // gets called after successful validation:
  handleFormSubmit ({ email, password }) {
    // create an action creator
    this.props.signupUser({ email, password }, this.props.history)
  }
  renderField (field) {
    const { input, label, type, meta: {touched, error} } = field
    const inputClass = `form-control ${touched && error ? 'is-invalid' : ''}`
    return (
      <fieldset>
        <label className='form-control-label'>{label}</label>
        {/* ...field.input is JSX way of spreading out all of the input properties
        and methods as props on the input (name, onBlur(), etc) */}
        <input {...field.input} className={inputClass} type={type} />
        <div className='invalid-feedback'>{error}</div>
      </fieldset>
    )
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
  render () {
    return (
      <form onSubmit={this.props.handleSubmit(this.handleFormSubmit.bind(this))}>
        {/* ↑ this.props.handleSubmit is built into reduxForm */}
        <Field name='email' component={this.renderField}
          type='text' label='Email' />
        <Field name='password' component={this.renderField}
          type='password' label='Password' />
        <Field name='passwordConfirm' component={this.renderField}
          type='password' label='Confirm Password' />
        { this.renderAlert() }
        <button className='btn btn-primary' action='submit'>
          Sign up
        </button>
      </form>
    )
  }
}

function validate (formProps) {
  const errors = {}
  // Validate the inputs from 'formProps'
  if (!formProps.email) errors.email = 'Please enter an email'
  if (!formProps.password) errors.password = 'Please enter a password'
  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Please enter a password confirmation'
  }
  if (formProps.password !== formProps.passwordConfirm) {
    errors.passwordConfirm = 'Passwords do not match'
  }
  return errors
}
// this is coming off of our reducer answer after the action question
function mapStateToProps (state) {
  return { errorMessage: state.auth.error }
}

export default reduxForm({
  validate,
  form: 'signUp'
})(connect(mapStateToProps, actions)(Signup))
