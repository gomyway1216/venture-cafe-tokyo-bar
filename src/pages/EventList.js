import React, { useContext, useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Spinner from '../components/Spinner/Spinner'
import AttendeeList from '../components/Attendees/AttendeeList'
import InputBase from '@material-ui/core/InputBase'
import SearchIcon from '@material-ui/icons/Search'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import { EventContext } from '../providers/EventProvider'
import AvailableDrinkList from '../components/Drinks/AvailableDrinkList'
import styles from './eventList.module.css'
import Button from '@material-ui/core/Button'
import Dialog from '../components/Dialog/Dialog'
import Select from '@material-ui/core/Select'
import moment from 'moment'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'

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

  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}))

const defaultEventInfo = {
  name: '',
  eventType: '',
  date: '',
  location: '',
}

const EventList = props => {
  const classes = useStyles()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [eventInfo, setEventInfo] = useState(defaultEventInfo)
  const { getEventTypeList } = useContext(EventContext)

  const { getEventList } = useContext(EventContext)

  useEffect(() => {
    if (!getEventList) {
      return
    }

    getEventList.makeFetch()
  }, [])

  useEffect(() => {
    if (!getEventTypeList) {
      return
    }

    getEventTypeList.makeFetch()
  }, [])

  const eventList = getEventList.response

  const onClickHandler = () => {
    setDialogOpen(true)
  }

  const createEvent = () => {
    console.log('eventInfo', eventInfo)
    if (
      eventInfo.name.trim().length === 0 ||
      eventInfo.eventType.trim().length === 0 ||
      eventInfo.date.trim().length === 0 ||
      eventInfo.location.trim().length === 0
    ) {
      return
    }

    const date = moment().format()

    // api call
  }

  const onInputChangeHandler = event => {
    setEventInfo({
      ...eventInfo,
      [event.target.name]: event.target.value,
    })
  }

  if (getEventList.isFetching || !getEventList.response) {
    return <Spinner />
  }

  if (getEventTypeList.isFetching || !getEventTypeList.response) {
    return (
      <div className={styles.main}>
        <Spinner />
      </div>
    )
  }

  console.log('this is event list')

  return (
    <div className={styles.main}>
      <Dialog
        open={dialogOpen}
        handleClose={() => setDialogOpen(false)}
        onContinue={createEvent}
      >
        <TextField
          id="name"
          name="name"
          label="Name"
          onChange={onInputChangeHandler}
          value={eventInfo.name}
        />
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Event Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="eventType"
            name="eventType"
            value={eventInfo.eventType}
            onChange={onInputChangeHandler}
          >
            {getEventTypeList.response.map(eventType => (
              <MenuItem value={eventType.name}>{eventType.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Event Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="location"
            name="location"
            value={eventInfo.location.name}
            onChange={onInputChangeHandler}
          >
            <MenuItem value={'Tokyo'}>Tokyo</MenuItem>
            <MenuItem value={'Miami'}>Miami</MenuItem>
            <MenuItem value={'New York'}>New York</MenuItem>
          </Select>
        </FormControl>
      </Dialog>
      <div className={styles.links}>
        {eventList.map(event => (
          <Link to={`/events/${event.id}`}>{event.name}</Link>
        ))}
      </div>
      <Button variant="contained" color="primary" onClick={onClickHandler}>
        Create an Event
      </Button>
    </div>
  )
}

export default EventList
