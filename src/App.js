import React from 'react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import { AuthProvider } from './context/auth-context'
import MainNavigation from './components/Navigation/MainNavigation'
import Routes from './Routes'

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MainNavigation />
        <Routes />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
