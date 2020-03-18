import React from 'react'
import {
  Button,
  DialogTitle,
  Dialog,
  DialogActions,
  DialogContentText,
} from '@material-ui/core'

const CustomDialog = props => {
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Error!</DialogTitle>
      {/* <DialogContent>{props.children}</DialogContent> */}
      <DialogContentText id="alert-dialog-slide-description">
        {props.message}
      </DialogContentText>
      <DialogActions>
        <Button onClick={props.handleClose} color="primary">
          Got it!
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CustomDialog
