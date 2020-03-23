import React, { useContext, useEffect, useMemo } from 'react'
import { AttendeeContext } from '../providers/AttendeeProvider'
import { DrinkContext } from '../providers/DrinkProvider'
import { EventContext } from '../providers/EventProvider'
import Spinner from '../components/Spinner/Spinner'
import AttendeeList from '../components/Attendees/AttendeeList'
import { makeStyles } from '@material-ui/core/styles'
import {
  InputBase,
  Paper,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import QrReader from 'react-qr-reader'
import AvailableDrinkList from '../components/Drinks/AvailableDrinkList'
import ErrorDialog from '../components/Dialog/ErrorDialog'
import styles from './event-attendee-list.module.css'

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
  const { getEvent } = useContext(EventContext)

  const {
    attendeeList,
    filterValue,
    setFilterValue,
    handleScan,
    getAttendeeList,
    updateAttendeeDrinkList,
  } = useContext(AttendeeContext)

  const {
    getAvailableDrinkList,
    getDrinkTypeList,
    getRegisteredDrinkList,
  } = useContext(DrinkContext)

  const { eventID } = props.match.params

  useEffect(() => {
    // When we move fetchCurrentDrinks to DrinkContext
    // it is called when a person's drink changed, needs to update drink list too
    getEvent.makeFetch(eventID)
    getAvailableDrinkList.makeFetch(eventID)
    getAttendeeList.makeFetch(eventID)
  }, [eventID])

  useEffect(() => {
    getAvailableDrinkList.makeFetch(eventID)
  }, [updateAttendeeDrinkList])

  const filteredAttendees = useMemo(
    () => filterAttendeeList(attendeeList, filterValue),
    [attendeeList, filterValue]
  )

  const isLoading =
    getAttendeeList.isFetching ||
    updateAttendeeDrinkList.isFetching ||
    getAvailableDrinkList.isFetching ||
    getDrinkTypeList.isFetching ||
    getRegisteredDrinkList.isFetching

  const error =
    getEvent.error || getAttendeeList.error || getAvailableDrinkList.error

  if (getAttendeeList.isFetching || getAvailableDrinkList.isFetching) {
    return <Spinner />
  }

  return (
    <div className={styles.attendeesContainer}>
      <ErrorDialog open={!!error} message={error} />
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

      <div className={styles.rightContainer}>
        <div className={styles.drinkList}>
          <AvailableDrinkList setFilterValueEmpty={() => setFilterValue('')} />
        </div>

        <QrReader
          delay={300}
          onError={err => console.log(err)}
          onScan={userID => handleScan(userID, eventID)}
          style={{ width: '100%' }}
          className={styles.qRReaderComponent}
        />
        {getEvent.response && <EventInfo event={getEvent.response} />}
      </div>
    </div>
  )
}

const EventInfo = props => (
  <div className={styles.EventInfo}>
    <div className={styles.subtitle}>Event Info</div>
    <List component="nav" aria-label="main mailbox folders">
      <ListItem dense>
        <ListItemText primary={'Event Name: ' + props.event.name} />
      </ListItem>
      <ListItem dense>
        <ListItemText primary={'Event Type: ' + props.event.eventType.name} />
      </ListItem>
    </List>
  </div>
)

export default Attendees
