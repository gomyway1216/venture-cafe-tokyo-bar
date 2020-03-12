import React, { Component } from 'react'
import Attendees from './Attendees'
import { AttendeeProvider } from '../providers/AttendeeProvider'
import { DrinkProvider } from '../providers/DrinkProvider'

const AttendeeContainer = () => {
  return (
    <AttendeeProvider>
      <DrinkProvider>
        <Attendees />
      </DrinkProvider>
    </AttendeeProvider>
  )
}

export default AttendeeContainer
