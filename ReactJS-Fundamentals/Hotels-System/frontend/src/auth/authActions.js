import {
  CHANGE_LOGIN_FORM,
  CHANGE_REGISTER_FORM,
  CHANGE_LOGGED_IN_STATUS,
  RESET_AUTH_FROMS
} from './authActionTypes.js'
import Auth from '../utils/auth'
import REST from '../utils/rest'
import Validator from '../utils/validator'
import { success, error } from '../feedback/feedbackActions'

export function register (user) {
  return (dispatch) => {
    let validation = Validator.validateRegistration(user)
    if (!validation.isValid) {
      dispatch(error(validation))
      return
    }

    REST.post('auth/signup', user)
      .then(result => {
        if (!result.success) {
          dispatch(error(result))
          return
        }

        dispatch(registerSuccess(user))
      })
      .catch(err => {
        dispatch(error(err))
      })
  }
}

function registerSuccess (user) {
  return (dispatch) => {
    dispatch(success('Registration successful.'))
    dispatch(login({email: user.email, password: user.password}))
    dispatch(resetAuthForms)
  }
}

export function login (user) {
  return (dispatch) => {
    let validation = Validator.validateLogin(user)
    if (!validation.isValid) {
      dispatch(error(validation))
      return
    }

    REST.post('auth/login', user)
      .then(result => {
        if (!result.success) {
          dispatch(error(result))
          return
        }

        dispatch(loginSuccess(result.token, result.user))
      })
      .catch(err => {
        dispatch(error(err))
      })
  }
}

function loginSuccess (token, user) {
  return (dispatch) => {
    dispatch(success('Login successful.'))
    dispatch(changeLoggedInStatus(true))
    Auth.authenticateUser(token)
    Auth.saveUser(user)
    dispatch(resetAuthForms)
  }
}

export function changeRegisterForm (newState) {
  return {type: CHANGE_REGISTER_FORM, newState}
}

export function changeLoginForm (newState) {
  return {type: CHANGE_LOGIN_FORM, newState}
}

function changeLoggedInStatus (newState) {
  return {type: CHANGE_LOGGED_IN_STATUS, newState}
}

export function logoutAction () {
  return (dispatch) => {
    Auth.deauthenticateUser()
    Auth.removeUser()
    dispatch(success('Logout successful.'))
    dispatch(changeLoggedInStatus(false))
  }
}

const resetAuthForms = {type: RESET_AUTH_FROMS}
