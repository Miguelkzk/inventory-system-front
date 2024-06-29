import { Button, Form, Modal, Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import ArtcileForm from "../ArtcileForm";
import { ProviderServide } from "../../service/Provider";
import { ArticleService } from "../../service/Article";

function Formarticle({ show, handleClose, title, attributes, handleFormSubmit, initialValues }) {
  const exclude = [
    'deleted_at', 'annual_demand_standard_deviation', 'demand_period_count',
    'demand_period_kind', 'demand_error_calculation_method', 'demand_acceptable_error', 'stock_will_be_checked_at'
  ];
  const dataForm = attributes.filter(attribute => !exclude.includes(attribute.name));

  const [filter, setFilter] = useState('');
  const [currentProvider, setCurrentProvider] = useState(null);
  const [leadTime, setLeadTime] = useState('');
  const [orderCost, setOrderCost] = useState('');
  const [purchaseCost, setPurchaseCost] = useState('');
  const [articleProviders, setArticleProviders] = useState([]);
  const [formState, setFormState] = useState(initialValues);

  // Bandera para determinar si estamos editando o creando un artículo
  const isEditing = Boolean(initialValues && initialValues.id);

  useEffect(() => {
    if (initialValues && initialValues.article_providers) {
      setArticleProviders(initialValues.article_providers);
    }
    setFormState(initialValues);
  }, [initialValues]);

  const handleInputChange = (e) => {
    const { value } = e.target;
    setFilter(value);
  };

  const handleSearchProvider = async () => {
    const data = await ProviderServide.getProvider(filter);
    setCurrentProvider(data);
  };

  const handleCloseModal = () => {
    setFilter('');
    setCurrentProvider(null);
    setLeadTime('');
    setOrderCost('');
    setPurchaseCost('');
    setArticleProviders(initialValues?.article_providers || []);
    setFormState(initialValues);
    handleClose();
  };

  const handleProviderFormSubmit = () => {
    if (currentProvider) {
      const newProvider = {
        provider_id: currentProvider.id,
        lead_time: leadTime,
        order_cost: orderCost,
        purchase_cost: purchaseCost
      };
      setArticleProviders(prevProviders => {
        // Check if the provider already exists in the array
        const existingProvider = prevProviders.find(provider => provider.id === newProvider.id);
        if (existingProvider) {
          // Update the existing provider
          return prevProviders.map(provider =>
            provider.id === newProvider.id ? newProvider : provider
          );
        } else {
          // Add the new provider
          return [...prevProviders, newProvider];
        }
      });
      setCurrentProvider(null);
      setLeadTime('');
      setOrderCost('');
      setPurchaseCost('');
    }
  };

  const handleDeleteProvider = (id) => {
    setArticleProviders(articleProviders.filter(provider => provider.id !== id));
  };

  const handleArticleFormSubmit = (formData) => {
    setFormState(formData);
  };

  const handleSave = async () => {
    const completeFormData = {
      ...formState,
      article_providers_attributes: articleProviders
    };

    try {
      if (isEditing) {
        console.log(completeFormData)
       // await ArticleService.updateArticle(completeFormData,formState );
        console.log("e")
      } else {
        console.log(completeFormData)
        await ArticleService.newArticle(completeFormData);
        console.log("n")

      }
      handleCloseModal();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal show={show} onHide={handleCloseModal} className="modal-xl">
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ flex: 1, paddingRight: '20px' }}>
            <ArtcileForm
              attributes={dataForm}
              onSubmit={handleArticleFormSubmit}
              initialValues={formState}
            />
          </div>
          <div style={{ flex: 1, paddingLeft: '20px', borderLeft: '1px solid #ddd' }}>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <Form style={{ width: '60%', marginRight: '10%' }}>
                <Form.Group>
                  <Form.Label>Buscar Proveedor</Form.Label>
                  <Form.Control type="text" value={filter} onChange={handleInputChange} placeholder="Ingrese código" />
                </Form.Group>
              </Form>
              <Button style={{ maxHeight: '40px', marginTop: '8%' }} onClick={handleSearchProvider}>Buscar</Button>
            </div>
            {currentProvider && (
              <div style={{ width: '80%', marginTop: '2%' }}>
                <p>Nombre Proveedor: {currentProvider.name}</p>
                <Form.Group>
                  <Form.Label>Tiempo de demora</Form.Label>
                  <Form.Control
                    type="text"
                    value={leadTime}
                    onChange={(e) => setLeadTime(e.target.value)}
                    placeholder="Ingrese tiempo de demora"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Costo de orden</Form.Label>
                  <Form.Control
                    type="text"
                    value={orderCost}
                    onChange={(e) => setOrderCost(e.target.value)}
                    placeholder="Ingrese costo de orden"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Costo de compra</Form.Label>
                  <Form.Control
                    type="text"
                    value={purchaseCost}
                    onChange={(e) => setPurchaseCost(e.target.value)}
                    placeholder="Ingrese costo de compra"
                  />
                </Form.Group>
                <div>
                  <Button onClick={handleProviderFormSubmit}>Agregar Proveedor</Button>
                </div>
              </div>
            )}
            <div style={{ marginTop: '20px' }}>
              <Table>
                <thead>
                  <tr>
                    <th>Codigo P</th>
                    <th>Nombre</th>
                    <th>Tiempo Demora</th>
                    <th>Costo orden</th>
                    <th>Costo de compra</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {articleProviders.map(provider => (
                    <tr key={provider.id}>
                      <td>{provider.provider_id}</td>
                      <td>{provider.name}</td>
                      <td>{provider.lead_time}</td>
                      <td>{provider.order_cost}</td>
                      <td>{provider.purchase_cost}</td>
                      <td>
                        <Button variant="danger" onClick={() => handleDeleteProvider(provider.id)}>Eliminar</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button onClick={handleSave}>Guardar</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default Formarticle;
