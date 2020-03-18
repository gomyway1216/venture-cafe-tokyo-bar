import React, { useState, createContext, useEffect } from 'react'
import * as EventApi from '../api/event/event'
import * as EventTypeApi from '../api/event/eventType'
import { useApi } from '../hooks/useApi'

export const EventContext = createContext({})

export const EventProvider = ({ children }) => {
  const getEventTypeList = useApi(
    EventTypeApi.getEventTypeList,
    res => res.data.getEventTypeList
  )

  const getEventList = useApi(
    EventApi.getEventList,
    res => res.data.getEventList
  )

  const getEvent = useApi(EventApi.getEvent, res => res.data.getEvent)

  // useEffect(() => {
  //   console.log('this use effect is called')
  //   getEventTypeList.makeFetch()
  // }, [])

  console.log('hello')

  return (
    <EventContext.Provider value={{ getEventTypeList, getEventList, getEvent }}>
      {children}
    </EventContext.Provider>
  )
}
