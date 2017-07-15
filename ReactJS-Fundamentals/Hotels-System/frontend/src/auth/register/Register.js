import React, {Component} from 'react'
import {connect} from 'react-redux'
import RegisterForm from './RegisterForm'
import { changeRegisterForm, register } from '../authActions'
import FormHelper from '../../utils/formHelper'

class Register extends Component {
  onFormChange = event => {
    let newState = FormHelper.handleFormChange(event, this.props.formState)

    this.props.onFormChange(newState)
  }

  onFormSubmit = event => {
    event.preventDefault()
    this.props.onFormSubmit(this.props.formState)
  }

  render () {
    const {formState} = this.props
    return (
      <div>
        <RegisterForm
          formState={formState}
          onChange={this.onFormChange}
          onSubmit={this.onFormSubmit}
        />
      </div>
    )
  }
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

export default connect(mapStateToProps, mapDispatchToProps)(Register)
