import {
  FORM_STATE_UPDATE,
  ALL_CARS_LOAD,
  PAGE_CHANGE,
  SEARCH_CHANGE,
  DETAILS_LOAD,
  REVIEWS_LOAD,
  REVIEW_FORM_UPDATE
} from './carsActionTypes'

const carsInitialState = {
  formState: {
    make: '',
    model: '',
    year: 0,
    engine: '',
    price: 0,
    image: '',
    mileage: 0
  },
  allCars: [],
  page: 1,
  search: '',
  details: {
    make: '',
    model: '',
    year: 0,
    engine: '',
    price: 0,
    image: '',
    mileage: 0
  },
  reviews: [],
  reviewForm: {
    rating: 1,
    comment: ''
  }
}

export default function cars (state = carsInitialState, action) {
  switch (action.type) {
    case FORM_STATE_UPDATE:
      return Object.assign({}, state, {
        formState: action.payload
      })
    case ALL_CARS_LOAD:
      return Object.assign({}, state, {
        allCars: action.payload
      })
    case PAGE_CHANGE:
      return Object.assign({}, state, {
        page: action.payload
      })
    case SEARCH_CHANGE:
      return Object.assign({}, state, {
        search: action.payload
      })
    case DETAILS_LOAD:
      return Object.assign({}, state, {
        details: action.payload
      })
    case REVIEWS_LOAD:
      return Object.assign({}, state, {
        reviews: action.payload
      })
    case REVIEW_FORM_UPDATE:
      return Object.assign({}, state, {
        reviewForm: action.payload
      })
    default:
      return state
  }
}
