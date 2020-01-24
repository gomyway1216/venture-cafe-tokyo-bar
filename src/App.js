import React from 'react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import AuthContext from './context/auth-context'
import MainNavigation from './components/Navigation/MainNavigation'
import AttendeesPage from './pages/Attendees'
import AuthPage from './pages/Auth'
import './App.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      token: null,
      userId: null,
    }
  }

  login = (token, userId, tokenExpiration) => {
    this.setState({ token: token, userId: userId })
  }

  logout = () => {
    this.setState({ token: null, userId: null })
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
                {!this.state.token && <Redirect to="/auth" exact />}
              </Switch>
            </main>
          </AuthContext.Provider>
        </>
      </BrowserRouter>
    )
  }
}

export default App
