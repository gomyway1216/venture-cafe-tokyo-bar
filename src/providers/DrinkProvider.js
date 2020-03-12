import React, { useState, createContext, useEffect } from 'react'
import * as AvailableDrinkApi from '../api/drink/availableDrink'
import * as DrinkTypeApi from '../api/drink/drinkType'
import * as RegisteredDrinkApi from '../api/drink/registeredDrink'
import { useApi } from '../hooks/useApi'

export const DrinkContext = createContext({})

export const DrinkProvider = ({ children }) => {
  // const [availableDrinkList, setAvailableDrinkList] = useState([])

  // get available drink list
  const getAvailableDrinkList = useApi(
    AvailableDrinkApi.getAvailableDrinkList,
    res => res.data.getAvailableDrinkList
  )

  // const {
  //   isFetching: isGettingAvailableDrinkList,
  //   error: gettingAvailableDrinkListError,
  //   response: getAvailableDrinkListResponse,
  //   makeFetch: getAvailableDrinkList,
  // } = availableDrinkList

  const deleteAvailableDrinks = useApi(
    AvailableDrinkApi.deleteAvailableDrinks,
    res => res.data.deleteAvailableDrinks
  )

  // get all the drink type
  const getDrinkTypeList = useApi(
    DrinkTypeApi.getDrinkTypeList,
    res => res.data.getDrinkTypeList
  )

  // get registered drink list
  const getRegisteredDrinkList = useApi(
    RegisteredDrinkApi.getRegisteredDrinkList
  )

  useEffect(() => {
    if (!deleteAvailableDrinks.response) {
      return
    }

    getAvailableDrinkList.makeFetch()
  }, [deleteAvailableDrinks.response])

  // fetch the data when rendering
  useEffect(() => {
    getRegisteredDrinkList.makeFetch()
    getDrinkTypeList.makeFetch()
    getAvailableDrinkList.makeFetch()
  }, [])

  return (
    <DrinkContext.Provider
      value={{
        getAvailableDrinkList,
        deleteAvailableDrinks,
        getDrinkTypeList,
        getRegisteredDrinkList,
      }}
    >
      {children}
    </DrinkContext.Provider>
  )
}
