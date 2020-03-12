import React, { useContext } from 'react'
import AuthContext from '../context/auth-context'
import styles from './dataList.module.css'

// component to display data. This component is not completed yet.
const DataListPage = () => {
  const auth = useContext(AuthContext)
  return (
    <div>
      <h1>Displaying data</h1>
      {/* {data &&
        data.map(drinkList => {
          return (
            <div className={styles.dayGroup}>
              <h2 className={styles.groupDate}></h2>
              <div></div>
            </div>
          )
        })} */}
    </div>
  )
}

export default DataListPage
