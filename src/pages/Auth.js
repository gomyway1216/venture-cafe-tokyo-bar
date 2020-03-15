import React from 'react'
import './Auth.css'
import AuthContext from '../context/auth-context'
import moment from 'moment'

class AuthPage extends React.Component {
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
    const email = this.state.email
    const password = this.state.password

    if (email.trim().length === 0 || password.trim().length === 0) {
      return
    }

    let requestBody = {
      query: `
          mutation LogInAdminUser($email: String!, $password: String!, $date: String!) {
            logInAdminUser(logInAdminUserInput: {
              email: $email, password: $password, date: $date
            }) {
                  userID
                  token
                  tokenExpiration
              }
          }
        `,
      variables: {
        email: email,
        password: password,
        date: moment().format(),
      },
    }

    // this way of admin login should be modified.
    // if (!this.state.isLogin) {
    //   requestBody = {
    //     query: `
    //         mutation CreateAdminUser($email: String!, $password: String!) {
    //           createAdminUser(userInput: {email: $email, password: $password}) {
    //                 _id
    //                 email
    //             }
    //         }
    //       `,
    //     variables: {
    //       email: email,
    //       password: password,
    //     },
    //   }
    // }

    fetch(`${process.env.REACT_APP_URL}graphql`, {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!')
        }
        return res.json()
      })
      .then(resData => {
        const { token, userID, tokenExpiration } = resData.data.logInAdminUser
        if (token) {
          this.context.login(token, userID, tokenExpiration)
        }
      })
      .catch(err => {
        console.log(err)
      })
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
          <button type="submit">Log In</button>
          {/* <button type="button" onClick={this.switchModeHandler}>
            Switch to {this.state.isLogin ? 'Signup' : 'Login'}
          </button> */}
        </div>
      </form>
    )
  }
}

export default AuthPage
