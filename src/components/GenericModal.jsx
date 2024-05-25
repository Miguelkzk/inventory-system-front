import { Modal } from "react-bootstrap";
import GenericForm from "./GenericForm";

function GenericModal({ show, handleClose, title, fields, handleFormSubmit }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <GenericForm fields={fields} onSubmit={handleFormSubmit} />
      </Modal.Body>
    </Modal>
  )
} export default GenericModal;