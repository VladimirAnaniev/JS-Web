import {combineReducers} from 'redux'
import auth from '../auth/authReducer'
import feedback from '../feedback/feedbackReducer'

export default combineReducers({auth, feedback})
