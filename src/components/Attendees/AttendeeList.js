import React from 'react'
import AttendeeItem from './AttendeeItem/AttendeeItem'
import styles from './attendee-list.module.css'

const AttendeeList = props => {
  const attendees = props.attendees.map(attendee => {
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
  })

  return (
    <div className={styles.attendeeList}>
      <div className={styles.description}>
        <span className={styles.descriptionTitle}>User ID</span>
        <span className={styles.descriptionTitle}>First Name</span>
        <span className={styles.descriptionTitle}>Last Name</span>
        <span className={styles.descriptionTitle}>Drink Count</span>
      </div>
      <ul>{attendees}</ul>
    </div>
  )
}

export default AttendeeList
