import React, { useState, createContext, useEffect } from 'react'
// import { fetchSignedInAttendees, updateAttendeeDrink } from '../api/attendee'
import * as AttendeeApi from '../api/attendee'
import * as DrinkApi from '../api/drink'

import { useApi } from '../hooks/useApi'
export const AttendeeContext = createContext({})

export const AttendeeProvider = ({ children }) => {
  const [attendees, setAttendees] = useState([])
  const [currentDrinks, setCurrentDrinks] = useState([])
  const [filterValue, setFilterValue] = useState('')

  const {
    isFetchingAttendees,
    error,
    response: attendeesResData,
    makeFetch: fetchAttendees,
  } = useApi(AttendeeApi.fetchSignedInAttendees)
  const {
    isFetching: isUpdatingAttendee,
    // error: updatingAttendeeError,
    response: updateAttendeeDrinkResponse,
    makeFetch: updateAttendeeDrink,
  } = useApi(AttendeeApi.updateAttendeeDrink)
  const {
    isFetching: isFetchingDrinks,
    // error: fetchingDrinkListError,
    response: currentDrinksResponse,
    makeFetch: fetchCurrentDrinks,
  } = useApi(DrinkApi.getCurrentDrinkList)

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
    const currentAttendee =
      updateAttendeeDrinkResponse.data.updateAttendeeDrinks
    updateSingleAttendee(currentAttendee)
    fetchCurrentDrinks()
  }, [updateAttendeeDrinkResponse])

  useEffect(() => {
    if (!currentDrinksResponse) {
      return
    }
    const { currentDrinks } = currentDrinksResponse.data
    setCurrentDrinks(currentDrinks)
  }, [currentDrinksResponse])

  useEffect(() => {
    fetchAttendees()
    fetchCurrentDrinks()
  }, [])

  const isLoading =
    isFetchingAttendees || isUpdatingAttendee || isFetchingDrinks
  return (
    <AttendeeContext.Provider
      value={{
        fetchAttendees,
        filterValue,
        setFilterValue,
        attendees,
        isFetchingAttendees,
        isLoading,
        error,
        handleScan,
        selectDrink: updateAttendeeDrink,
        currentDrinks,
        fetchCurrentDrinks,
      }}
    >
      {children}
    </AttendeeContext.Provider>
  )
}
