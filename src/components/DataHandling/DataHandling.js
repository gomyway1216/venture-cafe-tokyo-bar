import React, { useState, useContext } from 'react'
import AuthContext from '../../context/auth-context'
import { Button } from '@material-ui/core/'
import Dialog from '../Dialog/Dialog'
import { deleteAllCurrentDrinks, saveAllCurrentDrinks } from '../../api/drink'
import { deleteAllCurrentAttendees } from '../../api/attendee'

const modalModeEnum = {
  DELETEDRINKLIST: 'deleteDrinkList',
  DETETECURERENTATTENDEES: 'deleteCurrentAttendees',
  CLOSE: 'close',
  SAVEDATA: 'saveData',
}

const DataHandling = props => {
  const auth = useContext(AuthContext)
  const [modalMode, setModalMode] = useState(modalModeEnum.CLOSE)

  const handleDialogClose = () => {
    setModalMode(modalModeEnum.CLOSE)
  }

  return (
    <div>
      <Button
        variant="contained"
        onClick={() => setModalMode(modalModeEnum.DELETEDRINKLIST)}
        color="secondary"
      >
        Delete all the signedIn attendees
      </Button>

      <Dialog
        open={modalMode === modalModeEnum.DELETEDRINKLIST}
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
        This operation removes all the drink list for today!
      </Dialog>

      <Button
        variant="contained"
        onClick={() => setModalMode(modalModeEnum.DETETECURERENTATTENDEES)}
        color="secondary"
      >
        Delete all drink list
      </Button>

      <Dialog
        open={modalMode === modalModeEnum.DETETECURERENTATTENDEES}
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
        This operation removes all the signed in users for today!
      </Dialog>

      <Button
        variant="contained"
        onClick={() => setModalMode(modalModeEnum.SAVEDATA)}
        color="primary"
      >
        Save all data!
      </Button>
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

export default DataHandling
