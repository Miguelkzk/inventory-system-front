import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { ArticleService } from "../service/Article";

function HistoricalDemand() {
  const location = useLocation();
  const { article } = location.state || {};
  const [formData, setFormData] = useState({
    demand_period_count: '',
    demand_period_kind: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleSearch = async ()=>{
    const data = await ArticleService.getHistoricalDemand(article,formData )
    console.log(article)
    console.log(formData)
  }
  return (
    <>
      <div className="container" style={{ margin: '1%' }}>
        <h2>Demanda Historica</h2>
        <p>Códgio artículo: {article.code}</p>
        <p>Nombre artículo: {article.name}</p>
        <p>Seleccione como desea ver la demanda histórica (parámetros vacíos es toda la demanda histórica)</p>

        <Form style={{ width: '100%' }}>
          <div style={{ width: '50%', display: 'flex', justifyContent: 'space-between' }}>
            <Form.Group style={{ width: '35%' }}>
              <Form.Label>Cantidad de periodos</Form.Label>
              <Form.Control
                type='number'
                name="demand_period_count"
                value={formData.demand_period_count}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group style={{ width: '35%' }}>
              <Form.Label>Tipo de periodo</Form.Label>
              <Form.Control
                as="select"
                name='demand_period_kind'
                value={formData.demand_period_kind}
                onChange={handleChange}
              >
                <option value="week">Semanal</option>
                <option value="month">Mensual</option>
                <option value="year">Anual</option>
              </Form.Control>
            </Form.Group>
            <Button style={{ height: '40px', marginTop: '5%' }} onClick={()=>{handleSearch()}}>Ver demanda</Button>
          </div>
        </Form>
      </div>

    </>
  );
}

export default HistoricalDemand;
