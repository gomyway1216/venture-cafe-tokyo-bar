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

  const getDrinkHistoryList = useApi(
    DrinkHistoryApi.getDrinkHistoryList,
    res => res.data.getDrinkHistoryList
  )

  // fetch the data when rendering
  useEffect(() => {
    getRegisteredDrinkList.makeFetch()
    getDrinkTypeList.makeFetch()
  }, [])

  const deleteAvailableDrinkListForEvent = async eventID => {
    const res = await deleteAvailableDrinks.makeFetch(eventID)

    if (!res.error) {
      getAvailableDrinkList.makeFetch(eventID)
    }
  }

  return (
    <DrinkContext.Provider
      value={{
        getAvailableDrinkList,
        getDrinkTypeList,
        getRegisteredDrinkList,
        addDrinkHistoryList,
        addRegisteredDrink,
        updateAvailableDrinkList,
        addDrinkType,
        deleteAvailableDrinkListForEvent,
        getDrinkHistoryList,
      }}
    >
      {children}
    </DrinkContext.Provider>
  )
}
