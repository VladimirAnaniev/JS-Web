import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchAll, changePage, changeSearch } from '../carsActions'
import { parse } from 'query-string'
import { Link } from 'react-router-dom'

class AllCars extends Component {
  componentWillMount = () => {
    const query = parse(this.props.query)
    this.props.fetch(query.page || 1, query.search || '')
  }

  handlePrevPage = () => {
    this.props.changePage(this.props.page - 1)
  }

  handleNextPage = () => {
    this.props.changePage(this.props.page + 1)
  }

  getPageButtons = () => {
    let prev = true
    let next = true

    if (this.props.page === 1) prev = false
    if (this.props.cars.length === 0) next = false

    return (
      <div>
        {prev && <button onClick={this.handlePrevPage}>Prev</button>}
        {next && <button onClick={this.handleNextPage}>Next</button>}
      </div>
    )
  }

  handleSearchChange = event => {
    this.props.changeSearch(event.target.value)
  }

  render () {
    const {cars, search} = this.props
    return (
      <div>
        <input onChange={this.handleSearchChange} value={search} />
        {cars.map(c => (
          <div key={c.id}>
            <Link to={`/cars/details/${c.id}`}>{c.make} - {c.model}</Link>
          </div>)
        )}
        {this.getPageButtons()}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    page: state.cars.page,
    cars: state.cars.allCars
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetch: (page, search) => {
      dispatch(fetchAll(page, search))
    },
    changePage: (page) => {
      dispatch(changePage(page))
    },
    changeSearch: (search) => {
      dispatch(changeSearch(search))
    }
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return {
    ...stateProps,
    query: ownProps.location.search,
    fetch: (page, search) => {
      dispatchProps.changePage(page)
      dispatchProps.changeSearch(search)
      dispatchProps.fetch(page, search)
    },
    changePage: (page) => {
      dispatchProps.changePage(page)
      dispatchProps.fetch(page, stateProps.search) // TODO: change url
    },
    changeSearch: (search) => {
      dispatchProps.changeSearch(search)
      dispatchProps.fetch(stateProps.page, search)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(AllCars)
