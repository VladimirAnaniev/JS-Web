import {
  SUCCESS,
  ERROR
} from './feedbackActionTypes.js'
import FormHelper from '../utils/formHelper'

export function error (err) {
  return (dispatch) => {
    let message = FormHelper.getFirstError(err)
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
