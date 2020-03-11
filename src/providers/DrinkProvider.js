import React, { useState, createContext, useEffect } from 'react'
import * as DrinkApi from '../api/drink'
import { useApi } from '../hooks/useApi'

export const DrinkContext = createContext({})

export const DrinkProvider = ({ children }) => {
  const [currentDrinkList, setCurrentDrinkList] = useState([])

  // get all the possible drink list
  const {
    isFetching: isFetchingDrinkList,
    response: drinkList,
    makeFetch: fetchDrinkList,
  } = useApi(DrinkApi.getDrinkList, res => res.data.drinks)

  // delete all drinks
  // I don't think the backend returns anything
  // but it it needs to make sure the data is correctly removed before changing the frontend
  const {
    isFetching: isDeletingAllCurrentDrinks,
    response: deleteAllCurrentDrinksResponse,
    makeFetch: deleteAllCurrentDrinks,
  } = useApi(DrinkApi.deleteAllCurrentDrinks)

  // get all the drink type
  const {
    isFetching: isFetchingDrinkTypes,
    response: drinkTypes,
    makeFetch: fetchDrinkTypes,
  } = useApi(DrinkApi.getDrinkTypes, res => res.data.drinkTypes)

  const {
    isFetching: isFetchingCurrentDrinkList,
    // error: fetchingDrinkListError,
    response: currentDrinkListResponse,
    makeFetch: fetchCurrentDrinkList,
  } = useApi(DrinkApi.getCurrentDrinkList)

  // for all current drinks
  useEffect(() => {
    if (!currentDrinkListResponse) {
      return
    }
    // currentDrinks is the api response. I need to modify backend
    const { currentDrinks } = currentDrinkListResponse.data
    setCurrentDrinkList(currentDrinks)
  }, [currentDrinkListResponse])

  useEffect(() => {
    if (!deleteAllCurrentDrinksResponse) {
      return
    }

    fetchCurrentDrinkList()
  }, [deleteAllCurrentDrinksResponse])

  // fetch the data when rendering
  useEffect(() => {
    fetchDrinkList()
    fetchDrinkTypes()
    fetchCurrentDrinkList()
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
        fetchCurrentDrinkList,
        currentDrinkList,
        isFetchingCurrentDrinkList,
        // error,
      }}
    >
      {children}
    </DrinkContext.Provider>
  )
}
