import React, {Component} from 'react'
import {connect} from 'react-redux'
import LoginForm from './LoginForm'
import { changeLoginForm, login } from '../authActions'
import FormHelper from '../../utils/formHelper'

class Login extends Component {
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
        <LoginForm
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
    formState: state.auth.loginForm
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onFormChange: newState => {
      dispatch(changeLoginForm(newState))
    },
    onFormSubmit: user => {
      dispatch(login(user))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
