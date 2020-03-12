import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ListSubheader from '@material-ui/core/ListSubheader'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import DraftsIcon from '@material-ui/icons/Drafts'
import SendIcon from '@material-ui/icons/Send'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import StarBorder from '@material-ui/icons/StarBorder'
import { DrinkContext } from '../providers/DrinkProvider'
import Spinner from '../components/Spinner/Spinner'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}))

export const Settings = () => {
  const classes = useStyles()
  const [open, setOpen] = React.useState(true)

  const { isFetchingDrinkTypes, drinkTypes } = useContext(DrinkContext)

  const handleClick = () => {
    setOpen(!open)
  }

  if (isFetchingDrinkTypes) {
    return <Spinner />
  }

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Nested List Items
        </ListSubheader>
      }
      className={classes.root}
    >
      {!isFetchingDrinkTypes ||
        drinkTypes.map(drinkType => (
          <>
            <ListItem button onClick={handleClick}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={drinkType.name} />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            {drinkType.createdDrinks.map(drink => (
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary={drink.name} />
                  </ListItem>
                </List>
              </Collapse>
            ))}
          </>
        ))}
    </List>
  )
}

export default Settings
