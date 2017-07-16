import React from 'react'
import Routes from './routes/Routes'
import Feedback from './feedback/Feedback'
import NavBar from './common/NavBar'
import './App.css'

export default function App () {
  return (
    <div className='App'>
      <NavBar />
      <Feedback />
      <Routes />
    </div>
  )
}
