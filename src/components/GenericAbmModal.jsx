import React from 'react';
import { Modal } from 'react-bootstrap';
import GenericForm from './GenericAbmForm';

function GenericModal({ show, handleClose, title, attributes, handleFormSubmit, initialValues }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <GenericForm attributes={attributes} onSubmit={handleFormSubmit} initialValues={initialValues} />
      </Modal.Body>
    </Modal>
  );
}

export default GenericModal;
