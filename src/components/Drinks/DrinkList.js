import React from 'react'
import { getDrinkList } from '../../api/drink'
import DrinkItem from './DrinkItem/DrinkItem'
import styles from './DrinkList.module.css'

const DrinkList = props => {
  // sort the drinks based on the category
  const sortedDrinks = props.drinks.sort((a, b) => {
    let aPriority = 1
    let bPriority = 1
    if (a.drinkType.name === 'juice') {
      aPriority = 2
    } else if (a.drinkType.name === 'tea') {
      aPriority = 3
    }

    if (b.drinkType.name === 'juice') {
      bPriority = 2
    } else if (b.drinkType.name === 'tea') {
      bPriority = 3
    }

    return bPriority - aPriority
  })

  const drinks = sortedDrinks.map(drink => {
    return (
      <DrinkItem
        key={drink.id}
        name={drink.name}
        drinkTypeName={drink.drinkType.name}
        drinkCounter={drink.count.length}
      />
    )
  })
  return (
    <div>
      <div>Drink List</div>
      <ul className={styles.attendeeList}>{drinks}</ul>
    </div>
  )
}

export default DrinkList
