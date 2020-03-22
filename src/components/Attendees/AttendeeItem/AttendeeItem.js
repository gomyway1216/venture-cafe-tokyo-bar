import React, { useState, useContext } from 'react'
import styles from './attendee-item.module.css'
import Button from '@material-ui/core/Button'
import { DrinkContext } from '../../../providers/DrinkProvider'
import Spinner from '../../Spinner/Spinner'

const AttendeeItem = props => {
  const [selectedDrinkId, setSelectedDrinkId] = useState('')
  const { getAvailableDrinkList } = useContext(DrinkContext)

  const handleSelectDrink = event => {
    setSelectedDrinkId(event.currentTarget.id)
  }

  const handleSubmitDrink = event => {
    if (selectedDrinkId !== '') {
      // pair of the attendee and the drink id the user choose
      props.selectDrink({
        id: props.id,
        availableDrinkID: selectedDrinkId,
      })
    }
  }

  const isLoading =
    getAvailableDrinkList.isFetching || !getAvailableDrinkList.response
  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <span className={styles.item}>{props.userID}</span>
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
        {getAvailableDrinkList.response.map(drink => (
          <Button
            key={drink.id}
            variant="contained"
            id={drink.id}
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
        className={styles.item}
      >
        Add!
      </Button>
    </>
  )
}

export default AttendeeItem
