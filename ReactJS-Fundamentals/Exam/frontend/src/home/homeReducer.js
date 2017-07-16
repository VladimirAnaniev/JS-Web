import {
  STATS_SET
 } from './homeActionTypes'

const homeInitialState = {
  stats: {
    cars: 0,
    users: 0
  }
}

export default function home (state = homeInitialState, action) {
  switch (action.type) {
    case STATS_SET:
      return Object.assign({}, state, {
        stats: action.payload
      })
    default:
      return state
  }
}
