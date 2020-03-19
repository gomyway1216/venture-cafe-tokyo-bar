import React, { useContext, useEffect, useState } from 'react'
import { DrinkContext } from '../providers/DrinkProvider'
import { makeStyles } from '@material-ui/core/styles'
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

export const Settings = props => {
  const { getRegisteredDrinkList, getAvailableDrinkList } = useContext(
    DrinkContext
  )
  const [compositeDrinkList, setCompositeDrinkList] = useState(null)

  const { eventID } = props.match.params

  useEffect(() => {
    getAvailableDrinkList.makeFetch(eventID)
  })

  useEffect(() => {
    if (!getRegisteredDrinkList.response || !getAvailableDrinkList.response) {
      return
    }

    setCompositeDrinkList(
      checkSelectedDrink(
        getRegisteredDrinkList.response,
        getAvailableDrinkList.response
      )
    )
  }, [])

  if (
    getRegisteredDrinkList.isLoading ||
    !getRegisteredDrinkList.response ||
    getAvailableDrinkList.isLoading ||
    !getAvailableDrinkList.response ||
    !compositeDrinkList
  ) {
    return <Spinner />
  }

  // This is printed unlimitedly.
  console.log('compositeDrinkList', compositeDrinkList)

  return (
    <div className={styles.root}>
      <div classes={styles.registeredDrinkList}>
        <h2>Registered Drink List</h2>
        <List component="nav" aria-label="main mailbox folders">
          {compositeDrinkList.map(elm => (
            <ListItem button>
              <ListItemIcon>
                {elm.included ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
              </ListItemIcon>
              <ListItemText primary={elm.drink.name} />
            </ListItem>
          ))}
        </List>
        <Divider />
      </div>
      <div classes={styles.registeredDrinkList}>
        <h2>Available Drink List</h2>
        <List component="nav" aria-label="main mailbox folders">
          {getAvailableDrinkList.response.map(drink => (
            <ListItem button>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={drink.name} />
            </ListItem>
          ))}
        </List>
        <Divider />
      </div>
    </div>
  )
}

const checkSelectedDrink = (registeredDrinkList, availableDrinkList) => {
  let drinkCompositeList = []
  for (let i = 0; i < registeredDrinkList.length; i++) {
    let included = false
    for (let j = 0; j < availableDrinkList.length; j++) {
      if (availableDrinkList[j].drinkID === registeredDrinkList[i].id) {
        included = true
        break
      }
    }
    drinkCompositeList.push({
      drink: registeredDrinkList[i],
      included: included,
    })
  }
  return drinkCompositeList
}

export default Settings
