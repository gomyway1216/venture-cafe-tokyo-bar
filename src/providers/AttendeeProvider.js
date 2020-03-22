import React, { useState, createContext, useEffect } from 'react'
import * as AttendeeApi from '../api/user/attendee'
import { useApi } from '../hooks/useApi'
import {
  addRegisteredDrink,
  getRegisteredDrinkList,
} from '../api/drink/registeredDrink'
export const AttendeeContext = createContext({})

export const AttendeeProvider = ({ children }) => {
  const [attendeeList, setAttendeeList] = useState(null)
  const [filterValue, setFilterValue] = useState('')

  const getAttendeeList = useApi(
    AttendeeApi.getAttendeeList,
    res => res.data.getAttendeeList
  )

  const updateAttendeeDrinkList = useApi(
    AttendeeApi.updateAttendeeDrinkList,
    res => res.data.updateAttendeeDrinkList
  )

  const deleteAttendees = useApi(
    AttendeeApi.deleteAttendees,
    res => res.data.deleteAttendees
  )

  const checkInUser = useApi(AttendeeApi.checkInUser)

  const updateDrinkListForSingleAttendee = data => {
    const updatedAttendeeList = attendeeList.map(attendee =>
      attendee.id === data.id
        ? { ...attendee, drinkList: data.drinkList }
        : attendee
    )
    setAttendeeList(updatedAttendeeList)
  }

  const handleScan = async (userID, eventID) => {
    if (userID) {
      const attendeeExists = attendeeList.some(
        element => element.userID === userID
      )

      // check if the current user exist in the frontend, otherwise do api call
      if (!attendeeExists) {
        await checkInUser.makeFetch({
          id: userID,
          eventID,
        })
        await getAttendeeList.makeFetch(eventID)
      }
      setFilterValue(userID)
    }
  }

  useEffect(() => {
    if (!getAttendeeList.response) {
      return
    }
    setAttendeeList(getAttendeeList.response)
  }, [getAttendeeList.response])

  useEffect(() => {
    if (!updateAttendeeDrinkList.response) {
      return
    }
    updateDrinkListForSingleAttendee(updateAttendeeDrinkList.response)
    // when individual attendee's drink gets updated, this updates the current drink list
    // fetchCurrentDrinks()
  }, [updateAttendeeDrinkList.response])

  // when a new registered drink is added in the setting page
  useEffect(() => {
    if (!addRegisteredDrink.response) {
      return
    }

    getRegisteredDrinkList.makeFetch()
  }, [addRegisteredDrink.response])

  return (
    <AttendeeContext.Provider
      value={{
        attendeeList,
        filterValue,
        setFilterValue,
        handleScan,
        getAttendeeList,
        updateAttendeeDrinkList,
        deleteAttendees,
      }}
    >
      {children}
    </AttendeeContext.Provider>
  )
}
