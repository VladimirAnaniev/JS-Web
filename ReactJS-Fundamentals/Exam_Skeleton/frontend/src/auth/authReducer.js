import {
  CHANGE_LOGIN_FORM,
  CHANGE_REGISTER_FORM,
  CHANGE_LOGGED_IN_STATUS
} from '../utils/actionTypes'
import Auth from '../utils/auth'

const initialState = {
  registerForm: {
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  },
  loginForm: {
    email: '',
    password: ''
  },
  isLoggedIn: Auth.isUserAuthenticated()
}

export default function authReducer (state = initialState, action) {
  switch (action.type) {
    case CHANGE_LOGIN_FORM:
      return Object.assign({}, state, {
        loginForm: action.newState
      })
    case CHANGE_REGISTER_FORM:
      return Object.assign({}, state, {
        registerForm: action.newState
      })
    case CHANGE_LOGGED_IN_STATUS:
      return Object.assign({}, state, {
        isLoggedIn: action.newState
      })
    default:
      return state
  }
}
