import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'

import { AuthContext } from '../../providers/AuthProvider'
import './MainNavigation.css'

const MainNavigation = props => {
  const context = useContext(AuthContext)

  return (
    <header className="main-navigation">
      <div className="main-navigation__logo">
        <h1>Drink Counter</h1>
      </div>
      <nav className="main-navigation__items">
        <ul>
          {!context.token && (
            <li>
              <NavLink to="/auth">Authenticate</NavLink>
            </li>
          )}
          {context.token && (
            <React.Fragment>
              <li>
                <NavLink to="/attendees">Attendee</NavLink>
              </li>

              <li>
                <NavLink to="/datalist">Data List</NavLink>
              </li>

              <li>
                <NavLink to="/settings">Settings</NavLink>
              </li>

              <li>
                <button onClick={context.logout}>Logout</button>
              </li>
            </React.Fragment>
          )}
        </ul>
      </nav>
    </header>
  )
}

export default MainNavigation
