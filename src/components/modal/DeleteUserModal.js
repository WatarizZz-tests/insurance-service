import React from 'react';
import Modal from 'react-modal';

const DeleteUserModal = ({ isOpen, onRequestClose, onConfirm }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Confirmation Modal"
    >
      <h2>Confirmation</h2>
      <p>Êtes-vous sûr de vouloir changer le mot de passe?</p>
      <button onClick={onRequestClose}>Annuler</button>
      <button onClick={onConfirm}>Confirmer</button>
    </Modal>
  );
};

export default DeleteUserModal;