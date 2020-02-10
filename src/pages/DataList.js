import React, { useState, useEffect, useContext } from 'react'
import { useDailyDrinksList } from '../api/dailyDrinksList'
import AuthContext from '../context/auth-context'
import styles from './dataList.module.css'

const DataListPage = () => {
  const auth = useContext(AuthContext)
  const { data, loading } = useDailyDrinksList(auth.token)
  console.log('this is data', data)
  return (
    <div>
      <h1>Displaying data</h1>
      {data &&
        data.map(drinkList => {
          return (
            <div className={styles.dayGroup}>
              <h2 className={styles.groupDate}>{drinkList.date}</h2>
              <div>
                {drinkList.drinks.map(drinkAndDate => {
                  return (
                    <div>
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
