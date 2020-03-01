import React, { useState, createContext, useEffect } from 'react'
import * as DrinkApi from '../api/drink'
import { useApi } from '../hooks/useApi'

export const DrinkContext = createContext({})

export const DrinkProvider = ({ children }) => {
  const [drinkList, setDrinkList] = useState(null)
  const [drinkTypes, setDrinkTypes] = useState(null)

  const {
    isFetching: isFetchingDrinkList,
    response: drinkListResponse,
    makeFetch: fetchDrinkList,
  } = useApi(DrinkApi.getDrinkList)

  // I don't think the backend returns anything
  // but it it needs to make sure the data is correctly removed before changing the frontend
  const {
    isFetching: isDeletingAllCurrentDrinks,
    response: deletingAllCurrentDrinksResponse,
    makeFetch: deleteAllCurrentDrinks,
  } = useApi(DrinkApi.deleteAllCurrentDrinks)

  const {
    isFetching: isFetchingDrinkTypes,
    response: drinkTypesResponse,
    makeFetch: fetchDrinkTypes,
  } = useApi(DrinkApi.getDrinkTypes)

  useEffect(() => {
    if (!drinkListResponse) {
      return
    }

    const { drinks } = drinkListResponse.data
    setDrinkList(drinks)
  }, [drinkListResponse])

  useEffect(() => {
    if (!drinkTypesResponse) {
      return
    }

    const { drinkTypes } = drinkTypesResponse.data
    setDrinkTypes(drinkTypes)
  }, [drinkTypesResponse])

  // fetch the data when rendering
  useEffect(() => {
    fetchDrinkList()
    fetchDrinkTypes()
  }, [])

  return (
    <DrinkContext.Provider
      value={{
        fetchDrinkList,
        drinkList,
        isFetchingDrinkList,
        deleteAllCurrentDrinks,
        drinkTypes,
        isFetchingDrinkTypes,
        fetchDrinkTypes,
        // error,
      }}
    >
      {children}
    </DrinkContext.Provider>
  )
}
