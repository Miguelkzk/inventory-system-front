import { Button, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import GenericModal from "../components/GenericModal";
import { ArticleService } from "../service/Article";
import { useTranslation } from "react-i18next";
import DeleteButton from "../components/DeleteButton";
import EditButton from "../components/EditButton";
import ConfirmModal from "../components/ConfirmModal";

function ArticlesTable() {

  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState('');
  const [articles, setArticles] = useState([]);
  const [initialValues, setInitialValues] = useState({});
  const [article, setArticle] = useState({})
  const { t } = useTranslation();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState({})
  var [fields, setFiels] =useState([])
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
      fields=[];
    } catch (error) {
      console.error(error)
    }
  }
  const setFormFields = () => {
    attributesToShow.map((attribute) => {
      const field = {
        name: '',
        type: 'text',
        label: '',
      };
      field.name = attribute;
      field.label = t(attribute);
      setFiels(prevFiels=>[...prevFiels,field]);
    });
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

  const fetchArticles = async () => {
    const articlesData = await ArticleService.getArticles()
    setArticles(articlesData)
    setArticle(articlesData[0])
  }

  useEffect(() => {
    fetchArticles();
  }, []);

  const attributesToExclude = ['created_at', 'updated_at', 'id'];
  const attributesToShow = Object.keys(article).filter(attribute => !attributesToExclude.includes(attribute));
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

        <Table style={{ textAlign: 'center' }}>
          <thead>
            <tr>
              {attributesToShow.map((attribute, index) => (
                <th key={index}>{t(attribute)}</th>
              ))}
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody >
            {articles.map((art) => (
              <tr key={art.id}>
                {attributesToShow.map((attribute, attrIndex) => (
                  <td key={attrIndex}>{t(art[attribute])}</td>
                ))}
                <td><EditButton  onClick={()=>editArticle(art)}/></td>
                <td><DeleteButton onClick={() => handleDelete(art)} /></td>
              </tr>
            ))}
          </tbody>
        </Table>
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