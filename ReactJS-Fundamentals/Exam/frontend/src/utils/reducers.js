import {combineReducers} from 'redux'
import auth from '../auth/authReducer'
import feedback from '../feedback/feedbackReducer'
import home from '../home/homeReducer'
import cars from '../cars/carsRecucer'
import profile from '../profile/profileReducer'

export default combineReducers({auth, feedback, home, cars, profile})
