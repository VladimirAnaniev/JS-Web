import {
  STATS_SET
} from './homeActionTypes'
import REST from '../utils/rest'
import { error } from '../feedback/feedbackActions'

export function fetchStatistics () {
  return dispatch => {
    REST.get('stats')
    .then(result => {
      if (!result.success) {
        dispatch(error(result))
      }

      dispatch(loadStats(result))
    })
    .catch(err => {
      dispatch(error(err))
    })
  }
}

function loadStats (payload) {
  return {type: STATS_SET, payload}
}
