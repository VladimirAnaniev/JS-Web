import React from 'react'
import {Switch, Route} from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import UnauthorizedOnlyRoute from './UnauthorizedOnlyRoute'
import Home from '../home/Home'
import NotFound from '../home/NotFound'
import Login from '../auth/login/Login'
import Register from '../auth/register/Register'
import Logout from '../auth/Logout'

export default function Routes () {
  return (
    <Switch>
      <Route path='/' exact component={Home} />
      <UnauthorizedOnlyRoute path='/login' component={Login} />
      <UnauthorizedOnlyRoute path='/register' component={Register} />
      <PrivateRoute path='/logout' component={Logout} />
      <Route component={NotFound} />
    </Switch>
  )
}
