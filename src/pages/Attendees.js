import React, { useContext, useEffect, useState, useMemo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Spinner from '../components/Spinner/Spinner'
import AttendeeList from '../components/Attendees/AttendeeList'
import InputBase from '@material-ui/core/InputBase'
import SearchIcon from '@material-ui/icons/Search'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import styles from './attendees.module.css'
import QrReader from 'react-qr-reader'
import { AttendeeContext } from '../providers/AttendeeProvider'
import { DrinkContext } from '../providers/DrinkProvider'
import AvailableDrinkList from '../components/Drinks/AvailableDrinkList'

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

const filterAttendeeList = (attendees, filterValue) => {
  if (filterValue === '') {
    return attendees
  }

  const lowerCaseFilter = filterValue.toLowerCase()

  const newList = attendees.filter(attendee => {
    const firstName = attendee.firstName.toLowerCase()
    const lastName = attendee.lastName.toLowerCase()

    return (
      attendee.userID.includes(filterValue) ||
      firstName.includes(lowerCaseFilter) ||
      lastName.includes(lowerCaseFilter)
    )
  })

  return newList
}

const Attendees = props => {
  const classes = useStyles()

  const {
    attendeeList,
    filterValue,
    setFilterValue,
    handleScan,
    getAttendeeList,
    updateAttendeeDrinkList,
    deleteAttendees,
  } = useContext(AttendeeContext)

  const {
    getAvailableDrinkList,
    deleteAvailableDrinks,
    getDrinkTypeList,
    getRegisteredDrinkList,
  } = useContext(DrinkContext)

  useEffect(() => {
    if (!attendeeList) {
      return
    }
    // When we move fetchCurrentDrinks to DrinkContext
    getAvailableDrinkList.makeFetch()
  }, [attendeeList])

  const filteredAttendees = useMemo(
    () => filterAttendeeList(attendeeList, filterValue),
    [attendeeList, filterValue]
  )

  const isLoading =
    getAttendeeList.isFetching ||
    updateAttendeeDrinkList.isFetching ||
    deleteAttendees.isFetching ||
    getAvailableDrinkList.isFetching ||
    deleteAvailableDrinks.isFetching ||
    getDrinkTypeList.isFetching ||
    getRegisteredDrinkList.isFetching

  if (getAttendeeList.isFetching || getAvailableDrinkList.isFetching) {
    return <Spinner />
  }

  return (
    <div className={styles.attendeesContainer}>
      <div className={styles.leftContainer}>
        <Paper component="form" className={classes.searchField}>
          <InputBase
            className={classes.input}
            placeholder="Search Names"
            inputProps={{ 'aria-label': 'search names' }}
            onChange={e => setFilterValue(e.target.value)}
            value={filterValue}
          />
          <IconButton
            type="submit"
            className={classes.iconButton}
            aria-label="search"
          >
            <SearchIcon />
          </IconButton>
        </Paper>

        <div className={styles.attendeeList}>
          {isLoading || !getAttendeeList.response ? (
            <Spinner />
          ) : (
            <div>
              <AttendeeList
                attendees={filteredAttendees}
                selectDrink={updateAttendeeDrinkList.makeFetch}
                drinkList={getAvailableDrinkList.response}
              />
            </div>
          )}
        </div>
      </div>

      {/* <div className={styles.availableDrinks}>
        <AvailableDrinks />
      </div> */}

      <div className={styles.rightContainer}>
        <div className={styles.drinkList}>
          <AvailableDrinkList setFilterValueEmpty={() => setFilterValue('')} />
        </div>

        <QrReader
          delay={300}
          onError={err => console.log(err)}
          onScan={handleScan}
          style={{ width: '100%' }}
          className={styles.qRReaderComponent}
        />
      </div>
    </div>
  )
}

export default Attendees
