import React from 'react';
import Modal from 'react-modal';
import '../styles/Deletefile.css'; // Import the CSS file

const ConfirmDeleteModal = ({ isOpen, onRequestClose, onConfirm, productName }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Confirm Delete"
      ariaHideApp={false}
      className="modal"
      overlayClassName="overlay"
    >
      <h2>ARE YOU SURE?</h2>
      <p>You will not be able to undo this action if you proceed!</p>
      <button onClick={onRequestClose}>Cancel</button>
      <button onClick={onConfirm}>Delete</button>
    </Modal>
  );
};

export default ConfirmDeleteModal;
