import React, { useState, createContext } from 'react'

const defaultLoginInfo = {
  token: null,
  userId: null,
  tokenExpiration: null,
}

export const AuthContext = createContext(defaultLoginInfo)

// log in info also should be stored because the child components
// don't listen to the changes in the localStorage
export const AuthProvider = ({ children }) => {
  const [loginInfo, setLoginInfo] = useState(
    JSON.parse(localStorage.getItem('loginInfo')) || defaultLoginInfo
  )

  const login = (token, userId, tokenExpiration) => {
    // needs to be this order setItem -> setLoginInfo
    localStorage.setItem(
      'loginInfo',
      JSON.stringify({ token, userId, tokenExpiration })
    )
    setLoginInfo({
      token,
      userId,
    })
  }

  const logout = () => {
    setLoginInfo(defaultLoginInfo)
    localStorage.removeItem('loginInfo')
  }

  const { token, userId } = loginInfo

  return (
    <AuthContext.Provider
      value={{
        token,
        userId,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
