import React from 'react'
import styles from './DrinkItem.module.css'

const DrinkItem = props => {
  return (
    <div className={styles.itemWrapper}>
      <span className={styles.drinkName}>{props.name}</span>
      <span className={styles.drinkCounter}>{props.drinkCounter}</span>
    </div>
  )
}

export default DrinkItem
