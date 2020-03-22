import React, { useContext, useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import Spinner from '../components/Spinner/Spinner'
import AttendeeList from '../components/Attendees/AttendeeList'
import { makeStyles } from '@material-ui/core/styles'
import {
  InputBase,
  Button,
  IconButton,
  Paper,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import { EventContext } from '../providers/EventProvider'
import AvailableDrinkList from '../components/Drinks/AvailableDrinkList'
import styles from './eventList.module.css'
import Dialog from '../components/Dialog/Dialog'
import moment from 'moment'

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
  const { getEventTypeList, setEventID } = useContext(EventContext)

  const { getEventList, addEvent } = useContext(EventContext)

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

  const createEvent = async () => {
    if (
      eventInfo.name.trim().length === 0 ||
      eventInfo.eventType.trim().length === 0 ||
      eventInfo.location.trim().length === 0
    ) {
      return
    }

    const date = moment().format()
    const response = await addEvent.makeFetch({
      name: eventInfo.name,
      eventTypeID: eventInfo.eventType,
      location: eventInfo.location,
      date: eventInfo.location,
    })

    if (!response.error) {
      setEventInfo(defaultEventInfo)
      setDialogOpen(false)
      getEventList.makeFetch()
    }
  }

  const onInputChangeHandler = event => {
    setEventInfo({
      ...eventInfo,
      [event.target.name]: event.target.value,
    })
  }

  if (
    getEventList.isFetching ||
    !getEventList.response ||
    addEvent.isFetching
  ) {
    return <Spinner />
  }

  if (getEventTypeList.isFetching || !getEventTypeList.response) {
    return (
      <div className={styles.main}>
        <Spinner />
      </div>
    )
  }

  return (
    <div className={styles.main}>
      <Dialog
        open={dialogOpen}
        handleClose={() => setDialogOpen(false)}
        onContinue={createEvent}
        title="Creating New Event"
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
              <MenuItem value={eventType.id}>{eventType.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Location</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="location"
            name="location"
            value={eventInfo.location}
            onChange={onInputChangeHandler}
          >
            <MenuItem value={'Tokyo'}>Tokyo</MenuItem>
            <MenuItem value={'Miami'}>Miami</MenuItem>
            <MenuItem value={'New York'}>New York</MenuItem>
          </Select>
        </FormControl>
      </Dialog>
      <div className={styles.links}>
        <Paper style={{ maxHeight: 500, overflow: 'auto' }}>
          <List component="nav" aria-label="main mailbox folders">
            {eventList.map(event => (
              <ListItem button>
                <Link
                  to={`/events/${event.id}/attendees`}
                  onClick={() => setEventID(event.id)}
                >
                  {event.name}
                </Link>
              </ListItem>
            ))}
          </List>
        </Paper>
      </div>
      <Button variant="contained" color="primary" onClick={onClickHandler}>
        Create an Event
      </Button>
    </div>
  )
}

export default EventList
