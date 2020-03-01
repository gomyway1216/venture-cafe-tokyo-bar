import React, { useState, createContext } from 'react'
import { doFetch } from '../api/doFetch'

export const DrinkListContext = createContext({})

const requestBody = {
  query: `
      query {
        drinks {
              id: _id
              name
              drinkType {
                id: _id
                name
              }
          }
      }
    `,
}

export const DrinkListProvider = ({ children }) => {
  const [drinkList, setDrinkList] = useState(null)
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState(null)

  const fetchDrinkList = async () => {
    try {
      setIsFetching(true)
      const resData = await doFetch(requestBody)
      const { drinks } = resData.data
      setDrinkList(drinks)
      setIsFetching(false)
    } catch (err) {
      setError(err)
    }
  }

  return (
    <DrinkListContext.Provider
      value={{
        fetchDrinkList,
        drinkList,
        isFetching,
        error,
      }}
    >
      {children}
    </DrinkListContext.Provider>
  )
}
