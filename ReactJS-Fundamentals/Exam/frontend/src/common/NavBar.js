import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { bool } from 'prop-types'

NavBar.propTypes = {
  isLoggedIn: bool
}

function NavBar ({isLoggedIn = false}) {
  if (isLoggedIn) {
    return (
      <ul className='navbar'>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/cars/all'>All Cars</NavLink></li>
        <li><NavLink to='/cars/create'>Create Car</NavLink></li>
        <li><NavLink to='/profile'>Profile</NavLink></li>
        <li><NavLink to='/logout'>Logout</NavLink></li>
      </ul>
    )
  } else {
    return (
      <ul className='navbar'>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/cars/all'>All Cars</NavLink></li>
        <li><NavLink to='/register'>Register</NavLink></li>
        <li><NavLink to='/login'>Login</NavLink></li>
      </ul>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn
  }
}

export default connect(mapStateToProps)(NavBar)
