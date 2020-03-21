import React, { useContext } from 'react'
import { NavLink, useRouteMatch } from 'react-router-dom'

import { AuthContext } from '../../providers/AuthProvider'
import { EventContext } from '../../providers/EventProvider'

import './MainNavigation.css'

const MainNavigation = props => {
  const { token, logout } = useContext(AuthContext)
  // const { eventID, setEventID } = useContext(EventContext)

  const logOutHandler = () => {
    // setEventID('')
    logout()
  }

  const eventIDMatch = useRouteMatch('/events/:eventID/')
  const eventID = eventIDMatch?.params?.eventID

  return (
    <header className="main-navigation">
      <div className="main-navigation__logo">
        <h1>Drink Counter</h1>
      </div>
      <nav className="main-navigation__items">
        <ul>
          {!token && (
            <li>
              <NavLink to="/auth">Authenticate</NavLink>
            </li>
          )}
          {token && (
            <>
              {eventID && <EventNavLinks eventID={eventID} />}
              <li>
                <button onClick={logOutHandler}>Logout</button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  )
}

const EventNavLinks = props => {
  return (
    <>
      <li>
        <NavLink to="/events">Events</NavLink>
      </li>
      <li>
        <NavLink to={`/events/${props.eventID}/datalist`}>Data List</NavLink>
      </li>

      <li>
        <NavLink to={`/events/${props.eventID}/settings`}>Settings</NavLink>
      </li>
    </>
  )
}

export default MainNavigation
