import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { logoutAction } from './authActions'

class Logout extends Component {
  componentWillMount = () => {
    this.props.logout()
  }

  render () {
    return (
      <Redirect to={{
        pathname: '/',
        state: {from: this.props.location}
      }} />
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch(logoutAction())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout)
