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
        console.log('attendee.drinkList', attendee.drinkList)
        return (
          <AttendeeItem
            key={attendee.id}
            id={attendee.id}
            userID={attendee.userID}
            firstName={attendee.firstName}
            lastName={attendee.lastName}
            drinkCounter={attendee.drinkList.length}
            selectDrink={props.selectDrink}
            drinkList={props.drinkList}
          />
        )
      })}
    </div>
  )
}

export default AttendeeList
