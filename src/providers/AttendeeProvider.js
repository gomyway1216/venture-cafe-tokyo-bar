import React, { useState, createContext, useEffect } from 'react'
// import { fetchSignedInAttendees, updateAttendeeDrink } from '../api/attendee'
import * as AttendeeApi from '../api/attendee'
import * as DrinkApi from '../api/drink'

import { useApi } from '../hooks/useApi'
export const AttendeeContext = createContext({})

export const AttendeeProvider = ({ children }) => {
  const [attendees, setAttendees] = useState([])
  // const [currentDrinks, setCurrentDrinks] = useState([])
  const [filterValue, setFilterValue] = useState('')

  // pair of callback and response. When callback(makeFetch) is called,
  // useApi custom hook will return the new response and appropriate useEffect fires
  // why the first one is different?
  const {
    isFetching: isFetchingAttendees,
    error: fetchingAttendeesError,
    response: attendeesResData,
    makeFetch: fetchAttendees,
  } = useApi(AttendeeApi.fetchSignedInAttendees)

  const {
    isFetching: isUpdatingAttendee,
    // error: updatingAttendeeError,
    response: updateAttendeeDrinkResponse,
    makeFetch: updateAttendeeDrink,
  } = useApi(AttendeeApi.updateAttendeeDrink)

  // const {
  //   isFetching: isFetchingDrinks,
  //   // error: fetchingDrinkListError,
  //   response: currentDrinksResponse,
  //   makeFetch: fetchCurrentDrinks,
  // } = useApi(DrinkApi.getCurrentDrinkList)

  const {
    isFetching: isDeletingAllCurrentAttendees,
    response: deleteAllCurrentAttendeesResponse,
    makeFetch: deleteAllCurrentAttendees,
  } = useApi(AttendeeApi.deleteAllCurrentAttendees)

  const updateSingleAttendee = data => {
    const updatedAttendees = attendees.map(attendee =>
      attendee.attendeeId === data.attendeeId
        ? { ...attendee, drinks: data.drinks }
        : attendee
    )
    setAttendees(updatedAttendees)
  }

  const handleScan = async attendeeId => {
    if (attendeeId) {
      const attendeeExists = attendees.some(
        element => element.attendeeId === attendeeId
      )
      // check if the current user exist in the frontend, otherwise do api call
      if (!attendeeExists) {
        await AttendeeApi.onSignIn(attendeeId)
        await fetchAttendees()
      }
      setFilterValue(attendeeId)
    }
  }

  useEffect(() => {
    if (!attendeesResData) {
      return
    }
    const { currentAttendees } = attendeesResData.data
    setAttendees(currentAttendees)
  }, [attendeesResData])

  useEffect(() => {
    if (!updateAttendeeDrinkResponse) {
      return
    }
    console.log('updateAttendeeDrinkResponse: ', updateAttendeeDrinkResponse)
    const currentAttendee =
      updateAttendeeDrinkResponse.data.updateAttendeeDrinks
    updateSingleAttendee(currentAttendee)
    // when individual attendee's drink gets updated, this updates the current drink list
    // fetchCurrentDrinks()
  }, [updateAttendeeDrinkResponse])

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
    fetchAttendees()
    // fetchCurrentDrinks()
  }, [])

  return (
    <AttendeeContext.Provider
      value={{
        fetchAttendees,
        filterValue,
        setFilterValue,
        attendees,
        isFetchingAttendees,
        error: fetchingAttendeesError,
        handleScan,
        selectDrink: updateAttendeeDrink,
        isUpdatingAttendee,
        deleteAllCurrentAttendees,
      }}
    >
      {children}
    </AttendeeContext.Provider>
  )
}
