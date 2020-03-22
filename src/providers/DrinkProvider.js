import React, { createContext, useEffect } from 'react'
import * as AvailableDrinkApi from '../api/drink/availableDrink'
import * as DrinkTypeApi from '../api/drink/drinkType'
import * as RegisteredDrinkApi from '../api/drink/registeredDrink'
import * as DrinkHistoryApi from '../api/drink/drinkHistory'

import { useApi } from '../hooks/useApi'

export const DrinkContext = createContext({})

export const DrinkProvider = ({ children }) => {
  // get available drink list
  const getAvailableDrinkList = useApi(
    AvailableDrinkApi.getAvailableDrinkList,
    res => res.data.getAvailableDrinkList
  )

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
    RegisteredDrinkApi.getRegisteredDrinkList,
    res => res.data.getRegisteredDrinkList
  )

  const addDrinkHistoryList = useApi(DrinkHistoryApi.addDrinkHistoryList)

  const addRegisteredDrink = useApi(
    RegisteredDrinkApi.addRegisteredDrink,
    res => res.data.addRegisteredDrink
  )

  const updateAvailableDrinkList = useApi(
    AvailableDrinkApi.updateAvailableDrinkList
  )

  const addDrinkType = useApi(
    DrinkTypeApi.addDrinkType,
    res => res.data.addDrinkType
  )

  // this is not correct
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
  }, [])

  return (
    <DrinkContext.Provider
      value={{
        getAvailableDrinkList,
        deleteAvailableDrinks,
        getDrinkTypeList,
        getRegisteredDrinkList,
        addDrinkHistoryList,
        addRegisteredDrink,
        updateAvailableDrinkList,
        addDrinkType,
      }}
    >
      {children}
    </DrinkContext.Provider>
  )
}
