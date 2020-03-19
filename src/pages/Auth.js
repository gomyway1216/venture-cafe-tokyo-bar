import React, { useState, useContext } from 'react'
import './Auth.css'
import { AuthContext } from '../providers/AuthProvider'
import moment from 'moment'

const defaultInput = {
  email: '',
  password: '',
}

const AuthPage = () => {
  const [input, setInput] = useState(defaultInput)

  const { login } = useContext(AuthContext)

  const submitHandler = event => {
    event.preventDefault()

    if (input.email.trim().length === 0 || input.password.trim().length === 0) {
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
        email: input.email,
        password: input.password,
        date: moment().format(),
      },
    }

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
          login(token, userID, tokenExpiration)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  const onInputChangeHandler = event => {
    setInput({
      ...input,
      [event.target.id]: event.target.value,
    })
  }

  return (
    <form className="auth-form" onSubmit={submitHandler}>
      <div className="form-control">
        <label htmlFor="email">E-Mail</label>
        <input
          type="email"
          id="email"
          value={input.email}
          onChange={onInputChangeHandler}
        />
      </div>
      <div className="form-control">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={input.password}
          onChange={onInputChangeHandler}
        />
      </div>
      <div className="form-actions">
        <button type="submit">Log In</button>
      </div>
    </form>
  )
}

export default AuthPage
