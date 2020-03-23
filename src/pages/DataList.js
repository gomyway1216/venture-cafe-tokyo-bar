import React, { useEffect, useContext } from 'react'
import { DrinkContext } from '../providers/DrinkProvider'
import Spinner from '../components/Spinner/Spinner'
import styles from './dataList.module.css'

// component to display data. This component is not completed yet.
const DataListPage = () => {
  const { getDrinkHistoryList } = useContext(DrinkContext)

  useEffect(() => {
    getDrinkHistoryList.makeFetch()
  }, [])

  if (getDrinkHistoryList.isLoading || !getDrinkHistoryList.response) {
    return <Spinner />
  }

  return (
    <div className={styles.root}>
      <h1>Displaying data</h1>
      {getDrinkHistoryList.response.map(elm => (
        <div>
          <span>Date: {elm.date}</span>

          <span>Drink Name: {elm.registeredDrink.name}</span>
          <span>Event Name : {elm.event.name}</span>
        </div>
      ))}
    </div>
  )
}

export default DataListPage
