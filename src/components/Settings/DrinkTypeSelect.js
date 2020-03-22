import React, { useContext, useState, useEffect } from 'react'
import { DrinkContext } from '../../providers/DrinkProvider'
import Spinner from '../Spinner/Spinner'
import {
  List,
  ListItem,
  ListItemText,
  Button,
  TextField,
  Paper,
} from '@material-ui/core'
import styles from './registereddrink-select.module.css'
import ErrorDialog from '../../components/Dialog/ErrorDialog'

const RegisteredDrinkList = () => {
  const [drinkTypeName, setDrinkTypeName] = useState('')
  const { getDrinkTypeList, addDrinkType } = useContext(DrinkContext)

  if (
    getDrinkTypeList.isFetching ||
    !getDrinkTypeList.response ||
    addDrinkType.isFetching
  ) {
    return <Spinner />
  }

  const onInputChangeHandler = event => {
    setDrinkTypeName(event.target.value)
  }

  const resisterDrinkType = async () => {
    const response = await addDrinkType.makeFetch(drinkTypeName)

    if (!response.error) {
      setDrinkTypeName('')
      getDrinkTypeList.makeFetch()
    }
  }

  let error = getDrinkTypeList.error || addDrinkType.error

  const clearError = () => {
    error = null
  }

  return (
    <div className={styles.root}>
      <div className={styles.title}>Edit drink type</div>
      <div className={styles.main}>
        <ErrorDialog open={!!error} message={error} clearError={clearError} />
        <div>
          <h2>Drink Types</h2>
          <Paper style={{ maxHeight: 200, overflow: 'auto' }}>
            <List component="nav" aria-label="main mailbox folders">
              {getDrinkTypeList.response.map(drinkType => (
                <ListItem key={drinkType.id}>
                  <ListItemText primary={drinkType.name} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </div>

        <div className={styles.resisterNewDrink}>
          <h2>Register New Drink Type</h2>
          <TextField
            id="name"
            name="name"
            label="Name"
            onChange={onInputChangeHandler}
            value={drinkTypeName}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={resisterDrinkType}
          >
            Register!
          </Button>
        </div>
      </div>
    </div>
  )
}

export default RegisteredDrinkList
