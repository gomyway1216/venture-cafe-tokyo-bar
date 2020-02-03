import React from 'react'
import styles from './DrinkItem.module.css'

const DrinkItem = props => {
  return (
    <div className={styles.itemWrapper}>
      <div className={styles.item}>{props.name}</div>
      <div className={styles.item}>{props.drinkTypeName}</div>
      <div className={styles.item}>{props.drinkCounter}</div>
    </div>
  )
}

export default DrinkItem
