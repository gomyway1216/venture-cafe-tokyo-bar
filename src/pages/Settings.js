import React, { useContext, useEffect, useState } from 'react'
import { DrinkContext } from '../providers/DrinkProvider'
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@material-ui/core'
import InboxIcon from '@material-ui/icons/Inbox'
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'
import Spinner from '../components/Spinner/Spinner'
import styles from './settings.module.css'
import RegisteredDrinkSelect from '../components/Settings/RegisteredDrinkSelect'
import AvailableDrinkSelect from '../components/Settings/AvailableDrinkSelect'

export const Settings = props => {
  console.log('props.match.params', props.match.params)
  return (
    <div className={styles.root}>
      <RegisteredDrinkSelect />
      <AvailableDrinkSelect eventID={props.match.params.eventID} />
    </div>
  )
}

export default Settings
