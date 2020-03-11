import React, { useState, createContext, useEffect } from 'react'
// import { fetchSignedInAttendees, updateAttendeeDrink } from '../api/attendee'
// import * as AttendeeApi from '../api/attendee'
import * as UserApi from '../api/user/user'
import * as AttendeeApi from '../api/user/attendee'
import * as DrinkApi from '../api/drink'

import { useApi } from '../hooks/useApi'
export const AttendeeContext = createContext({})

export const AttendeeProvider = ({ children }) => {
  const [attendeeList, setAttendeeList] = useState([])
  // const [currentDrinks, setCurrentDrinks] = useState([])
  const [filterValue, setFilterValue] = useState('')

  // pair of callback and response. When callback(makeFetch) is called,
  // useApi custom hook will return the new response and appropriate useEffect fires
  // why the first one is different?
  const {
    isFetching: isGettingAttendeeList,
    error: gettingAttendeeListError,
    response: attendeeListResponse,
    makeFetch: getAttendeeList,
  } = useApi(AttendeeApi.getAttendeeList)

  const {
    isFetching: isUpdatingAttendeeDrinkList,
    error: updatingAttendeeDrinkListError,
    response: updateAttendeeDrinkListResponse,
    makeFetch: updateAttendeeDrinkList,
  } = useApi(AttendeeApi.updateAttendeeDrinkList)

  // const {
  //   isFetching: isFetchingDrinks,
  //   // error: fetchingDrinkListError,
  //   response: currentDrinksResponse,
  //   makeFetch: fetchCurrentDrinks,
  // } = useApi(DrinkApi.getCurrentDrinkList)

  const {
    isFetching: isDeletingAttendees,
    error: deletingAttendeesError,
    response: deleteAttendeesResponse,
    makeFetch: deleteAttendees,
  } = useApi(AttendeeApi.deleteAttendees)

  const updateSingleAttendee = data => {
    const updatedAttendeeList = attendeeList.map(attendee =>
      attendee.id === data.id
        ? { ...attendee, drinkList: data.drinkList }
        : attendee
    )
    setAttendeeList(updatedAttendeeList)
  }

  const handleScan = async userID => {
    if (userID) {
      const attendeeExists = attendeeList.some(
        element => element.userID === userID
      )
      // check if the current user exist in the frontend, otherwise do api call
      if (!attendeeExists) {
        await AttendeeApi.checkInUser(userID)
        await getAttendeeList()
      }
      setFilterValue(userID)
    }
  }

  useEffect(() => {
    if (!attendeeListResponse) {
      return
    }
    const { getAttendeeList } = attendeeListResponse.data
    setAttendeeList(getAttendeeList)
  }, [attendeeListResponse])

  useEffect(() => {
    if (!updateAttendeeDrinkListResponse) {
      return
    }
    console.log(
      'updateAttendeeDrinkListResponse: ',
      updateAttendeeDrinkListResponse
    )
    const { updateAttendeeDrinkList } = updateAttendeeDrinkListResponse.data
    updateSingleAttendee(updateAttendeeDrinkList)
    // when individual attendee's drink gets updated, this updates the current drink list
    // fetchCurrentDrinks()
  }, [updateAttendeeDrinkListResponse])

  // useEffect(() => {
  //   if (!currentDrinksResponse) {
  //     return
  //   }
  //   const { currentDrinks } = currentDrinksResponse.data
  //   setCurrentDrinks(currentDrinks)
  // }, [currentDrinksResponse])

  // this is called once
  // so when the drink count of each person gets updated, this useEffect fires and
  // update
  useEffect(() => {
    // it is inefficient that fetchAttendees is called many times, even updating just single person
    getAttendeeList()
    // fetchCurrentDrinks()
  }, [])

  return (
    <AttendeeContext.Provider
      value={{
        getAttendeeList,
        filterValue,
        setFilterValue,
        attendeeList,
        isGettingAttendeeList,
        error: gettingAttendeeListError,
        handleScan,
        selectDrink: updateAttendeeDrinkList,
        isUpdatingAttendeeDrinkList,
        deleteAttendees,
      }}
    >
      {children}
    </AttendeeContext.Provider>
  )
}
