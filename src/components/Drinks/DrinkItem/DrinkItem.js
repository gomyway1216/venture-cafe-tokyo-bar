import React from 'react'
import styles from './DrinkItem.module.css'

const DrinkItem = props => {
  return (
    <div className={styles.itemWrapper}>
      <span className={styles.drinkName}>{props.name}</span>
      {/* <div className={styles.item}>{props.drinkTypeName}</div> */}
      <span className={styles.drinkCounter}>{props.drinkCounter}</span>
    </div>
  )
}

export default DrinkItem
