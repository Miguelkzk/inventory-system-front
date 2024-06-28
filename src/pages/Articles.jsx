import { Button, Table } from "react-bootstrap";
import { useDebugValue, useEffect, useState } from "react";
import GenericModal from "../components/GenericAbmModal";
import { ArticleService } from "../service/Article";
import { useTranslation } from "react-i18next";
import DeleteButton from "../components/Buttons/DeleteButton";
import EditButton from "../components/Buttons/EditButton";
import ConfirmModal from "../components/ConfirmModal";
import GenericTable from "../components/GenericTable";

import { AttributesService } from "../service/AttributesModels";
import GeneralParamsModal from "../components/Article/GeneralParamsModal";
import DemandPrediction from "../components/Article/DemandPrediction";
import { useNavigate } from "react-router-dom";
import NewPurcharseOrden from "../components/PurcharseOrden/NewPurcharseOrder";
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
  const [showGPModal, setshowGPModal] =useState(false);
  const [showPredictDemand, setshowPredictDemand]= useState(false);
  const [showPoModal, setShowPoModal]=useState(false)
  const navigate = useNavigate();

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
    const data = await ArticleService.getAttributes();
    setAttributes(data)
  }

  const attributesToShow = [
    'id',
    'code',
    'name',
    'stock',
    'default_provider_id',
    'default_provider_name',
    'inventory_model',
    'estimated_demand',
    'replenish?',
    'missing?'
  ];


  const handleCloseModal = () => {
    setShowModal(false);
    setshowGPModal(false);
    setInitialValues("")
    setshowPredictDemand(false)
    setShowPoModal(false)
    fetchArticles();
  };


  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };


  const handleConfirmDelete = async () => {
    try {
      await ArticleService.deleteArticle(selectedArticle,)
      handleCancelDelete()
      fetchArticles()
    } catch (error) {
      console.error(error)
    }
  };


  const handleSave = async (formData) => {
    if (Object.keys(initialValues).length === 0 ){
      try {
        await ArticleService.newArticle(formData)
        fetchArticles()
        handleCloseModal()
        setInitialValues("")
      } catch (error) {
        console.error(error)
      }
    }else{
      try {
        await ArticleService.updateArticle(formData,selectedArticle)
        handleCloseModal()
        setInitialValues("")
        fetchArticles()
      } catch (error) {
        console.error(error)
      }
    }

  }


  const newArticle = () => {
    setTitleModal('Nuevo artículo')
    setShowModal(true)
  }


  const editArticle = (art) => {
    setTitleModal('Editar artículo')
    setSelectedArticle(art)
    setInitialValues(art)
    setShowModal(true)
  }


  const handleDelete = (art) => {
    setSelectedArticle(art)
    setTitleModal('Confirmación de eliminación')
    setShowDeleteModal(true)
  }

  const generalParams = (art) =>{
    setSelectedArticle(art)
    setshowGPModal(true)
  }
  const predictDemand = (art) =>{
    setSelectedArticle(art)
    setshowPredictDemand(true)
  }

  const viewHistoricalDemand = (element)=>{
    setSelectedArticle(element)
    navigate("/historical-demand", { state: { article: element } });
  }
  const newPurcharsOrden = (element)=>{
    setArticle(element)
    setShowPoModal(true)
  }

  return (
    <>
      <div className="mt-3" >
        <div style={{width: '100%'}}>
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
          viewElement={viewHistoricalDemand}
          viewButton={true}
          textViewButton={"Demanda histórica"}
          showGButton1 ={true}
          textGButton1={"Parámetros generales"}
          actionshowGButton1 ={generalParams}
          showGButton2={true}
          textGButton2={"Predecir demanda"}
          actionShowGButton={predictDemand}
          showMButton={true}
          textMButton={'Agregar orden de compra'}
          actionShowMButton={newPurcharsOrden}
        />
        </div>
      </div>
      <ConfirmModal
        show={showDeleteModal}
        handleClose={handleCancelDelete}
        title={titleModal}
        content={`¿Seguro que desea eliminar el artículo con código: ${selectedArticle.code} ?`}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
      <GeneralParamsModal
      show={showGPModal}
      handleClose={handleCloseModal}
      initialValues={selectedArticle}
      />

      <DemandPrediction
      show={showPredictDemand}
      handleClose={handleCloseModal}
      initialValues={selectedArticle}
      />

      <NewPurcharseOrden
      show={showPoModal}
      handleClose={handleCloseModal}
      article={article}
      />

    </>

  )
}
export default ArticlesTable;