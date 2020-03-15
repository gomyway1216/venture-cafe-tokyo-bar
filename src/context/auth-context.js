import React, { useState, createContext, useEffect } from 'react'

// export default React.createContext({
//   token: null,
//   userId: null,
//   login: (token, userId, tokenExpiration) => {},
//   logout: () => {},
// })

import { useApi } from '../hooks/useApi'

const defaultLoginInfo = {
  token: null,
  userId: null,
  tokenExpiration: null,
}

const AuthContext = createContext(defaultLoginInfo)

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

export default AuthContext
