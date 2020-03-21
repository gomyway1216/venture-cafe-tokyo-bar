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
  const [selected, setSelected] = useState(props.selected)
  return (
    <ListItem button>
      <Checkbox
        checked={selected}
        onChange={() => setSelected(!selected)}
        color="primary"
        inputProps={{ 'aria-label': 'secondary checkbox' }}
      />
      <ListItemText primary={props.drink.name} />
    </ListItem>
  )
}

export default DrinkSelectItem
