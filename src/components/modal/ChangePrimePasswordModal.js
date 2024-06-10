import React from 'react';
import Modal from 'react-modal';


const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  content: {
    position: 'relative',
    background: '#fff',
    borderRadius: '8px',
    padding: '20px',
    maxWidth: '500px',
    width: '100%',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
    inset: 'auto',
    overflow: 'auto',
  },
};

const ChangePrimePasswordModal = ({ isOpen, onRequestClose, onConfirm }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Confirmation Modal"
      style={customStyles}
    >
      <h2>Confirmation</h2>
      <p>Êtes-vous sûr de vouloir changer le mot de passe?</p>
      <button style={buttonStyle} onClick={onRequestClose}>Annuler</button>
      <button style={confirmButtonStyle} onClick={onConfirm}>Confirmer</button>
    </Modal>
  );
};
const buttonStyle = {
  background: '#3498db',
  border: 'none',
  color: 'white',
  padding: '10px 20px',
  borderRadius: '5px',
  cursor: 'pointer',
  marginRight: '10px',
  marginTop: '10px',
};

const confirmButtonStyle = {
  ...buttonStyle,
  background: '#e74c3c',
};


export default ChangePrimePasswordModal;