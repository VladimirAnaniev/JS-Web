import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchMine, deleteCar } from './profileActions'
import {Link} from 'react-router-dom'

class Profile extends Component {
  componentWillMount = () => {
    this.props.fetch()
  }

  handleDeletion = (id) => (event) => {
    event.preventDefault()
    this.props.delete(id)
  }

  render () {
    const {cars} = this.props
    return (
      <div>
        Profile
        {cars.map(c => (
          <div key={c.id}>
            <Link to={`/cars/details/${c.id}`}>{c.make} - {c.model}</Link>
            <button onClick={this.handleDeletion(c.id)}>Delete</button>
          </div>
        ))}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    cars: state.profile.cars
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetch: () => {
      dispatch(fetchMine())
    },
    delete: id => {
      dispatch(deleteCar(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
