import { useEffect, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { ArticleService } from "../../service/Article";
import { PucharseOrderService } from "../../service/PucharseOrder";

function NewPurcharseOrder({ show, handleClose, article }) {
  const [providers, setProviders] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState('');
  const [cgi, setCgi] = useState('');
  const [optimalLot, setOptimalLot] = useState('');
  const [useDifferentQuantity, setUseDifferentQuantity] = useState(false);
  const [differentQuantity, setDifferentQuantity] = useState('');
  const [activePurcharseOrden, setactivePurcharseOrden] =useState(true)

  useEffect(() => {
    if (article && article.id) {
      fetchProviders();
      resetForm();
    }
  }, [article]);

  useEffect(() => {
    if (selectedProvider) {
      fetchData();
    }
  }, [selectedProvider]);

  const fetchProviders = async () => {
    try {
      const data = await ArticleService.ArticleProviders(article);
      if (article.default_provider_id) {
        const defaultProvider = data.find(provider => provider.id === article.default_provider_id);
        const otherProviders = data.filter(provider => provider.id !== article.default_provider_id);
        const reorderedProviders = [defaultProvider, ...otherProviders];
        setProviders(reorderedProviders);
        setSelectedProvider(article.default_provider_id);
      } else {
        setProviders(data);
        if (data.length > 0) {
          setSelectedProvider(data[0].id); 
        }
      }
    } catch (error) {
      console.error('Error fetching providers:', error);
    }
  };

  const handleChange = (e) => {
    setSelectedProvider(e.target.value);
  };

  const handleCheckboxChange = (e) => {
    setUseDifferentQuantity(e.target.checked);
    if (!e.target.checked) {
      setDifferentQuantity('');
    }
  };

  const handleQuantityChange = (e) => {
    setDifferentQuantity(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const quantity = useDifferentQuantity ? differentQuantity : optimalLot;
    await PucharseOrderService.newOrder(quantity, article)
    handleClose();
  };

  const fetchData = async () => {
    try {
      const cgiData = await ArticleService.cgi(article, selectedProvider);
      const optimalLotData = await ArticleService.optimalLot(article, selectedProvider);
      setCgi(cgiData);
      setOptimalLot(optimalLotData);
      const ActivePU = await ArticleService.activePurcharseOrden(article);

      if (ActivePU.length === 0){
        setactivePurcharseOrden(false)}
      else{setactivePurcharseOrden(true)}

    } catch (error) {
      console.error('Error fetching data:', error);
      setCgi('Error fetching CGI');
      setOptimalLot('Error fetching optimal lot');
    }
  };

  const resetForm = () => {
    setUseDifferentQuantity(false);
    setDifferentQuantity('');
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title style={{ fontSize: '30px' }}>Nueva orden de compra</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="providerSelect">
            <Form.Label>Proveedor</Form.Label>
            <Form.Control as="select" value={selectedProvider} onChange={handleChange} className="form-select">
              {providers.map((provider) => (
                <option key={provider.id} value={provider.id}>
                  {provider.name} {provider.id === article.default_provider_id && '(Proveedor por defecto)'}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <div style={{ marginTop: "2%" }}>
            {optimalLot && <p>Lote óptimo: {optimalLot}</p>}
            {cgi && <p>CGI: {cgi}</p>}
          </div>
          <Form.Group controlId="useDifferentQuantity">
            <Form.Check
              type="checkbox"
              label="Usar una cantidad distinta al lote óptimo"
              checked={useDifferentQuantity}
              onChange={handleCheckboxChange}
            />
          </Form.Group>
          {useDifferentQuantity && (
            <div style={{marginTop:"2%"}}>
            <Form.Group controlId="differentQuantity">
              <Form.Label>Cantidad</Form.Label>
              <Form.Control
                type='number'
                placeholder="Ingrese cantidad"
                value={differentQuantity}
                onChange={handleQuantityChange}
              />
            </Form.Group>
            </div>
          )}
          <hr/>
          {activePurcharseOrden && <p style={{color:'red', fontSize:'20px'}}class="badge badge-warning">Ya hay ordenes activas para este producto</p>}
          <div style={{width:'100%', display:'flex', justifyContent:'center'}}>
          <Button variant="primary" type="submit">Crear orden</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default NewPurcharseOrder;
