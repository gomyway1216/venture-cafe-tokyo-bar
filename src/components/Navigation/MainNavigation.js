import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'

import { AuthContext } from '../../providers/AuthProvider'
import { EventContext } from '../../providers/EventProvider'
import './MainNavigation.css'

const MainNavigation = props => {
  const { token, logout } = useContext(AuthContext)
  const { eventID, setEventID } = useContext(EventContext)

  const logOutHandler = () => {
    setEventID('')
    logout()
  }

  // const { eventID } = props.match.params
  console.log('props.match', props.match)

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
              <li>
                <NavLink to="/events">Events</NavLink>
              </li>

              <NavLinks eventID={eventID} />
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

const NavLinks = props => {
  if (!props.eventID || props.eventID.length === 0) {
    return <> </>
  }

  return (
    <>
      <li>
        <NavLink to={`/${props.eventID}/datalist`}>Data List</NavLink>
      </li>

      <li>
        <NavLink to={`/${props.eventID}/settings`}>Settings</NavLink>
      </li>
    </>
  )
}

export default MainNavigation
