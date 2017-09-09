import axios from 'axios'
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER, FETCH_GATED } from './types'
const ROOT_URL = 'http://localhost:3090'

export function signinUser ({ email, password }, history) {
  // redux-thunk gives us access to dispatch
  // It allows us to return a function instead of an object
  // middleware is litreally what it's doing for us
  // redux thunk is async
  //
  // Dispatch is the main pipeline for redux
  return function (dispatch) {
    axios.post(`${ROOT_URL}/signin`, { email, password })
      .then(response => {
        // If request is good...
        // - Update state to indicate user is authenticated
        dispatch({ type: AUTH_USER })

        // - Save the JWT token
        window.localStorage.setItem('token', response.data.token)

        // - Redirect to the rout '/feature' (or whatever)
        history.push('/feature')
      })
      .catch(() => {
        // if request is bad...
        // - Show an error to the user
        dispatch(authError('Bad Login Info'))
      })
  }
}
export function signupUser ({ email, password }, history) {
  return function (dispatch) {
    axios.post(`${ROOT_URL}/signup`, { email, password })
      .then(response => {
        dispatch({ type: AUTH_USER })
        window.localStorage.setItem('token', response.data.token)
        history.push('/feature')
      })
      // this is new and different than above
      // from the server's RESPONSE (response.data.error)
      // send to the authError() fn
      // it dispatches and gets caught by the reducer...
      // we need to have the answer created by the reducer seen in the container
      // FYI, this is newer axios error handling
      .catch(error => dispatch(authError(error.response.data.error)))
  }
}

export function authError (error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

export function signoutUser () {
  window.localStorage.removeItem('token')
  return {
    type: UNAUTH_USER
  }
}

export function fetchGated () {
  // could be done with Redux Promise just as well:
  // it's usually an either/or with them
  return function (dispatch) {
    axios.get(ROOT_URL, { // second option of 'axios.get' is options
      headers: { authorization: window.localStorage.getItem('token') }
    })
      .then(response => {
        dispatch({
          type: FETCH_GATED,
          payload: response.data.message
        })
      })
  }
}

/*
// ↑ fetchGated() with redux-promise:

export function fetchGated () {
  const request = axios.get(ROOT_URL, {
    headers: { authorization: window.localStorage.getItem('token') }
  })
  return { type: FETCH_GATED, payload: request }
}

*/
