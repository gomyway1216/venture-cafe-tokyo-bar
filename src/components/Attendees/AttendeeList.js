import React from 'react'
import AttendeeItem from './AttendeeItem/AttendeeItem'
import styles from './attendee-list.module.css'

const AttendeeList = props => {
  return (
    <div className={styles.gridContainer}>
      <div>User ID</div>
      <div>First Name</div>
      <div>Last Name</div>
      <div>Drink Count</div>
      <div>Buttons</div>
      <div>Confirm</div>
      {props.attendees.map(attendee => {
        return (
          <AttendeeItem
            key={attendee.id}
            id={attendee.attendeeId}
            firstName={attendee.firstName}
            lastName={attendee.lastName}
            drinkCounter={attendee.drinks.length}
            selectDrink={props.selectDrink}
            drinks={props.drinks}
          />
        )
      })}
    </div>
  )
}

export default AttendeeList
