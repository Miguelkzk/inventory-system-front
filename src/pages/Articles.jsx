import { Button, Modal, Table } from "react-bootstrap";
import GenericForm from "../components/GenericForm";
import { useState } from "react";
import GenericModal from "../components/GenericModal";

function ArticlesTable() {
  const fields = [
    { name: 'code', type: 'text', label: 'code' },
    { name: 'name', type: 'text', label: 'name' },
    { name: 'description', type: 'text', label: 'description' },
    { name: 'current stock', type: 'text', label: 'current stock' },
  ];
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState('')

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleSave = async (formData) => {
    console.log(formData)
  }
  const newArticle = () => {
    setTitleModal('New Article')
    setShowModal(true)
  }

  return (
    <>
      <div className="container mt-3">
        <Button onClick={() => newArticle()}>New article</Button>

        <GenericModal
          show={showModal}
          handleClose={handleCloseModal}
          title={titleModal}
          fields={fields}
          onSave={handleSave}
        />
        <Table hover style={{ fontSize: '18px', marginTop: '1rem' }}>
          <thead style={{ textAlign: 'center' }} >
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Description</th>
              <th>Current stock</th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </Table >
      </div>
    </>

  )
}
export default ArticlesTable;