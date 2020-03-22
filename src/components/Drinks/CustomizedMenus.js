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
  const { deleteAttendees } = useContext(AttendeeContext)
  const { deleteAvailableDrinks, addDrinkHistoryList } = useContext(
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
          deleteAvailableDrinks.makeFetch(eventID)
          props.setFilterValueEmpty()
          setModalMode(modalModeEnum.CLOSE)
        }}
      >
        This operation removes all the drink list for today!
      </Dialog>

      <Dialog
        open={modalMode === modalModeEnum.DETETEATTENDEES}
        handleClose={handleDialogClose}
        onContinue={() => {
          deleteAttendees.makeFetch(eventID)
          props.setFilterValueEmpty()
          setModalMode(modalModeEnum.CLOSE)
        }}
      >
        This operation removes all the signed in users for today!
      </Dialog>

      <Dialog
        open={modalMode === modalModeEnum.SAVEDATA}
        handleClose={handleDialogClose}
        onContinue={() => {
          // the api would clear the current drink list, when the data is saved
          addDrinkHistoryList.makeFetch(eventID)
          // clear the current attendees table
          deleteAttendees.makeFetch(eventID)
          props.setFilterValueEmpty()
          setModalMode(modalModeEnum.CLOSE)
        }}
      >
        This operation saves all the data for today!
      </Dialog>
    </div>
  )
}

export default CustomizedMenus
