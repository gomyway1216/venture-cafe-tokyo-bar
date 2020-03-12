import React from 'react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import AuthContext from './context/auth-context'
import MainNavigation from './components/Navigation/MainNavigation'
import AttendeesPage from './pages/AttendeesContainer'
import AuthPage from './pages/Auth'
import './App.css'
import DataListPage from './pages/DataList'
import SettingPage from './pages/Settings'
import { AttendeeProvider } from './providers/AttendeeProvider'
import { DrinkProvider } from './providers/DrinkProvider'

class App extends React.Component {
  constructor(props) {
    super(props)
    const loginInfo = JSON.parse(localStorage.getItem('loginInfo'))
    this.state = {
      token: loginInfo ? loginInfo.token : null,
      userId: loginInfo ? loginInfo.token : null,
    }
  }

  login = (token, userId, tokenExpiration) => {
    this.setState({ token: token, userId: userId })
    localStorage.setItem(
      'loginInfo',
      JSON.stringify({ token: token, userId: userId })
    )
  }

  logout = () => {
    this.setState({ token: null, userId: null })
    localStorage.removeItem('loginInfo')
  }

  render() {
    return (
      <BrowserRouter>
        <>
          <AuthContext.Provider
            value={{
              token: this.state.token,
              userId: this.state.userId,
              login: this.login,
              logout: this.logout,
            }}
          >
            <AttendeeProvider>
              <DrinkProvider>
                <MainNavigation />
                <main className="main-content">
                  <Switch>
                    {this.state.token && (
                      <Redirect from="/" to="/attendees" exact />
                    )}
                    {this.state.token && (
                      <Redirect from="/auth" to="/attendees" exact />
                    )}
                    {!this.state.token && (
                      <Route path="/auth" component={AuthPage} />
                    )}
                    {this.state.token && (
                      <Route path="/attendees" component={AttendeesPage} />
                    )}
                    {this.state.token && (
                      <Route path="/datalist" component={DataListPage} />
                    )}
                    {this.state.token && (
                      <Route path="/settings" component={SettingPage} />
                    )}
                    {/* delete this after and uncomment the above */}
                    {/* <Route path="/attendees" component={AttendeesPage} /> */}
                    {!this.state.token && <Redirect to="/auth" exact />}
                  </Switch>
                </main>
              </DrinkProvider>
            </AttendeeProvider>
          </AuthContext.Provider>
        </>
      </BrowserRouter>
    )
  }
}

export default App
