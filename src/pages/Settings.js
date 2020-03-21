import React from 'react'
import { Divider } from '@material-ui/core'
import styles from './settings.module.css'
import RegisteredDrinkSelect from '../components/Settings/RegisteredDrinkSelect'
import AvailableDrinkSelect from '../components/Settings/AvailableDrinkSelect'

export const Settings = props => {
  return (
    <div className={styles.root}>
      <RegisteredDrinkSelect />
      <Divider />
      <AvailableDrinkSelect eventID={props.match.params.eventID} />
    </div>
  )
}

export default Settings
