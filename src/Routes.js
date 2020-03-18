import React, { useContext } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import { AuthContext } from './providers/AuthProvider'
import AuthPage from './pages/Auth'
import AttendeesPage from './pages/Attendees'
import DataListPage from './pages/DataList'
import SettingPage from './pages/Settings'
import EventSetUp from './pages/EventSetUp'
import EventList from './pages/EventList'
import EventAttendeeList from './pages/EventAttendeeList'
import { AttendeeProvider } from './providers/AttendeeProvider'
import { DrinkProvider } from './providers/DrinkProvider'
import { EventProvider } from './providers/EventProvider'

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
    <EventProvider>
      <AttendeeProvider>
        <DrinkProvider>
          <main className="main-content">
            <Switch>
              <Redirect from="/" to="/events" exact />
              <Redirect from="/auth" to="/attendees" exact />
              <Route path="/events" component={EventList} exact />
              <Route path="/events/:eventID" component={EventAttendeeList} />
              <Route path="/attendees" component={AttendeesPage} />
              <Route path="/datalist" component={DataListPage} />
              <Route path="/settings" component={SettingPage} />
              <Route path="/event-setup" component={EventSetUp} />
              {/* delete this after and uncomment the above */}
              {/* <Route path="/attendees" component={AttendeesPage} /> */}
            </Switch>
          </main>
        </DrinkProvider>
      </AttendeeProvider>
    </EventProvider>
  )
}

export default Routes
