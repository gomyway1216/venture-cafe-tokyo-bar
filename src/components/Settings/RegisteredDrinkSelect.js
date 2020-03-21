import React, { useContext, useState, useEffect } from 'react'
import { DrinkContext } from '../../providers/DrinkProvider'
import Spinner from '../Spinner/Spinner'
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Paper,
} from '@material-ui/core'
import { makeStyles, StylesProvider } from '@material-ui/core/styles'
import styles from './registereddrink-select.module.css'

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },

  searchField: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
    margin: 'auto',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}))

const defaultDrinkInfo = {
  drinkType: '',
  name: '',
}

const RegisteredDrinkList = () => {
  const classes = useStyles()
  const [drinkInfo, setDrinkInfo] = useState(defaultDrinkInfo)
  const {
    getRegisteredDrinkList,
    getDrinkTypeList,
    addRegisteredDrink,
  } = useContext(DrinkContext)

  if (
    getRegisteredDrinkList.isFetching ||
    !getRegisteredDrinkList.response ||
    getDrinkTypeList.isFetching ||
    !getDrinkTypeList.response
  ) {
    return <Spinner />
  }

  const onInputChangeHandler = event => {
    setDrinkInfo({
      ...drinkInfo,
      [event.target.name]: event.target.value,
    })
  }

  const resisterDrink = () => {
    addRegisteredDrink.makeFetch({
      name: drinkInfo.name,
      drinkTypeID: drinkInfo.drinkType,
    })
  }

  return (
    <div className={styles.root}>
      <div>
        <h2>Drink list in dictionary</h2>
        <Paper style={{ maxHeight: 200, overflow: 'auto' }}>
          <List component="nav" aria-label="main mailbox folders">
            {getRegisteredDrinkList.response.map(drink => (
              <ListItem button>
                <ListItemText primary={drink.name} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </div>

      <div className={styles.resisterNewDrink}>
        <h2>Register New Drink</h2>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Drink Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="drinkType"
            name="drinkType"
            value={drinkInfo.drinkType}
            onChange={onInputChangeHandler}
          >
            {getDrinkTypeList.response.map(drinkType => (
              <MenuItem value={drinkType.id}>{drinkType.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          id="name"
          name="name"
          label="Name"
          onChange={onInputChangeHandler}
          value={drinkInfo.name}
        />
        <Button variant="contained" color="primary" onClick={resisterDrink}>
          Register!
        </Button>
      </div>
    </div>
  )
}

export default RegisteredDrinkList
