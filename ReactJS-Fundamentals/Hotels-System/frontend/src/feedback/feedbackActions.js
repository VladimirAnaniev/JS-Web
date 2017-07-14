import {
  SUCCESS,
  ERROR
} from '../utils/actionTypes.js'

export function error (message) {
  return (dispatch) => {
    dispatch({type: ERROR, message})

    setTimeout(() => {
      dispatch(clearError())
    }, 2000)
  }
}

export function clearError () {
  return {type: ERROR, message: ''}
}

export function success (message) {
  return (dispatch) => {
    dispatch({type: SUCCESS, message})

    setTimeout(() => {
      dispatch(clearSuccess())
    }, 2000)
  }
}

export function clearSuccess () {
  return {type: SUCCESS, message: ''}
}
