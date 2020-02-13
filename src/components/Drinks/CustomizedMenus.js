import React, { useState, useContext } from 'react'
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
import AuthContext from '../../context/auth-context'
import Dialog from '../Dialog/Dialog'
import { deleteAllCurrentDrinks, saveAllCurrentDrinks } from '../../api/drink'
import { deleteAllCurrentAttendees } from '../../api/attendee'

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
  DETETECURERENTATTENDEES: 'deleteCurrentAttendees',
  CLOSE: 'close',
  SAVEDATA: 'saveData',
}

const CustomizedMenus = props => {
  const auth = useContext(AuthContext)
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
          onClick={() => setModalMode(modalModeEnum.DETETECURERENTATTENDEES)}
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
          deleteAllCurrentDrinks(
            auth.token,
            props.setCurrentDrinks,
            props.setLoading
          )
          props.setFilterValueEmpty()
          setModalMode(modalModeEnum.CLOSE)
        }}
      >
        This operation removes all the drink list for today!
      </Dialog>

      <Dialog
        open={modalMode === modalModeEnum.DETETECURERENTATTENDEES}
        handleClose={handleDialogClose}
        onContinue={() => {
          deleteAllCurrentAttendees(
            auth.token,
            props.isActive,
            props.setAttendees,
            props.setFilteredAttendees,
            props.setLoading
          )
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
          saveAllCurrentDrinks(
            auth.token,
            props.setCurrentDrinks,
            props.setLoading
          )
          deleteAllCurrentAttendees(
            auth.token,
            props.isActive,
            props.setAttendees,
            props.setFilteredAttendees,
            props.setLoading
          )
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
