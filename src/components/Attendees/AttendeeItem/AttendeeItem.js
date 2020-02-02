import React from 'react'
import styles from './attendee-item.module.css'
import Button from '@material-ui/core/Button'

const EventItem = props => (
  <div key={props.id} className={styles.itemWrapper}>
    {/* <div className={styles.item}>{props.name}</div> */}
    <div className={styles.item}>{props.id}</div>
    <div className={styles.item}>{props.firstName}</div>
    <div className={styles.item}>{props.lastName}</div>
    <div className={styles.item}>{props.drinkCounter}</div>
    <Button
      variant="contained"
      color="secondary"
      id={props.id}
      onClick={props.decreaseCount}
    >
      -
    </Button>
    <Button
      variant="contained"
      color="primary"
      id={props.id}
      onClick={props.increaseCount}
    >
      +
    </Button>
  </div>
)

export default EventItem
