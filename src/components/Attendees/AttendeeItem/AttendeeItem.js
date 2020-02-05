import React, { useState } from 'react'
import styles from './attendee-item.module.css'
import Button from '@material-ui/core/Button'

const EventItem = props => {
  const [selectedDrinkId, setSelectedDrinkId] = useState('')

  const handleSelectDrink = event => {
    setSelectedDrinkId(event.currentTarget.id)
  }

  const handleSubmitDrink = event => {
    if (selectedDrinkId !== '') {
      // pair of the attendee and the drink id the user choose
      props.selectDrink(props.id, selectedDrinkId)
    }
  }

  return (
    // <div key={props.id} className={styles.itemWrapper}>
    // <div className={styles.attendeeInfo}>
    <>
      <span className={styles.item}>{props.id}</span>
      <span className={styles.item}>{props.firstName}</span>
      <span className={styles.item}>{props.lastName}</span>
      <span
        className={
          styles.item && props.drinkCounter < 3
            ? styles.drinkCountNormal
            : styles.drinkCountExceed
        }
      >
        {props.drinkCounter}
      </span>
      <div className={styles.buttons}>
        {props.drinks.map(drink => (
          <Button
            variant="contained"
            id={drink.id}
            key={drink.id}
            onClick={handleSelectDrink}
          >
            {drink.name}
          </Button>
        ))}
      </div>
      <Button
        variant="contained"
        color="primary"
        id={props.id}
        disabled={selectedDrinkId === ''}
        onClick={handleSubmitDrink}
      >
        Add!
      </Button>
    </>
  )
}

export default EventItem
