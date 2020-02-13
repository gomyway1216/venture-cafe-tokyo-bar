import React from 'react'
import AttendeeItem from './AttendeeItem/AttendeeItem'
import styles from './attendee-list.module.css'

const AttendeeList = props => {
  return (
    <div className={styles.gridContainer}>
      <div className={styles.item}>User ID</div>
      <div className={styles.item}>First Name</div>
      <div className={styles.item}>Last Name</div>
      <div className={styles.item}>Drink Count</div>
      <div className={styles.item}>Buttons</div>
      <div className={styles.item}>Confirm</div>
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
