import React, { useState } from 'react'
import ReactDOM from 'react-dom'

import Modal from '../components/modal'
import useToggle from '../useToggle'
import './modal-styles.css'

const ModalWrapper = props => {
  const [open, setOpen] = useToggle(false)
  //   const [username, setUsername] = useState('')

  //   const onChangeUsername = e => setUsername(e.target.value)

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <button type="button" onClick={() => setOpen()}>
        Open Modal
      </button>

      {
        <Modal open={open} toggle={setOpen} onContinue={props.onContinue}>
          <h1>It is going to remove data</h1>

          {/* <form onSubmit={e => e.preventDefault()}>
            <input
              type="text"
              name="username"
              value={username}
              onChange={e => onChangeUsername(e)}
            />
          </form> */}
        </Modal>
      }
    </div>
  )
}

// const rootElement = document.getElementById('root')
// ReactDOM.render(<App />, rootElement)

export default ModalWrapper
