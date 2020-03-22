import React, { useContext, useEffect, useState } from 'react'
import { DrinkContext } from '../../providers/DrinkProvider'
import { EventContext } from '../../providers/EventProvider'
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Paper,
  Button,
} from '@material-ui/core'
import InboxIcon from '@material-ui/icons/Inbox'
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'
import Spinner from '../Spinner/Spinner'
import styles from './availabledrink-select.module.css'
import { makeStyles } from '@material-ui/core/styles'
import DrinkSelectItem from './DrinkSelectItem'

// const useStyles = makeStyles(theme => ({
//   root: {
//     width: '100%',
//     maxWidth: 360,
//     backgroundColor: theme.palette.background.paper,
//   },
// }))

const AvailableDrinkSelect = props => {
  // const classes = useStyles()
  const { getRegisteredDrinkList, getAvailableDrinkList } = useContext(
    DrinkContext
  )

  const [compositeDrinkList, setCompositeDrinkList] = useState(null)

  const onDrinkSelect = elem => {
    const updatedCompositeDrinkList = compositeDrinkList.map(compositeDrink =>
      compositeDrink.drink.id === elem.drink.id
        ? { ...compositeDrink, included: !compositeDrink.included }
        : compositeDrink
    )
    setCompositeDrinkList(updatedCompositeDrinkList)
  }

  useEffect(() => {
    console.log('useEffect getAvailableDrinkList')
    getRegisteredDrinkList.makeFetch()
    getAvailableDrinkList.makeFetch(props.eventID)
  }, [])

  useEffect(() => {
    if (
      getRegisteredDrinkList.isFetching ||
      !getRegisteredDrinkList.response ||
      getAvailableDrinkList.isFetching ||
      !getAvailableDrinkList.response
    ) {
      return
    }

    setCompositeDrinkList(
      checkSelectedDrinkList(
        getRegisteredDrinkList.response,
        getAvailableDrinkList.response
      )
    )
  }, [getRegisteredDrinkList.isFetching, getAvailableDrinkList.isFetching])

  const onSelectSubmit = () => {
    // compositeDrinkList
    console.log('do something')
  }

  if (
    getRegisteredDrinkList.isFetching ||
    !getRegisteredDrinkList.response ||
    getAvailableDrinkList.isFetching ||
    !getAvailableDrinkList.response ||
    !compositeDrinkList
  ) {
    return <Spinner />
  }

  console.log('compositeDrinkList: ', compositeDrinkList)

  return (
    <div className={styles.root}>
      <div className={styles.registeredDrinkList}>
        <h2>Registered Drink List</h2>
        <Paper style={{ maxHeight: 200, overflow: 'auto' }}>
          <List component="nav" aria-label="main mailbox folders">
            {compositeDrinkList.map(elm => (
              <DrinkSelectItem
                onChange={() => onDrinkSelect(elm)}
                selected={elm.included}
                drink={elm.drink}
              />
              // <ListItem button>
              //   <ListItemIcon>
              //     {elm.included ? (
              //       <CheckBoxIcon />
              //     ) : (
              //       <CheckBoxOutlineBlankIcon />
              //     )}
              //   </ListItemIcon>
              //   <ListItemText primary={elm.drink.name} />
              // </ListItem>
            ))}
          </List>
        </Paper>
      </div>
      <div className={styles.registeredDrinkList}>
        <h2>Available Drink List</h2>
        <Paper style={{ maxHeight: 200, overflow: 'auto' }}>
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
        </Paper>
      </div>
      <Button variant="contained" color="primary" onClick={onSelectSubmit}>
        Select
      </Button>
    </div>
  )
}

const checkSelectedDrinkList = (registeredDrinkList, availableDrinkList) => {
  const drinkCompositeList = registeredDrinkList.map(registeredDrink => {
    const included = availableDrinkList.some(
      availableDrink => availableDrink.drinkID === registeredDrink.id
    )
    return {
      drink: registeredDrink,
      included,
    }
  })
  return drinkCompositeList
}

export default AvailableDrinkSelect
