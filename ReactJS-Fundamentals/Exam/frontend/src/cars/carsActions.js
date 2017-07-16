import {
  FORM_STATE_UPDATE,
  ALL_CARS_LOAD,
  PAGE_CHANGE,
  SEARCH_CHANGE,
  DETAILS_LOAD,
  REVIEWS_LOAD,
  REVIEW_FORM_UPDATE
} from './carsActionTypes'
import REST from '../utils/rest'
import { success, error } from '../feedback/feedbackActions'

export function createCar (payload) {
  return dispatch => {
    REST.post('cars/create', payload, true)
    .then(result => {
      if (!result.success) {
        dispatch(error(result))
        return
      }

      dispatch(success('Created '))
      // TODO: Clear form (left like this for spamming data)
    })
    .catch(err => {
      dispatch(error(err))
    })
  }
}

export function updateFormState (payload) {
  return {type: FORM_STATE_UPDATE, payload}
}

export function fetchAll (page = 1, search = '') {
  return dispatch => {
    REST.get(`cars/all?page=${page}&search=${search}`)
    .then(result => {
      dispatch(loadAllCars(result))
    })
    .catch(err => {
      dispatch(error(err))
    })
  }
}

function loadAllCars (payload) {
  return {type: ALL_CARS_LOAD, payload}
}

export function changePage (payload) {
  return {type: PAGE_CHANGE, payload}
}

export function changeSearch (payload) {
  return {type: SEARCH_CHANGE, payload}
}

export function fetchDetails (id) {
  return dispatch => {
    REST.get(`cars/details/${id}`, true)
    .then(result => {
      if (result.success === false) {
        dispatch(error(result))
        return
      }

      dispatch(loadDetails(result))
    })
    .catch(err => {
      dispatch(error(err))
    })

    REST.get(`cars/details/${id}/reviews`, true)
    .then(result => {
      if (result.success === false) {
        dispatch(error(result))
        return
      }

      dispatch(loadReviews(result))
    })
    .catch(err => {
      dispatch(error(err))
    })
  }
}

function loadDetails (payload) {
  return {type: DETAILS_LOAD, payload}
}

export function like (id) {
  return dispatch => {
    REST.post(`cars/details/${id}/like`, {}, true)
      .then(result => {
        if (result.success) {
          dispatch(success(result.message))
          dispatch(fetchDetails(id))
        } else {
          dispatch(error(result))
        }
      })
  }
}

function loadReviews (payload) {
  return {type: REVIEWS_LOAD, payload}
}

export function updateReviewFormState (payload) {
  return {type: REVIEW_FORM_UPDATE, payload}
}

export function sendReview (id, review) {
  return dispatch => {
    REST.post(`cars/details/${id}/reviews/create`, review, true)
      .then(result => {
        if (result.success) {
          dispatch(success('Review added successfully'))
          dispatch(fetchDetails(id))
        } else {
          dispatch(error(result))
        }
      })
  }
}
