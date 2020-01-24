import React, { Component } from 'react'
import './Auth.css'
import AuthContext from '../context/auth-context'

class AuthPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLogin: true,
      email: '',
      password: '',
    }
  }

  static contextType = AuthContext

  switchModeHandler = () => {
    this.setState(prevState => {
      return { isLogin: !prevState.isLogin }
    })
  }

  submitHandler = event => {
    event.preventDefault()
  }

  onInputChangeHandler = event => {
    this.setState({
      [event.target.id]: event.target.value,
    })
  }

  render() {
    return (
      <form className="auth-form" onSubmit={this.submitHandler}>
        <div className="form-control">
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={this.state.email}
            onChange={this.onInputChangeHandler}
          />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={this.state.password}
            onChange={this.onInputChangeHandler}
          />
        </div>
        <div className="form-actions">
          <button type="submit">Submit</button>
          <button type="button" onClick={this.switchModeHandler}>
            Switch to {this.state.isLogin ? 'Signup' : 'Login'}
          </button>
        </div>
      </form>
    )
  }
}

export default AuthPage
