import React from 'react'
import { connect } from 'react-redux'
import { clearError, clearSuccess } from './feedbackActions'

function Feedback ({error, success, handleSuccessClick, handleErrorClick}) {
  return (
    <div>
      <div className='success' onClick={handleSuccessClick}>{success}</div>
      <div className='error' onClick={handleErrorClick}>{error}</div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    ...state.feedback
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleSuccessClick: () => {
      dispatch(clearSuccess())
    },
    handleErrorClick: () => {
      dispatch(clearError())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Feedback)
