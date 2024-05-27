import { Modal } from "react-bootstrap";
import GenericForm from "./GenericForm";

function GenericModal({ show, handleClose, title, fields, handleFormSubmit, initialValues }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <GenericForm fields={fields} onSubmit={handleFormSubmit} initialValues={initialValues} />
      </Modal.Body>
    </Modal>
  )
} export default GenericModal;