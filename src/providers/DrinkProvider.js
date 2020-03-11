import React, { useState, createContext, useEffect } from 'react'
import * as AvailableDrinkApi from '../api/drink/availableDrink'
import * as DrinkTypeApi from '../api/drink/drinkType'
import * as RegisteredDrinkApi from '../api/drink/registeredDrink'
import { useApi } from '../hooks/useApi'

export const DrinkContext = createContext({})

export const DrinkProvider = ({ children }) => {
  const [availableDrinkList, setAvailableDrinkList] = useState([])

  // get available drink list
  const {
    isFetching: isGettingAvailableDrinkList,
    error: gettingAvailableDrinkListError,
    response: getAvailableDrinkListResponse,
    makeFetch: getAvailableDrinkList,
  } = useApi(
    AvailableDrinkApi.getAvailableDrinkList,
    res => res.data.getAvailableDrinkList
  )

  const {
    isFetching: isDeletingAvailableDrinks,
    error: deletingAvailableDrinksError,
    response: deleteAvailableDrinksResponse,
    makeFetch: deleteAvailableDrinks,
  } = useApi(
    AvailableDrinkApi.deleteAvailableDrinks,
    res => res.data.deleteAvailableDrinks
  )

  // get all the drink type
  const {
    isFetching: isGettingDrinkTypeList,
    error: gettingDrinkTypeListError,
    response: getDrinkTypeListResponse,
    makeFetch: getDrinkTypeList,
  } = useApi(DrinkTypeApi.getDrinkTypeList, res => res.data.getDrinkTypeList)

  // get registered drink list
  const {
    isFetching: isGettingRegisteredDrinkList,
    error: gettingRegisteredDrinkListError,
    response: getRegisteredDrinkListResponse,
    makeFetch: getRegisteredDrinkList,
  } = useApi(RegisteredDrinkApi.getRegisteredDrinkList)

  // for available drink list
  useEffect(() => {
    if (!getAvailableDrinkListResponse) {
      return
    }
    // currentDrinks is the api response. I need to modify backend
    setAvailableDrinkList(getAvailableDrinkListResponse)
  }, [getAvailableDrinkListResponse])

  useEffect(() => {
    if (!deleteAvailableDrinksResponse) {
      return
    }

    getAvailableDrinkList()
  }, [deleteAvailableDrinksResponse])

  // fetch the data when rendering
  useEffect(() => {
    getRegisteredDrinkList()
    getDrinkTypeList()
    getAvailableDrinkList()
  }, [])

  return (
    <DrinkContext.Provider
      value={{
        getRegisteredDrinkList,
        getRegisteredDrinkListResponse,
        isGettingRegisteredDrinkList,

        getDrinkTypeListResponse,
        isGettingDrinkTypeList,
        getDrinkTypeList,

        getAvailableDrinkList,
        availableDrinkList,
        isGettingAvailableDrinkList,
        deleteAvailableDrinks,
        // error,
      }}
    >
      {children}
    </DrinkContext.Provider>
  )
}
