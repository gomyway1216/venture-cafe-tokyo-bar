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
import DrinkList from '../components/Drinks/DrinkList'
import { AttendeeContext } from '../providers/AttendeeProvider'
import { DrinkContext } from '../providers/DrinkProvider'

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
      attendee.attendeeId.includes(filterValue) ||
      firstName.includes(lowerCaseFilter) ||
      lastName.includes(lowerCaseFilter)
    )
  })

  return newList
}

const Attendees = props => {
  const { setAttendees, isActive, setLoading, setCurrentDrinks } = props
  const classes = useStyles()

  const {
    attendees,
    fetchAttendees,
    handleScan,
    isLoading,
    filterValue,
    setFilterValue,
    isFetchingAttendees,
    error: fetchingAttendeesError,
    selectDrink,
    currentDrinks,
  } = useContext(AttendeeContext)

  const { fetchDrinkList, drinkList, isFetchingDrinkList } = useContext(
    DrinkContext
  )

  const filteredAttendees = useMemo(
    () => filterAttendeeList(attendees, filterValue),
    [attendees, filterValue]
  )

  if (isFetchingAttendees) {
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
          {isLoading || !attendees ? (
            <Spinner />
          ) : (
            <div>
              <AttendeeList
                attendees={filteredAttendees}
                selectDrink={selectDrink}
                drinkList={drinkList}
              />
            </div>
          )}
        </div>
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.drinkList}>
          {isLoading || !currentDrinks ? (
            <Spinner />
          ) : (
            <DrinkList
              drinks={currentDrinks}
              setAttendees={setAttendees}
              isActive={isActive}
              setLoading={setLoading}
              setCurrentDrinks={setCurrentDrinks}
              setFilterValueEmpty={() => setFilterValue('')}
            />
          )}
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
