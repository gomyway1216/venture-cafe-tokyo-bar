import React, { useState, createContext, useEffect } from 'react'
import * as UserApi from '../api/user/user'
import * as AttendeeApi from '../api/user/attendee'

import { useApi } from '../hooks/useApi'
export const AttendeeContext = createContext({})

export const AttendeeProvider = ({ children }) => {
  const [attendeeList, setAttendeeList] = useState(null)
  const [filterValue, setFilterValue] = useState('')

  // pair of callback and response. When callback(makeFetch) is called,
  // useApi custom hook will return the new response and appropriate useEffect fires

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

  const handleScan = async userID => {
    if (userID) {
      const attendeeExists = attendeeList.some(
        element => element.userID === userID
      )

      // need to gain the eventID from localStorage
      const eventID = 'it is temporary eventID'
      // check if the current user exist in the frontend, otherwise do api call
      if (!attendeeExists) {
        await checkInUser.makeFetch({ userID, eventID })
        await getAttendeeList.makeFetch()
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
