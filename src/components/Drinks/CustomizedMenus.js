import React, { useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import styles from './customized-menu.module.css'
import DeleteIcon from '@material-ui/icons/Delete'
import SaveIcon from '@material-ui/icons/Save'
import Dialog from '../Dialog/Dialog'
import { AttendeeContext } from '../../providers/AttendeeProvider'
import { DrinkContext } from '../../providers/DrinkProvider'

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
))

const StyledMenuItem = withStyles(theme => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem)

const modalModeEnum = {
  DELETEDRINKLIST: 'deleteDrinkList',
  DETETEATTENDEES: 'deleteCAttendees',
  CLOSE: 'close',
  SAVEDATA: 'saveData',
}

const CustomizedMenus = props => {
  const { eventID } = useParams()
  const { deleteAttendeeListForEvent } = useContext(AttendeeContext)
  const { addDrinkHistoryList, deleteAvailableDrinkListForEvent } = useContext(
    DrinkContext
  )
  const [modalMode, setModalMode] = useState(modalModeEnum.CLOSE)
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleDialogClose = () => {
    setModalMode(modalModeEnum.CLOSE)
  }

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
        className={styles.moreVertIcon}
      >
        <MoreVertIcon />
      </IconButton>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem
          onClick={() => setModalMode(modalModeEnum.DELETEDRINKLIST)}
        >
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Delete all the drink record" />
        </StyledMenuItem>
        <StyledMenuItem
          onClick={() => setModalMode(modalModeEnum.DETETEATTENDEES)}
        >
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Delete all the checked in record" />
        </StyledMenuItem>
        <StyledMenuItem onClick={() => setModalMode(modalModeEnum.SAVEDATA)}>
          <ListItemIcon>
            <SaveIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Save data and delete record" />
        </StyledMenuItem>
      </StyledMenu>

      <Dialog
        open={modalMode === modalModeEnum.DELETEDRINKLIST}
        handleClose={handleDialogClose}
        onContinue={() => {
          deleteAvailableDrinkListForEvent(eventID)
          props.setFilterValueEmpty()
          setModalMode(modalModeEnum.CLOSE)
        }}
        title="Deleting Drink List"
      >
        This operation removes all the drink list for this event!
      </Dialog>

      <Dialog
        open={modalMode === modalModeEnum.DETETEATTENDEES}
        handleClose={handleDialogClose}
        onContinue={() => {
          deleteAttendeeListForEvent(eventID)
          props.setFilterValueEmpty()
          setModalMode(modalModeEnum.CLOSE)
        }}
        title="Deleting Attendee List"
      >
        This operation removes all the signed in users for this event!
      </Dialog>

      <Dialog
        open={modalMode === modalModeEnum.SAVEDATA}
        handleClose={handleDialogClose}
        onContinue={async () => {
          await addDrinkHistoryList.makeFetch(eventID)
          // the api would clear the current drink list, when the data is saved
          deleteAvailableDrinkListForEvent(eventID)
          // clear the current attendees table
          deleteAttendeeListForEvent(eventID)
          props.setFilterValueEmpty()
          setModalMode(modalModeEnum.CLOSE)
        }}
        title="Saving Records for Event"
      >
        This operation saves all the data for this event!
      </Dialog>
    </div>
  )
}

export default CustomizedMenus
