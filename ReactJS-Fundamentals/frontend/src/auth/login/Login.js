import React from 'react'
import {connect} from 'react-redux'
import LoginForm from './LoginForm'
import { changeLoginForm, login } from '../authActions'
import FormHelper from '../../utils/formHelper'

function Login ({formState, onFormChange, onFormSubmit}) {
  return (
    <div>
      <LoginForm
        formState={formState}
        onChange={onFormChange}
        onSubmit={onFormSubmit}
        />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    formState: state.auth.loginForm
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFormChange: newState => {
      dispatch(changeLoginForm(newState))
    },
    onFormSubmit: user => {
      dispatch(login(user))
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

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Login)
