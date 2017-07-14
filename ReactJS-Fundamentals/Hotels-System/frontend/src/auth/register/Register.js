import React, {Component} from 'react'
import {connect} from 'react-redux'
import RegisterForm from './RegisterForm'
import { changeRegisterForm, register } from '../authActions'

class Register extends Component {
  onFormChange = event => {
    const target = event.target
    const field = target.name
    const value = target.value
    let newState = Object.assign({}, this.props.formState, {[field]: value})

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
