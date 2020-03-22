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
import { getRegisteredDrink } from '../../api/drink/registeredDrink'

// const useStyles = makeStyles(theme => ({
//   root: {
//     width: '100%',
//     maxWidth: 360,
//     backgroundColor: theme.palette.background.paper,
//   },
// }))

const AvailableDrinkSelect = props => {
  // const classes = useStyles()
  const {
    getRegisteredDrinkList,
    getAvailableDrinkList,
    updateAvailableDrinkList,
  } = useContext(DrinkContext)

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

  // for updating drink list.
  useEffect(() => {
    if (!updateAvailableDrinkList.response) {
      return
    }
    getRegisteredDrinkList.makeFetch()
    getAvailableDrinkList.makeFetch(props.eventID)
  }, [updateAvailableDrinkList.response])

  const onSelectSubmit = () => {
    const reducedDrinkList = compositeDrinkList.map(compositeDrink => {
      return {
        drinkID: compositeDrink.drink.id,
        included: compositeDrink.included,
      }
    })

    updateAvailableDrinkList.makeFetch({
      compositeDrinkList: reducedDrinkList,
      eventID: props.eventID,
    })
  }

  if (
    getRegisteredDrinkList.isFetching ||
    !getRegisteredDrinkList.response ||
    getAvailableDrinkList.isFetching ||
    !getAvailableDrinkList.response ||
    !compositeDrinkList ||
    updateAvailableDrinkList.isFetching
  ) {
    return <Spinner />
  }

  return (
    <div className={styles.root}>
      <div className={styles.title}>Select drinks for event</div>
      <div className={styles.main}>
        <div className={styles.registeredDrinkList}>
          <h2>Drink Dictionary</h2>
          <Paper style={{ maxHeight: 500, overflow: 'auto' }}>
            <List component="nav" aria-label="main mailbox folders">
              {compositeDrinkList.map(elm => (
                <DrinkSelectItem
                  onChange={() => onDrinkSelect(elm)}
                  selected={elm.included}
                  drink={elm.drink}
                />
              ))}
            </List>
          </Paper>
        </div>
        <div className={styles.registeredDrinkList}>
          <h2>Drink for Event</h2>
          <Paper style={{ maxHeight: 500, overflow: 'auto' }}>
            <List component="nav" aria-label="main mailbox folders">
              {getAvailableDrinkList.response.map(drink => (
                <ListItem button>
                  <ListItemText primary={drink.name} />
                </ListItem>
              ))}
            </List>
          </Paper>
          <div className={styles.buttons}>
            <Button
              variant="contained"
              color="primary"
              onClick={onSelectSubmit}
            >
              Select
            </Button>
          </div>
        </div>
      </div>
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
