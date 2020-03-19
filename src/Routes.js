import React, { useContext } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import { AuthContext } from './providers/AuthProvider'
import AuthPage from './pages/Auth'
import DataListPage from './pages/DataList'
import SettingPage from './pages/Settings'
import EventList from './pages/EventList'
import EventAttendeeList from './pages/EventAttendeeList'
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
            <Redirect from="/" to="/events" exact />
            <Redirect from="/auth" to="/events" exact />
            <Route path="/events" component={EventList} exact />
            <Route path="/:eventID/events" component={EventAttendeeList} />
            <Route path="/:eventID/datalist" component={DataListPage} />
            <Route path="/:eventID/settings" component={SettingPage} />
          </Switch>
        </main>
      </DrinkProvider>
    </AttendeeProvider>
  )
}

export default Routes
