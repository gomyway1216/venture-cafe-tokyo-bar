import React, { useState } from 'react'
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Paper,
  Checkbox,
} from '@material-ui/core'

const DrinkSelectItem = props => {
  // const [selected, setSelected] = useState(props.selected)
  return (
    <ListItem button>
      <Checkbox
        checked={props.selected}
        onChange={props.onChange}
        color="primary"
        inputProps={{ 'aria-label': 'secondary checkbox' }}
      />
      <ListItemText primary={props.drink.name} />
    </ListItem>
  )
}

export default DrinkSelectItem
