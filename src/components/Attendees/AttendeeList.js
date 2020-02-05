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
    <div className={styles.gridContainer}>
      {/* <div className={styles.description}> */}
      <div>User ID</div>
      <div>First Name</div>
      <div>Last Name</div>
      <div>Drink Count</div>
      <div>Buttons</div>
      <div>Confirm</div>
      {/* </div> */}
      {props.attendees.map(attendee => {
        return (
          // <>
          //   {/* <div>name</div>
          //   <div>first name</div>
          //   <div>last name</div>
          //   <div> drink name</div> */}
          // </>
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
      {/* <ul>{attendees}</ul> */}
    </div>
  )
}

export default AttendeeList
