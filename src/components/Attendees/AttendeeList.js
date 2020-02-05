import React from 'react'
import AttendeeItem from './AttendeeItem/AttendeeItem'
import styles from './attendee-list.module.css'

const AttendeeList = props => {
  const attendees = props.attendees.map(attendee => {
    console.log('attendee', attendee)
    return (
      <AttendeeItem
        key={attendee.id}
        id={attendee.attendeeId}
        firstName={attendee.firstName}
        lastName={attendee.lastName}
        drinkCounter={attendee.drinks.length}
        // increaseCount={props.increaseCount}
        // decreaseCount={props.decreaseCount}
        selectDrink={props.selectDrink}
        drinks={props.drinks}
      />
    )
  })

  return <ul className={styles.attendeeList}>{attendees}</ul>
}

export default AttendeeList
