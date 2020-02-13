import React from 'react'
import CustomizedMenus from './CustomizedMenus'
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

  let totalDrinkCount = 0
  sortedDrinks.forEach(drink => {
    totalDrinkCount += drink.count.length
  })

  return (
    <div>
      <div className={styles.titleWrapper}>
        <div className={styles.title}>Drink List</div>
        <CustomizedMenus
          setAttendees={props.setAttendees}
          setFilteredAttendees={props.setFilteredAttendees}
          isActive={props.isActive}
          setLoading={props.setLoading}
          setCurrentDrinks={props.setCurrentDrinks}
          setFilterValueEmpty={props.setFilterValueEmpty}
        />
      </div>
      <table>
        <tr>
          <th>Drink Name</th>
          <th>Count</th>
        </tr>
        <tr>
          <th>Total Drinks</th>
          <th>{totalDrinkCount}</th>
        </tr>
        {sortedDrinks.map(drink => (
          <tr>
            <td>{drink.name}</td>
            <td>{drink.count.length}</td>
          </tr>
        ))}
      </table>
    </div>
  )
}

export default DrinkList
