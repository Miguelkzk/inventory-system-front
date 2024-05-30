import { useLocation, useNavigate } from "react-router-dom";
import { ArticleService } from "../service/Article";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import GenericModal from "../components/GenericModal";
import ConfirmModal from "../components/ConfirmModal";

function ArticleDetail() {
  const location = useLocation();
  const { article: initialArticle } = location.state || {};
  const navigate = useNavigate();

  const [article, setArticle] = useState(initialArticle);
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [initialValues, setInitialValues] = useState({});

  const fields = [
    { name: 'code', type: 'text', label: 'Code' },
    { name: 'name', type: 'text', label: 'Name' },
    { name: 'description', type: 'text', label: 'Description' },
    { name: 'cost', type: 'text', label: 'cost' },
    { name: 'current_stock', type: 'text', label: 'Current Stock' },
    { name: 'estimated_demand', type: 'text', label: 'Estimated demand' },
    { name: 'inventory_model', type: 'text', label: 'Inventory model' },
    { name: 'requested_point', type: 'text', label: 'Requested point' },
    { name: 'security_stock', type: 'text', label: 'Security stock' },

  ];

  const editArticle = (article) => {
    setTitleModal('Edit Article')
    setInitialValues(article);
    setShowModal(true)
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSave = async (formData) => {
    try {
      await ArticleService.updateArticle(formData, article)
      handleCloseModal()
      setArticle(formData);
    } catch (error) {
      console.error(error)
    }
  }

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };
  const handleConfirmDelete = async () => {
    try {
      await ArticleService.deleteArticle(article)
      handleCancelDelete()
      navigate('/')
    } catch (error) {
      console.error(error)
    }

  };
  return (<>
    <div style={{ textAlign: 'left', marginLeft: '2%', marginTop: '2%' }}>
      <h3>Code: {article.code}</h3>
      <h3>Name: {article.name}</h3>
      <h3>Description: {article.description}</h3>
      <h3>Cost: {article.cost}</h3>
      <h3>Current stock: {article.current_stock}</h3>
      <h3>Estemated demand: {article.estimated_demand}</h3>
      <h3>Inventory model: {article.inventory_model}</h3>
      <h3>Requested point: {article.requested_point}</h3>
      <h3>Security stock: {article.security_stock}</h3>
    </div>
    <div style={{ marginLeft: '2%' }}>
      <Button variant="warning" onClick={() => editArticle(article)}>Edit Article</Button>
      <Button variant="danger" style={{ margin: '1%' }} onClick={() => setShowDeleteModal(true)}>Delete Article</Button>
      <Button onClick={() => navigate('/')} >Back</Button>
    </div>
    <GenericModal
      show={showModal}
      handleClose={handleCloseModal}
      title={titleModal}
      fields={fields}
      handleFormSubmit={handleSave}
      initialValues={initialValues}
    />
    <ConfirmModal
      show={showDeleteModal}
      handleClose={handleCancelDelete}
      title="Confirm delete"
      content={`Are you sure you want to delete the article with code: ${article.code} ?`}
      onConfirm={handleConfirmDelete}
      onCancel={handleCancelDelete}
    />
  </>
  )
} export default ArticleDetail;