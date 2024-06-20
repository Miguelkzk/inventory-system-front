import { useLocation, useNavigate } from "react-router-dom";
import { ArticleService } from "../service/Article";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import GenericModal from "../components/GenericAbmModal";
import ConfirmModal from "../components/ConfirmModal";
import { useTranslation } from "react-i18next";

function ArticleDetail() {
  const location = useLocation();
  const { article: initialArticle } = location.state || {};
  const navigate = useNavigate();
  const { t, i18n } = useTranslation(); 
  const [article, setArticle] = useState(initialArticle);
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [initialValues, setInitialValues] = useState({});

  const fields = [
    { name: 'code', type: 'text', label: t("code") },
    { name: 'name', type: 'text', label: t('name') },
    { name: 'description', type: 'text', label: t('Description') },
    { name: 'cost', type: 'text', label: t('Cost') },
    { name: 'current_stock', type: 'text', label: t('Current stock') },
    { name: 'estimated_demand', type: 'text', label: t('estimated demand') },
    { name: 'inventory_model', type: 'text', label: t('inventory model') },
    { name: 'requested_point', type: 'text', label: t('requested point') },
    { name: 'security_stock', type: 'text', label: t('security stock') },

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
      <h3>{t('code')}: {article.code}</h3>
      <h3>{t('name')}: {article.name}</h3>
      <h3>{t('Description')}: {article.description}</h3>
      <h3>{t('Cost')}: {article.cost}</h3>
      <h3>{t('Current stock')}: {article.current_stock}</h3>
      <h3>{t('estimated demand')} {article.estimated_demand}</h3>
      <h3>{t('inventory model')}: {article.inventory_model}</h3>
      <h3>{t('requested point')}:{article.requested_point}</h3>
      <h3>{t('security stock')}: {article.security_stock}</h3>
    </div>
    <div style={{ marginLeft: '2%' }}>
      <Button variant="warning" onClick={() => editArticle(article)}>{t('edit article')}</Button>
      <Button variant="danger" style={{ margin: '1%' }} onClick={() => setShowDeleteModal(true)}>{t('delete article')}</Button>
      <Button onClick={() => navigate('/')} >{t('back')}</Button>
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