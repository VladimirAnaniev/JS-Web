import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { logoutAction } from './authActions'

function Logout ({logout, location}) {
  logout()
  return (
    <Redirect to={{
      pathname: '/',
      state: {from: location}
    }} />
  )
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
