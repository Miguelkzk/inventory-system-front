import { Button, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
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
  var [fields, setFiels] = useState([])
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
    setFiels([]);
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


  const setFormFields = () => {
    attributes.map((attribute) => {
      const field = {
        name: attribute.name,
        type: '',
        label: t(attribute.name),
        options: [],
      };
      if (attribute.type === "integer" ||attribute.type === "decimal") {
        field.type = 'number';
      } else if (attribute.type === "string"){
        field.type="text";
      } else if(attribute.type ==="enum"){
        field.type='select';
        debugger
        field.options = attribute.enum_values.map((value) => ({
          value: value,
          label: t(value),
        }));
      }
      console.log(field)
    })
  }

  const newArticle = () => {
    setTitleModal('New Article')
    setInitialValues({})
    setFormFields()
    console.log(fields)
    setShowModal(true)


  }


  const editArticle = (art) => {
    setTitleModal('Edit')
    setSelectedArticle(art)
    setInitialValues(art)
    setFormFields()
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
          fields={fields}
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