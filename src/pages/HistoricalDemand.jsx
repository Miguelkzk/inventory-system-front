import { useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { ArticleService } from "../service/Article";
import GenericModal from "../components/GenericAbmModal";

function HistoricalDemand() {
  const location = useLocation();
  const { article } = location.state || {};
  const [attributes]= useState([{name:'sold_at', type: 'date'}, {name: 'quantity', type: 'integer'} ])
  const [showModal, setShowModal] =useState(false)
  const [initialValues, setInitialValues]=useState({})
  const [dataForm, setDataForm] = useState({
    demand_period_count: '',
    demand_period_kind: ''
  });
  const [HistoricalDemand, setHistoricalDemand] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm({
      ...dataForm,
      [name]: value
    });
  };
  const handleSearch = async () => {
    const data = await ArticleService.getHistoricalDemand(article, dataForm)
    setHistoricalDemand(data)
  }
  const hanldeShowModal = ()=>{
    setShowModal(true)
  }
  const handleCloseModal = ()=>{
    setShowModal(false)
  }
  const handleSave = async (formData)=>{
    console.log(formData)
    const detial = {
      article_id: article.id,
      quantity: formData.quantity
    }
    const historical_demand = {
      sold_at: formData.sold_at,
      article_sales_attributes:[detial]
    }
    try{
      await ArticleService.addDemandHistorical(historical_demand)
      handleCloseModal()
    }catch (error){
      console.log(error)
    }
  }
  return (
    <>
      <div className="container" style={{ margin: '1%' }}>
      <div style={{display:'flex', width:'55%', justifyContent:'space-between'}}>
        <h2>Demanda Historica</h2>
        <Button onClick={()=>{hanldeShowModal()}}>Nueva demanda Historica</Button>
        </div>
        <p>Códgio artículo: {article.code}</p>
        <p>Nombre artículo: {article.name}</p>
        <p>Seleccione como desea ver la demanda histórica</p>

        <Form style={{ width: '100%' }}>
          <div style={{ width: '50%', display: 'flex', justifyContent: 'space-between' }}>
            <Form.Group style={{ width: '35%' }}>
              <Form.Label>Cantidad de periodos</Form.Label>
              <Form.Control
                type='number'
                placeholder="Vacio para todos"
                name="demand_period_count"
                value={dataForm.demand_period_count}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group style={{ width: '35%' }}>
              <Form.Label>Tipo de periodo</Form.Label>
              <Form.Control
                as="select"
                name='demand_period_kind'
                value={dataForm.demand_period_kind}
                onChange={handleChange}
                className="form-select"
              >
                <option value="month">Mensual</option>
                <option value="week">Semanal</option>
                <option value="year">Anual</option>
              </Form.Control>
            </Form.Group>
            <Button style={{ height: '40px', marginTop: '5%' }} onClick={() => { handleSearch() }}>Ver demanda</Button>
          </div>
        </Form>
        {HistoricalDemand && (
          <div style={{width:'80%', marginTop:'3%'}}>
            <Table striped bordered hover style={{ width: '66%', textAlign: 'center' }}>
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Demanda</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(HistoricalDemand).map(([date, demand]) => (
                  <tr key={date}>
                    <td>{date}</td>
                    <td>{demand}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </div>
      <GenericModal
        show={showModal}
        handleClose={handleCloseModal}
        title={"Nueva demanda histórica"}
        attributes={attributes}
        handleFormSubmit={handleSave}
        initialValues={initialValues}
        />
    </>
  );
}

export default HistoricalDemand;
