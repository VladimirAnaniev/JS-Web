import {
  MINE_LOAD
} from './profileActionTypes.js'

const profileInitialState = {
  cars: []
}

export default function profile (state = profileInitialState, action) {
  switch (action.type) {
    case MINE_LOAD:
      return Object.assign({}, state, {
        cars: action.payload
      })
    default:
      return state
  }
}
