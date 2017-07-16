import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchStatistics } from './homeActions'

class Home extends Component {
  static propTypes = {}

  componentWillMount = () => {
    this.props.fetchStats()
  }

  render () {
    const {cars, users} = this.props
    return (
      <div>{users} Users have posted {cars} cars</div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.home.stats
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchStats: () => {
      dispatch(fetchStatistics())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
