import React, { useContext } from 'react'
import CustomizedMenus from './CustomizedMenus'
import styles from './currentDrinkList.module.css'
import { DrinkContext } from '../../providers/DrinkProvider'
import Spinner from '../Spinner/Spinner'

// sort the drinks based on the category
const sortDrinkList = drinkList => {
  const sortedDrinks = [...drinkList].sort((a, b) => {
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

  return sortedDrinks
}

const AvailableDrinkList = props => {
  const { getAvailableDrinkList } = useContext(DrinkContext)

  if (getAvailableDrinkList.isFetching || !getAvailableDrinkList.response) {
    return <Spinner />
  }

  const sortedDrinkList = sortDrinkList(getAvailableDrinkList.response)

  const totalDrinkCount = sortedDrinkList.reduce(
    (count, drink) => count + drink.consumedDateList.length,
    0
  )

  return (
    <div>
      <div className={styles.titleWrapper}>
        <div className={styles.title}>Drink List</div>
        <CustomizedMenus setFilterValueEmpty={props.setFilterValueEmpty} />
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
        {sortedDrinkList.map(drink => (
          <tr>
            <td>{drink.name}</td>
            <td>{drink.consumedDateList.length}</td>
          </tr>
        ))}
      </table>
    </div>
  )
}

export default AvailableDrinkList
