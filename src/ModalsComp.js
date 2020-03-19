import React, {useContext} from 'react'
import {StateHolder} from './StateHolder'
import Modal from 'react-modal'

Modal.setAppElement('#root')

const ModalsComp = props => {
  const {modalIsOpen, setModalIsOpen} = useContext(StateHolder) // sharing these functions,variables and states with this component.

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)'
    }
  }

  return (
    <Modal
      style={customStyles}
      isOpen={Boolean(modalIsOpen)} // the object value is true and that opens the modal. The default value was set to null.
      shouldCloseOnOverlayClick={false}
      onRequestClose={() => setModalIsOpen(null)}
    >
      <h5>outside modal</h5>
      <div>
        <h4>{modalIsOpen ? modalIsOpen.movieObject.title : null}</h4>
      </div>
      <p> {modalIsOpen ? modalIsOpen.movieObject.overview : null}</p>

      <div>
        <button onClick={() => setModalIsOpen(null)}>X</button>
      </div>
    </Modal>
  )
}
export default ModalsComp
