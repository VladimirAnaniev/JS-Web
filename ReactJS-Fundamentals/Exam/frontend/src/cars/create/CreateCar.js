import React from 'react'
import { connect } from 'react-redux'
import CreateCarForm from './CreateCarForm'
import { createCar, updateFormState } from '../carsActions'
import FormHelper from '../../utils/formHelper'

// TODO: Redirect to details!

function CreateCar ({formState, onChange, onSubmit}) {
  return (
    <CreateCarForm
      formState={formState}
      onChange={onChange}
      onSubmit={onSubmit}
      />
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    formState: state.cars.formState
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSubmit: (payload) => {
      dispatch(createCar(payload))
    },
    onChange: (payload) => {
      dispatch(updateFormState(payload))
    }
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return {
    ...stateProps,
    onSubmit: (event) => {
      event.preventDefault()
      dispatchProps.onSubmit(stateProps.formState)
    },
    onChange: (event) => {
      let newState = FormHelper.handleFormChange(event, stateProps.formState)
      dispatchProps.onChange(newState)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(CreateCar)
