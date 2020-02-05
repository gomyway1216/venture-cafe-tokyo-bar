import React, { useState } from 'react'
import styles from './attendee-item.module.css'
import Button from '@material-ui/core/Button'
import DrinkList from '../../Drinks/DrinkList'

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

  console.log('props.drinkCounter', props.drinkCounter)

  return (
    <div key={props.id} className={styles.itemWrapper}>
      {/* <div className={styles.item}>{props.name}</div> */}
      <div className={styles.attendeeInfo}>
        <div className={styles.item}>{props.id}</div>
        <div className={styles.item}>{props.firstName}</div>
        <div className={styles.item}>{props.lastName}</div>
        <div className={styles.item}>{props.drinkCounter}</div>
      </div>
      <div className={styles.buttons}>
        {props.drinks.map(drink => (
          <Button variant="contained" id={drink.id} onClick={handleSelectDrink}>
            {drink.name}
          </Button>
        ))}
        <Button
          variant="contained"
          color="primary"
          id={props.id}
          disabled={selectedDrinkId === ''}
          onClick={handleSubmitDrink}
        >
          Add!
        </Button>
      </div>
    </div>
  )
}

export default EventItem
