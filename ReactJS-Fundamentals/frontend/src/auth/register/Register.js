import React from 'react'
import {connect} from 'react-redux'
import RegisterForm from './RegisterForm'
import { changeRegisterForm, register } from '../authActions'
import FormHelper from '../../utils/formHelper'

function Register ({formState, onFormChange, onFormSubmit}) {
  return (
    <div>
      <RegisterForm
        formState={formState}
        onChange={onFormChange}
        onSubmit={onFormSubmit}
        />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    formState: state.auth.registerForm
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onFormChange: newState => {
      dispatch(changeRegisterForm(newState))
    },
    onFormSubmit: user => {
      dispatch(register(user))
    }
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return {
    ...stateProps,
    onFormChange: event => {
      let newState = FormHelper.handleFormChange(event, stateProps.formState)

      dispatchProps.onFormChange(newState)
    },
    onFormSubmit: event => {
      event.preventDefault()
      dispatchProps.onFormSubmit(stateProps.formState)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Register)
