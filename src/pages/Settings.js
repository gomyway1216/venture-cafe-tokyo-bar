import React, { useContext, useEffect } from 'react'
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
import DraftsIcon from '@material-ui/icons/Drafts'
import Spinner from '../components/Spinner/Spinner'
import styles from './settings.module.css'

const useStyles = makeStyles(theme => ({
  // root: {
  //   width: '100%',
  //   maxWidth: 360,
  //   backgroundColor: theme.palette.background.paper,
  // },
}))

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />
}

export const Settings = () => {
  const classes = useStyles()
  const { getRegisteredDrinkList, getAvailableDrinkList } = useContext(
    DrinkContext
  )

  if (getRegisteredDrinkList.isLoading || !getRegisteredDrinkList.response) {
    return <Spinner />
  }

  console.log('getRegisteredDrinkList', getRegisteredDrinkList)

  return (
    <div className={styles.root}>
      <div classes={styles.registeredDrinkList}>
        <h2>Registered Drink List</h2>
        <List component="nav" aria-label="main mailbox folders">
          {getRegisteredDrinkList.response.map(drink => (
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
      <div classes={styles.registeredDrinkList}>
        <h2>Available Drink List</h2>
        <List component="nav" aria-label="main mailbox folders">
          {getRegisteredDrinkList.response.map(drink => (
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

export default Settings
