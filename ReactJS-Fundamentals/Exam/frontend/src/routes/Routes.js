import React from 'react'
import {Switch, Route} from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import UnauthorizedOnlyRoute from './UnauthorizedOnlyRoute'
import Home from '../home/Home'
import NotFound from '../home/NotFound'
import Login from '../auth/login/Login'
import Register from '../auth/register/Register'
import Logout from '../auth/Logout'
import CreateCar from '../cars/create/CreateCar'
import AllCars from '../cars/all/AllCars'
import CarDetails from '../cars/details/CarDetails'
import Profile from '../profile/Profile'

export default function Routes () {
  return (
    <Switch>
      <Route path='/' exact component={Home} />
      <Route path='/cars/all' component={AllCars} />
      <UnauthorizedOnlyRoute path='/login' component={Login} />
      <UnauthorizedOnlyRoute path='/register' component={Register} />
      <PrivateRoute path='/logout' component={Logout} />
      <PrivateRoute path='/cars/create' component={CreateCar} />
      <PrivateRoute path='/cars/details/:id' component={CarDetails} />
      <PrivateRoute path='/profile' component={Profile} />
      <Route component={NotFound} />
    </Switch>
  )
}
