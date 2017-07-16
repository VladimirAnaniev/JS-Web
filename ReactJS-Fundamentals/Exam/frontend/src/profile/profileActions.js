import {
  MINE_LOAD
} from './profileActionTypes.js'
import REST from '../utils/rest'
import { success, error } from '../feedback/feedbackActions'

export function fetchMine () {
  return dispatch => {
    REST.get('cars/mine', true)
      .then(cars => {
        if (cars.success === false) {
          dispatch(error(cars))
          return
        }

        dispatch(loadMine(cars))
      })
      .catch(err => {
        dispatch(error(err))
      }
    )
  }
}

function loadMine (payload) {
  return {type: MINE_LOAD, payload}
}

export function deleteCar (id) {
  return dispatch => {
    REST.post(`cars/delete/${id}`, {}, true)
      .then(result => {
        if (result.success === false) {
          dispatch(error(result))
          return
        }

        dispatch(success('Car deleted successfully!'))
        dispatch(fetchMine())
      })
      .catch(err => {
        dispatch(error(err))
      })
  }
}
