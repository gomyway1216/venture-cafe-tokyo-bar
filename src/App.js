import React from 'react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import { AuthProvider } from './providers/AuthProvider'
import { EventProvider } from './providers/EventProvider'
import MainNavigation from './components/Navigation/MainNavigation'
import Routes from './Routes'

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <EventProvider>
          <MainNavigation />
          <Routes />
        </EventProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
