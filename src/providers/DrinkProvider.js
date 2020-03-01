import React, { useState, createContext, useEffect } from 'react'
import * as DrinkApi from '../api/drink'
import { useApi } from '../hooks/useApi'

export const DrinkContext = createContext({})

export const DrinkProvider = ({ children }) => {
  const [drinkList, setDrinkList] = useState(null)

  const {
    isFetching: isFetchingDrinkList,
    response: drinkListResponse,
    makeFetch: fetchDrinkList,
  } = useApi(DrinkApi.getDrinkList)

  // I don't think the backend returns anything
  const {
    isFetching: isDeletingCurrentDrinks,
    response: deletingCurrentDrinksResponse,
    makeFetch: deleteCurrentDrinks,
  } = useApi(DrinkApi.deleteAllCurrentDrinks)

  useEffect(() => {
    if (!drinkListResponse) {
      return
    }

    const { drinks } = drinkListResponse.data
    setDrinkList(drinks)
  }, [drinkListResponse])

  useEffect(() => {
    fetchDrinkList()
  }, [])

  return (
    <DrinkContext.Provider
      value={{
        fetchDrinkList,
        drinkList,
        isFetchingDrinkList,
        deleteCurrentDrinks,
        // error,
      }}
    >
      {children}
    </DrinkContext.Provider>
  )
}
