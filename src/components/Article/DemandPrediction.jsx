import { Breadcrumb, Button, Form, Modal } from "react-bootstrap";
import GeneralParamsForm from "./GeneralParamsForm";
import { useEffect, useState } from "react";
import WeightedAverage from "./WeightedAverage";
import { ArticleService } from "../../service/Article";
import { PucharseOrderService } from "../../service/PucharseOrder";

function DemandPrediction({ show, handleClose, initialValues }) {
    const [showPMform, setShowPMform] = useState(false);
    const [showPMPform, setShowPMPform] = useState(false);
    const [showPMSEform, setShowPMSEform] = useState(false);
    const [showRLform, setShowRLform] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [ponderaciones, setPonderaciones] = useState([]);
    const [demandPrediction, setDemandPrediction] = useState({});
    const [selectedMethod, setSelectedMethod] = useState('');
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
            setShowPMSEform(false);
            setShowRLform(false);
            setPonderaciones([]);
            setPmseParams({
                predicted_demand_for_the_previous_period: '',
                alpha: ''
            });
            setDemandPrediction({});
            setSelectedMethod('');
        }
    }, [show]);

    const handleSubmit = async () => {
        const methods = [];
        if (showPMform) methods.push("moving_average");
        if (showPMPform) methods.push("weighted_moving_average");
        if (showPMSEform) methods.push("exponential_smoothing");
        if (showRLform) methods.push("linear_regression");
        const data = await ArticleService.predictDemand(formData, methods, pmseParams, initialValues.id, ponderaciones);
        setDemandPrediction(data);
        setShowResults(true);
    };
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
    const handleSavePrediction = async (value) => {
        console.log(value)
        console.log(selectedMethod);
        let quantity = {
            estimated_demand: 0
        };
        switch (selectedMethod) {
            case 'moving_average':
                if (demandPrediction.moving_average && demandPrediction.moving_average.value !== undefined) {
                    quantity.estimated_demand = demandPrediction.moving_average.value;
                } else {
                    console.error("No value for moving_average");
                }
                break;
            case 'weighted_moving_average':
                if (demandPrediction.weighted_moving_average && demandPrediction.weighted_moving_average.value !== undefined) {
                    quantity.estimated_demand = demandPrediction.weighted_moving_average.value;
                } else {
                    console.error("No value for weighted_moving_average");
                }
                break;
            case 'exponential_smoothing':
                if (demandPrediction.exponential_smoothing && demandPrediction.exponential_smoothing.value !== undefined) {
                    quantity.estimated_demand = demandPrediction.exponential_smoothing.value;
                } else {
                    console.error("No value for exponential_smoothing");
                }
                break;
            case 'linear_regression':
                if (demandPrediction.linear_regression && demandPrediction.linear_regression.value !== undefined) {
                    quantity.estimated_demand = demandPrediction.linear_regression.value;
                    console.log(quantity);
                } else {
                    console.error("No value for linear_regression");
                }
                break;
            default:
                console.error("No method selected");
                break;
        }
        if(value){
            await ArticleService.updateArticle(quantity, initialValues);
        }else{
            await PucharseOrderService.newOrder(quantity.estimated_demand,initialValues);
        }
    };

    return (
        <>
            <Modal show={show} onHide={handleClose} className="modal-xl">
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
                                        onChange={() => setShowPMSEform(!showPMSEform)} />
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
                                                <Form.Label >Predicción del primer periodo</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    name="predicted_demand_for_the_previous_period"
                                                    value={pmseParams.predicted_demand_for_the_previous_period}
                                                    onChange={handleChangePmseParams}
                                                />
                                            </Form.Group>
                                            <Form.Group style={{ width: '45%' }}>
                                                <Form.Label>Coeficiente de suavización</Form.Label>
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
                                <Button variant="primary" onClick={handleSubmit}>Calcular</Button>
                            </div>
                        </div>
                        {showResults && (
                            <div style={{ flex: 1, paddingLeft: '15px', overflowY: 'auto', width: '50%' }}>
                                <h4>Resultado de predicción</h4>
                                {showPMform && demandPrediction.moving_average && (
                                    <div>
                                        <hr />
                                        <h5>Promedio móvil</h5>
                                        <p>Resultado: {demandPrediction.moving_average.value}</p>
                                        <p>Error: {demandPrediction.moving_average.error}</p>
                                        <hr />
                                    </div>
                                )}
                                {showPMPform && demandPrediction.weighted_moving_average && (
                                    <div>
                                        <hr />
                                        <h5>Promedio móvil ponderado</h5>
                                        <p>Resultado: {demandPrediction.weighted_moving_average.value}</p>
                                        <p>Error: {demandPrediction.weighted_moving_average.error}</p>
                                        <hr />
                                    </div>
                                )}
                                {showPMSEform && demandPrediction.exponential_smoothing && (
                                    <div>
                                        <hr />
                                        <h5>Promedio móvil suavizado exponencialmente</h5>
                                        <p>Resultado: {demandPrediction.exponential_smoothing.value}</p>
                                        <p>Error: {demandPrediction.exponential_smoothing.error}</p>
                                        <hr />
                                    </div>
                                )}
                                {showRLform && demandPrediction.linear_regression && (
                                    <div>
                                        <hr />
                                        <h5>Regresión lineal</h5>
                                        <p>Resultado: {demandPrediction.linear_regression.value}</p>
                                        <p>Error: {demandPrediction.linear_regression.error}</p>
                                        <hr />
                                    </div>
                                )}
                                <div>
                                    <h5>Seleccionar método a usar</h5>
                                    <Form>
                                        <Form.Group>
                                            <Form.Check
                                                type="radio"
                                                name="selectedMethod"
                                                label="Promedio Móvil"
                                                checked={selectedMethod === 'moving_average'}
                                                onChange={() => setSelectedMethod('moving_average')}
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Check
                                                type="radio"
                                                name="selectedMethod"
                                                label="Promedio Móvil Ponderado"
                                                checked={selectedMethod === 'weighted_moving_average'}
                                                onChange={() => setSelectedMethod('weighted_moving_average')}
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Check
                                                type="radio"
                                                name="selectedMethod"
                                                label="Promedio Móvil suavizado exponencialmente"
                                                checked={selectedMethod === 'exponential_smoothing'}
                                                onChange={() => setSelectedMethod('exponential_smoothing')}
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Check
                                                type="radio"
                                                name="selectedMethod"
                                                label="Regresión lineal"
                                                checked={selectedMethod === 'linear_regression'}
                                                onChange={() => setSelectedMethod('linear_regression')}
                                            />
                                        </Form.Group>
                                    </Form>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <Button onClick={()=> handleSavePrediction(true)}>Guardar predicción</Button>
                                </div>
                                <div style={{ marginTop: '4%', display: 'flex', justifyContent: 'center' }}>
                                    <Button onClick={()=> handleSavePrediction(false)}>Generar orden de compra</Button>
                                </div>
                            </div>
                        )}
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default DemandPrediction;
