import React from 'react'
import AttendeeItem from './AttendeeItem/AttendeeItem'
import styles from './attendee-list.module.css'

const AttendeeList = props => {
  const attendees = props.attendees.map(attendee => {
    return (
      <AttendeeItem
        key={attendee.id}
        id={attendee.id}
        firstName={attendee.firstName}
        lastName={attendee.lastName}
        drinkCounter={attendee.drinkCounter}
        increaseCount={props.increaseCount}
        decreaseCount={props.decreaseCount}
      />
    )
  })

  return <ul className={styles.attendeeList}>{attendees}</ul>
}

export default AttendeeList
