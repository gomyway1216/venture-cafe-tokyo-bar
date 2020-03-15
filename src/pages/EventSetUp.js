import React, { useContext, useEffect, useState } from 'react'
import { EventContext } from '../providers/EventProvider'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'

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

const EventSetUp = props => {
  const {} = useContext(EventContext)
  const [age, setAge] = React.useState('')
  const history = useHistory()

  const handleChange = event => {
    setAge(event.target.value)
  }

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="demo-simple-select-label">Age</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={age}
        onChange={handleChange}
      >
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
    </FormControl>
  )
}

export default EventSetUp
