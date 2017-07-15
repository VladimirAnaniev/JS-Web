import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

function UnauthorizedOnlyRoute ({component: Component, isLoggedIn, ...rest}) {
  return (
    <Route {...rest} render={props => (
      !isLoggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect to={{
          pathname: '/',
          state: {from: props.location}
        }} />
      )
    )
    } />
  )
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn
  }
}

export default connect(mapStateToProps)(UnauthorizedOnlyRoute)
