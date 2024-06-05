import { Button, Table } from "react-bootstrap";
import { useDebugValue, useEffect, useState } from "react";
import GenericModal from "../components/GenericModal";
import { ArticleService } from "../service/Article";
import { useTranslation } from "react-i18next";
import DeleteButton from "../components/DeleteButton";
import EditButton from "../components/EditButton";
import ConfirmModal from "../components/ConfirmModal";
import GenericTable from "../components/GenericTable";

import { AttributesService } from "../service/AttributesModels";
function ArticlesTable() {

  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState('');
  const [articles, setArticles] = useState([]);
  const [initialValues, setInitialValues] = useState({});
  const [article, setArticle] = useState({})
  const { t } = useTranslation();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState({})
  const [attributes, setAttributes] = useState([])


  useEffect(() => {
    fetchArticles();
    fetchAttributes();
  }, []);


  const fetchArticles = async () => {
    const articlesData = await ArticleService.getArticles()
    setArticles(articlesData)
    setArticle(articlesData[0])
  }

  const fetchAttributes = async () => {
    const data = await AttributesService.get('Article')
    setAttributes(data.attributes)
  }
  const attributesToExclude = ['created_at', 'updated_at', 'id'];
  const attributesToShow = Object.keys(article).filter(attribute => !attributesToExclude.includes(attribute));


  const handleCloseModal = () => {
    setShowModal(false);
    setInitialValues("")
  };


  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };


  const handleConfirmDelete = async () => {
    try {
      await ArticleService.deleteArticle(selectedArticle)
      handleCancelDelete()
      fetchArticles()
    } catch (error) {
      console.error(error)
    }
  };


  const handleSave = async (formData) => {
    console.log(formData)
    try {
      await ArticleService.newArticle(formData)
      fetchArticles()
      handleCloseModal()
      fields = [];
    } catch (error) {
      console.error(error)
    }
  }


  const newArticle = () => {
    setTitleModal('New Article')
    setShowModal(true)
  }


  const editArticle = (art) => {
    setTitleModal('Edit')
    setSelectedArticle(art)
    setInitialValues(art)
    setShowModal(true)

  }


  const handleDelete = (art) => {
    setSelectedArticle(art)
    setTitleModal('Confirmación de eliminación')
    setShowDeleteModal(true)

  }

  return (
    <>
      <div className="container mt-3">
        <Button onClick={() => newArticle()}>{t('New article')}</Button>

        <GenericModal
          show={showModal}
          handleClose={handleCloseModal}
          title={titleModal}
          attributes={attributes}
          handleFormSubmit={handleSave}
          initialValues={initialValues}
        />
        <GenericTable
          attributesToShow={attributesToShow}
          elements={articles}
          editElement={editArticle}
          deleteElement={handleDelete}
          viewElement={null}
          viewButton={null}
          textViewButton={null}
        />
      </div>
      <ConfirmModal
        show={showDeleteModal}
        handleClose={handleCancelDelete}
        title={titleModal}
        content={`¿Seguro que desea eliminar el artículo con código: ${selectedArticle.code} ?`}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </>

  )
}
export default ArticlesTable;