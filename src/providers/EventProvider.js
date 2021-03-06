import React, { useState, createContext } from 'react'
import * as EventApi from '../api/event/event'
import * as EventTypeApi from '../api/event/eventType'
import { useApi } from '../hooks/useApi'

export const EventContext = createContext({})

export const EventProvider = ({ children }) => {
  const [eventID, setEventID] = useState('')
  const getEventTypeList = useApi(
    EventTypeApi.getEventTypeList,
    res => res.data.getEventTypeList
  )

  const getEventList = useApi(
    EventApi.getEventList,
    res => res.data.getEventList
  )

  const addEvent = useApi(EventApi.addEvent, res => res.data.addEvent)

  const getEvent = useApi(EventApi.getEvent, res => res.data.getEvent)

  return (
    <EventContext.Provider
      value={{
        getEventTypeList,
        getEventList,
        getEvent,
        addEvent,
        eventID,
        setEventID,
      }}
    >
      {children}
    </EventContext.Provider>
  )
}
