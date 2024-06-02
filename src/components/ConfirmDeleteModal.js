import React from 'react';
import Modal from 'react-modal';

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
      <h2>Confirm Deletion</h2>
      <p>Are you sure you want to delete the product "{productName}"?</p>
      <button onClick={onConfirm}>Yes</button>
      <button onClick={onRequestClose}>No</button>
    </Modal>
  );
};

export default ConfirmDeleteModal;
