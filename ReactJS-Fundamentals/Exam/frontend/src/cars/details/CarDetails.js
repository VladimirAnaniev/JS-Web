import React, {Component} from 'react'
import { connect } from 'react-redux'
import { fetchDetails, like, updateReviewFormState, sendReview } from '../carsActions'
import CarInfo from './CarInfo'
import Review from './Review'
import ReviewForm from './ReviewForm'
import FormHelper from '../../utils/formHelper'

class CarDetails extends Component {
  componentWillMount = () => {
    this.props.fetch()
  }

  handleFormSubmit = id => () => {
    this.props.onSendReview(id)
  }

  render () {
    const {car, onLike, reviews, formState, onFormChange} = this.props
    return (
      <div>
        <CarInfo car={car} />
        <button onClick={onLike}>Like</button> //TODO: Validate
        <h3>Reviews</h3>
        {reviews.map((r, i) => (<Review key={i} comment={r.comment} rating={r.rating} />))}
        <ReviewForm formState={formState} onChange={onFormChange} onSubmit={this.handleFormSubmit(car.id)} />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    car: state.cars.details,
    reviews: state.cars.reviews,
    formState: state.cars.reviewForm
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetch: (id) => {
      dispatch(fetchDetails(id))
    },
    like: (id) => {
      dispatch(like(id))
    },
    onFormChange: (newState) => {
      dispatch(updateReviewFormState(newState))
    },
    onSendReview: (id, review) => {
      dispatch(sendReview(id, review))
    }
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return {
    ...stateProps,
    fetch: () => {
      dispatchProps.fetch(ownProps.match.params.id)
    },
    onLike: () => {
      dispatchProps.like(ownProps.match.params.id)
    },
    onFormChange: event => {
      let newState = FormHelper.handleFormChange(event, stateProps.formState)

      dispatchProps.onFormChange(newState)
    },
    onSendReview: (id) => {
      dispatchProps.onSendReview(id, stateProps.formState)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(CarDetails)
