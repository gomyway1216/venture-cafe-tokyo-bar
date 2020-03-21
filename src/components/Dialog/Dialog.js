import React from 'react'
import {
  Button,
  DialogTitle,
  Dialog,
  DialogActions,
  DialogContent,
} from '@material-ui/core'

const CustomDialog = props => {
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
      <DialogContent>{props.children}</DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={props.onContinue} color="primary" autoFocus>
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CustomDialog
