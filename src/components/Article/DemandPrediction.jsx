import { Button, Form, Modal } from "react-bootstrap";
import GeneralParamsForm from "./GeneralParamsForm";
import { useDebugValue, useEffect, useState } from "react";
import WeightedAverage from "./WeightedAverage";

function DemandPrediction({ show, handleClose, initialValues }) {
    const [formData, setFormData] = useState(initialValues)
    const [showPMform, setShowPMform] = useState(false);
    const [showPMPform, setShowPMPform] = useState(false);
    const [showPMSEform, setShowPMPSform] = useState(false);
    const [showRLform, setShowRLform] = useState(false);
    const [showResults, setShowResults] = useState(false);
    useEffect(() => {
        setFormData(initialValues);
        setShowResults(false);
    }, [initialValues])


    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;
        const fieldValue = type === 'checkbox' ? checked : value;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    useEffect(() => {
        if (!show) {
            setShowResults(false);
            setShowPMform(false);
            setShowPMPform(false);
            setShowPMPSform(false);
            setShowRLform(false);
        }
    }, [show]);

    const handleSubmit = () => {
        setShowResults(true)
    }
    return (<>
        <Modal show={show} onHide={handleClose} className="modal-lg"  >
            <Modal.Header closeButton>
                <Modal.Title style={{fontSize:'30px'}}>Predecir Demanda</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ Width: '80%' }}>
                <div style={{ display: 'flex', height: '100%', flexDirection: 'row' }}>
                    <div style={{ flex: 1, paddingRight: '10px', borderRight: '1px solid #ddd' }}>
                        <h3>Parámetros generales</h3>
                        <GeneralParamsForm
                            formData={formData}
                            handleChange={handleChange}
                        />
                        <hr />
                        <h4>Seleccionar los métodos para la predicción</h4>
                        <Form>
                            <Form.Group>
                                <Form.Check
                                    type="checkbox"
                                    label="Promedio Móvil"
                                    checked={showPMform}
                                    onChange={() => setShowPMform(!showPMform)}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Check
                                    type="checkbox"
                                    label="Promedio Móvil Ponderado"
                                    checked={showPMPform}
                                    onChange={() => setShowPMPform(!showPMPform)} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Check
                                    type="checkbox"
                                    label="Promedio Móvil suavizado exponencialmente"
                                    checked={showPMSEform}
                                    onChange={() => setShowPMPSform(!showPMSEform)} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Check
                                    type="checkbox"
                                    label="Regresión lineal"
                                    checked={showRLform}
                                    onChange={() => setShowRLform(!showRLform)}
                                />
                            </Form.Group>
                        </Form>
                        <hr />
                        {showPMPform && (
                            <div>
                                <h4>Párametros promedio móvil ponderado</h4>
                                <WeightedAverage />
                                <hr />
                            </div>

                        )}
                        {showPMSEform && (
                            <div>
                                <h4>Parámetros suavizado exponencial</h4>
                                <Form>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                        <Form.Group style={{ width: '45%' }}>
                                            <Form.Label >Prediccion del ultimo periodo</Form.Label>
                                            <Form.Control
                                                type="number"
                                            />
                                        </Form.Group>
                                        <Form.Group  style={{width:'45%'}}>
                                            <Form.Label>Coeficiente de suavizacion</Form.Label>
                                            <Form.Control
                                                type="number"
                                            />
                                        </Form.Group>
                                    </div>
                                </Form>
                                <hr />
                            </div>
                        )}
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '4%' }}>
                            <Button variant="primary" onClick={() => handleSubmit()} >Calcular</Button>
                        </div>
                    </div>
                    {showResults && (
                        <div style={{ flex: 1, paddingLeft: '15px', overflowY: 'auto', width:'50%' }}>
                            <h4> Resultado de prediccion</h4>
                            {showPMform && <div>
                                <hr />
                                <h5>Promedio movil</h5>
                                <p>Resultado: </p>
                                <p>Error: </p>
                                <hr />
                            </div>}
                            {showPMPform && <div>
                                <hr />
                                <h5>Promedio movil ponderado</h5>
                                <p>Resultado: </p>
                                <p>Error: </p>
                                <hr />
                            </div>}
                            {showPMSEform && <div>
                                <hr />
                                <h5>Promedio movil suavizado exponencialmente</h5>
                                <p>Resultado: </p>
                                <p>Error: </p>
                                <hr />
                            </div>}
                            {showRLform && <div>
                                <hr />
                                <h5>Regresión lineal</h5>
                                <p>Resultado: </p>
                                <p>Error: </p>
                                <hr />
                            </div>}
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <Button>Guardar prediccion</Button>
                            </div>
                            <div style={{ marginTop: '4%', display: 'flex', justifyContent: 'center' }}>
                                <Button>Generar orden de compra</Button>
                            </div>
                        </div>
                    )}

                </div>
            </Modal.Body>
        </Modal>
    </>)
} export default DemandPrediction;