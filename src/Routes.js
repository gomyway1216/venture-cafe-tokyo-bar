import React, { useContext } from 'react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'

import AuthContext from './context/auth-context'
import AuthPage from './pages/Auth'
import MainNavigation from './components/Navigation/MainNavigation'
import AttendeesPage from './pages/Attendees'
import DataListPage from './pages/DataList'
import SettingPage from './pages/Settings'
import { AttendeeProvider } from './providers/AttendeeProvider'
import { DrinkProvider } from './providers/DrinkProvider'

const Routes = () => {
  const contextInfo = useContext(AuthContext)
  const { token } = contextInfo

  if (!token) {
    return (
      <Switch>
        <Route path="/auth" component={AuthPage} exact />
        <Redirect to="/auth" />
      </Switch>
    )
  }

  return (
    <AttendeeProvider>
      <DrinkProvider>
        <main className="main-content">
          <Switch>
            <Redirect from="/" to="/attendees" exact />
            <Redirect from="/auth" to="/attendees" exact />
            <Route path="/attendees" component={AttendeesPage} />
            <Route path="/datalist" component={DataListPage} />
            <Route path="/settings" component={SettingPage} />
            {/* delete this after and uncomment the above */}
            {/* <Route path="/attendees" component={AttendeesPage} /> */}
          </Switch>
        </main>
      </DrinkProvider>
    </AttendeeProvider>
  )
}

export default Routes
