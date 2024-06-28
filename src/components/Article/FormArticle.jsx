import { Button, Form, Modal, Table } from "react-bootstrap";
import ArtcileForm from "../ArtcileForm";
import { useState } from "react";
import { ProviderServide } from "../../service/Provider";

function Formarticle({ show, handleClose, title, attributes, handleFormSubmit, initialValues }) {
  const exclude = ['deleted_at', 'default_provider_id', 'annual_demand_standard_deviation', 'demand_period_count',
    'demand_period_kind', 'demand_error_calculation_method', 'demand_acceptable_error', 'stock_will_be_checked_at'
  ];
  const dataForm = attributes.filter(attribute => !exclude.includes(attribute.name));

  const [filter, setFilter] = useState('');
  const [currentProvider, setCurrentProvider] = useState(null);
  const [leadTime, setLeadTime] = useState('');
  const [orderCost, setOrderCost] = useState('');
  const [purchaseCost, setPurchaseCost] = useState('');

  const handleInputChange = (e) => {
    setFilter(e.target.value);
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
    handleClose();
  };

  const handleProviderFormSubmit = () => {
    const providerData = {
      provider_id: currentProvider.id,
      lead_time: leadTime,
      order_cost: orderCost,
      purchase_cost: purchaseCost
    };
    console.log("Provider Data: ", providerData); // Aquí podrías hacer algo con estos datos, como enviarlos a una API
  };

  return (
    <>
      <Modal show={show} onHide={handleCloseModal} className="modal-xl">
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ flex: 1, paddingRight: '20px' }}>
              <ArtcileForm attributes={dataForm} onSubmit={handleFormSubmit} initialValues={initialValues} />
            </div>
            <div style={{ flex: 1, paddingLeft: '20px', borderLeft: '1px solid #ddd' }}>
              <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <Form style={{ width: '60%', marginRight: '10%' }}>
                  <Form.Group>
                    <Form.Label>Buscar Proveedor</Form.Label>
                    <Form.Control type="number" value={filter} onChange={handleInputChange} placeholder="Ingrese código" />
                  </Form.Group>
                </Form>
                <Button style={{ maxHeight: '40px', marginTop: '8%' }} onClick={handleSearchProvider}>Buscar</Button>
              </div>
              {currentProvider && (
                <div style={{ width: '80%', marginTop: '2%' }}>
                  <p>Nombre Proveedor: {currentProvider.name}</p>
                  <Form style={{ width: '80%', marginRight: '10%' }}>
                    <Form.Group>
                      <Form.Label>Tiempo de demora</Form.Label>
                      <Form.Control
                        type="text"
                        value={leadTime}
                        onChange={(e) => setLeadTime(e.target.value)}
                        placeholder="Ingrese tiempo de demora"
                      />
                    </Form.Group>
                  </Form>
                  <Form style={{ width: '80%', marginRight: '10%' }}>
                    <Form.Group>
                      <Form.Label>Costo de orden</Form.Label>
                      <Form.Control
                        type="text"
                        value={orderCost}
                        onChange={(e) => setOrderCost(e.target.value)}
                        placeholder="Ingrese costo de orden"
                      />
                    </Form.Group>
                  </Form>
                  <Form style={{ width: '80%', marginRight: '10%' }}>
                    <Form.Group>
                      <Form.Label>Costo de compra</Form.Label>
                      <Form.Control
                        type="text"
                        value={purchaseCost}
                        onChange={(e) => setPurchaseCost(e.target.value)}
                        placeholder="Ingrese costo de compra"
                      />
                    </Form.Group>
                  </Form>
                  <div>
                  </div>
                </div>
              )}
            <div>
            <Table>
                <thead>
                  <tr>
                    <th>Codigo P</th>
                    <th>Tiempo Demora</th>
                    <th>Costo orden</th>
                    <th>Costo de compra</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                </tbody>
              </Table>
            </div>
            </div>
          </div>
          <hr />
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2%' }}>
            <Button onClick={handleProviderFormSubmit}>Guardar</Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Formarticle;
