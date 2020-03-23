import React, { useContext, useEffect, useState } from 'react'
import { DrinkContext } from '../../providers/DrinkProvider'
import { List, ListItem, ListItemText, Paper, Button } from '@material-ui/core'
import Spinner from '../Spinner/Spinner'
import styles from './availabledrink-select.module.css'
import DrinkSelectItem from './DrinkSelectItem'
import ErrorDialog from '../../components/Dialog/ErrorDialog'

const AvailableDrinkSelect = props => {
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

  const error =
    getRegisteredDrinkList.error ||
    getAvailableDrinkList.error ||
    updateAvailableDrinkList.error

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
      <ErrorDialog open={!!error} message={error} />
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
                  key={elm.drink.id}
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
                <ListItem key={drink.id}>
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
