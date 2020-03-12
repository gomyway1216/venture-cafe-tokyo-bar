import React, { useState, createContext, useEffect } from 'react'
import * as EventApi from '../api/event/event'
import * as EventTypeApi from '../api/event/eventType'
import { useApi } from '../hooks/useApi'

export const EventContext = createContext({})

export const EventProvider = ({ children }) => {
  return <EventContext.Provider></EventContext.Provider>
}