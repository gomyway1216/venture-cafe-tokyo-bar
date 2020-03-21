import React, { useState, useEffect } from 'react'
import {
  Button,
  DialogTitle,
  Dialog,
  DialogActions,
  DialogContentText,
} from '@material-ui/core'

const CustomDialog = props => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (!props.message) {
      return
    }
    setIsOpen(true)
  }, [props.message])

  console.log('CustomDialog: isOpen: ', isOpen)
  // if (!isOpen) {
  //   return null
  // }

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Error!</DialogTitle>
      {/* <DialogContent>{props.children}</DialogContent> */}
      <DialogContentText id="alert-dialog-slide-description">
        {props.message}
      </DialogContentText>
      <DialogActions>
        <Button onClick={() => setIsOpen(false)} color="primary">
          Got it!
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CustomDialog
