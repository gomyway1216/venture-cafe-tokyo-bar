import React, { useContext, useEffect, useState } from 'react'
import { EventContext } from '../providers/EventProvider'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import moment from 'moment'

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}))

// check if the event info exists
// useEffect(() => {
//   const eventInfo = JSON.parse(localStorage.getItem('eventInfo'))
//   if(eventInfo) {
//     history.push("/attendees");
//   }
// }, [])

const defaultEventInfo = {
  name: '',
  eventType: '',
  date: '',
  location: '',
}

const EventSetUp = props => {
  const classes = useStyles()
  const { getEventTypeList } = useContext(EventContext)
  const history = useHistory()
  const [eventInfo, setEventInfo] = useState(defaultEventInfo)

  // useEffect(() => {
  //   console.log('useEffect is called')
  //   getEventTypeList.makeFetch()
  // }, [])

  const submitEventSetUp = () => {
    if (
      eventInfo.name.trim().length === 0 ||
      eventInfo.eventType.trim().length === 0 ||
      eventInfo.date.trim().length === 0 ||
      eventInfo.location.trim().length === 0
    ) {
      return
    }

    const date = moment().format()

    localStorage.setItem(
      'eventInfo',
      JSON.stringify({
        name: eventInfo.name,
        eventType: eventInfo.eventType,
        date: date,
        location: eventInfo.location,
      })
    )
  }

  const onInputChangeHandler = event => {
    console.log('event.target.id', event.target.id)
    setEventInfo({
      ...eventInfo,
      [event.target.id]: event.target.value,
    })
  }

  console.log('getEventTypeList', getEventTypeList)

  // if (!getEventTypeList || !getEventTypeList.response) {
  //   return
  // }

  if (!getEventTypeList.response) {
    return
  }

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Event Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="eventType"
          value={eventInfo.eventType}
          onChange={onInputChangeHandler}
        >
          {getEventTypeList.response.map(eventType => (
            <MenuItem value={eventType.id}>{eventType.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Event Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="location"
          value={eventInfo.location}
          onChange={onInputChangeHandler}
        >
          <MenuItem value={10}>Tokyo</MenuItem>
          <MenuItem value={20}>Miami</MenuItem>
          <MenuItem value={30}>New York</MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}

export default EventSetUp
