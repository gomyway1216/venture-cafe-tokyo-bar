import React, { useState, createContext } from 'react'
import { doFetch } from './apiCall'

export const CurrentDrinksContext = createContext({})

const requestBody = {
  query: `
      query {
        currentDrinks {
              id: _id
              drinkId
              name
              drinkType {
                id: _id
                name
              }
              count
          }
      }
    `,
}

export const CurrentDrinksProvider = ({ children }) => {
  const [currentDrinks, setCurrentDrinks] = useState(null)
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState(null)

  const fetchCurrentDrinks = async () => {
    try {
      setIsFetching(true)
      const resData = await doFetch(requestBody)
      const { currentDrinks } = resData.resData
      setCurrentDrinks(currentDrinks)
      setIsFetching(false)
    } catch (err) {
      setError(err)
    }
  }

  return (
    <CurrentDrinksContext.Provider
      value={{
        fetchCurrentDrinks,
        currentDrinks,
        isFetching,
        error,
      }}
    >
      {children}
    </CurrentDrinksContext.Provider>
  )
}
