import React, { useContext } from 'react'
import { useDailyDrinksList } from '../api/dailyDrinksList'
import AuthContext from '../context/auth-context'
import styles from './dataList.module.css'

const DataListPage = () => {
  const auth = useContext(AuthContext)
  const { data, loading } = useDailyDrinksList(auth.token)
  return (
    <div>
      <h1>Displaying data</h1>
      {data &&
        data.map(drinkList => {
          return (
            <div className={styles.dayGroup} key={drinkList.id}>
              <h2 className={styles.groupDate}>{drinkList.date}</h2>
              <div>
                {drinkList.drinks.map((drinkAndDate, i) => {
                  return (
                    <div key={i}>
                      {drinkAndDate.date}
                      {drinkAndDate.drink.name}
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
    </div>
  )
}

export default DataListPage
