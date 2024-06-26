import { Button, Form, Modal } from "react-bootstrap";
import GeneralParamsForm from "./GeneralParamsForm";
import { useDebugValue, useEffect, useState } from "react";
import WeightedAverage from "./WeightedAverage";
import { ArticleService } from "../../service/Article";

function DemandPrediction({ show, handleClose, initialValues }) {
    const [showPMform, setShowPMform] = useState(false);
    const [showPMPform, setShowPMPform] = useState(false);
    const [showPMSEform, setShowPMPSform] = useState(false);
    const [showRLform, setShowRLform] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [ponderaciones, setPonderaciones] = useState([]);
    const [demandPrediction, setDemandPrediction] =useState({})

    const [formData, setFormData] = useState({
        demand_period_count: 0,
        demand_error_calculation_method: 0,
        demand_acceptable_error: 0,
        demand_period_kind: ''
    });

    useEffect(() => {
        if (initialValues) {
            setFormData({
                demand_period_count: initialValues.demand_period_count || '',
                demand_error_calculation_method: initialValues.demand_error_calculation_method || '',
                demand_acceptable_error: initialValues.demand_acceptable_error || '',
                demand_period_kind: initialValues.demand_period_kind || ''
            });
        }
    }, [initialValues]);

    const handleChangeGeneralParams = (e) => {
        const { name, value } = e.target;
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
        setPonderaciones([]);
        setPmseParams({
            predicted_demand_for_the_previous_period: '',
            alpha: ''
        })
    }, [show]);

    const handleSubmit = async () => {
        const methods = [];
        if (showPMform){ methods.push("moving_average")}
        if (showPMPform){methods.push("weighted_moving_average")}
        if (showPMSEform){methods.push("exponentially_smoothed_moving_average")}
        if (showRLform){methods.push("linear_regression")}
        const data = await ArticleService.predictDemand(formData,methods,pmseParams,initialValues.id,ponderaciones)
        setDemandPrediction(data)
        setShowResults(true)
    }

    const handleonWeightingsChange = (newPonderaciones) => {
        setPonderaciones(newPonderaciones);
    };
    const [pmseParams, setPmseParams] = useState({
        predicted_demand_for_the_previous_period: '',
        alpha: ''
    });
    const handleChangePmseParams = (e) => {
        const { name, value } = e.target;
        setPmseParams({
            ...pmseParams,
            [name]: value
        });
    };

    return (<>
        <Modal show={show} onHide={handleClose} className="modal-lg"  >
            <Modal.Header closeButton>
                <Modal.Title style={{ fontSize: '30px' }}>Predecir Demanda</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ Width: '80%' }}>
                <div style={{ display: 'flex', height: '100%', flexDirection: 'row' }}>
                    <div style={{ flex: 1, paddingRight: '10px', borderRight: '1px solid #ddd' }}>
                        <h3>Parámetros generales</h3>
                        <GeneralParamsForm
                            formData={formData}
                            handleChange={handleChangeGeneralParams}
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
                                <WeightedAverage onWeightingsChange={handleonWeightingsChange} />
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
                                                name="predicted_demand_for_the_previous_period"
                                                value={pmseParams.predicted_demand_for_the_previous_period}
                                                onChange={handleChangePmseParams}
                                            />
                                        </Form.Group>
                                        <Form.Group style={{ width: '45%' }}>
                                            <Form.Label>Coeficiente de suavizacion</Form.Label>
                                            <Form.Control
                                                type="number"
                                                name="alpha"
                                                value={pmseParams.alpha}
                                                onChange={handleChangePmseParams}
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
                        <div style={{ flex: 1, paddingLeft: '15px', overflowY: 'auto', width: '50%' }}>
                            <h4> Resultado de prediccion</h4>
                            {showPMform && <div>
                                <hr />
                                <h5>Promedio movil</h5>
                                <p>Resultado: {demandPrediction.moving_average} </p>
                                <p>Error: </p>
                                <hr />
                            </div>}
                            {showPMPform && <div>
                                <hr />
                                <h5>Promedio movil ponderado</h5>
                                <p>Resultado: {demandPrediction.weighted_moving_average} </p>
                                <p>Error: </p>
                                <hr />
                            </div>}
                            {showPMSEform && <div>
                                <hr />
                                <h5>Promedio movil suavizado exponencialmente</h5>
                                <p>Resultado: {demandPrediction.exponentially_smoothed_moving_average} </p>
                                <p>Error: </p>
                                <hr />
                            </div>}
                            {showRLform && <div>
                                <hr />
                                <h5>Regresión lineal</h5>
                                <p>Resultado: {demandPrediction.linear_regression} </p>
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