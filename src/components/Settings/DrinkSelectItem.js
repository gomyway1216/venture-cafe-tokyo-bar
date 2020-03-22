import React from 'react'
import { ListItem, ListItemText, Checkbox } from '@material-ui/core'

const DrinkSelectItem = props => {
  return (
    <ListItem onClick={props.onChange} button>
      <Checkbox
        checked={props.selected}
        color="primary"
        inputProps={{ 'aria-label': 'secondary checkbox' }}
      />
      <ListItemText primary={props.drink.name} />
    </ListItem>
  )
}

export default DrinkSelectItem
