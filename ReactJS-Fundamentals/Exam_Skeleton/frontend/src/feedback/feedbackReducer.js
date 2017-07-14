import {
  SUCCESS,
  ERROR
} from '../utils/actionTypes.js'

const initialState = {
  error: '',
  success: ''
}

export default function feedbackReducer (state = initialState, action) {
  switch (action.type) {
    case SUCCESS:
      return Object.assign({}, state, {
        success: action.message
      })
    case ERROR:
      return Object.assign({}, state, {
        error: action.message
      })
    default:
      return state
  }
}
