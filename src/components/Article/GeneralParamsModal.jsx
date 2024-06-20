
import { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
function GeneralParamsModal({ show, handleClose, handleFormSubmit, initialValues }) {
    const [formData, setFormData]=useState(initialValues)
    console.log(initialValues)
    useEffect(()=>{
        setFormData(initialValues);
    },[initialValues])


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = ()=>{
        console.log(formData)
    }
    return (
        <Modal show={show} onHide={handleClose}>
             <Modal.Header closeButton>
             <Modal.Title>Parámetros generales</Modal.Title>
             </Modal.Header>
            <Modal.Body>
                <Form>
                    <div style={{display: 'flex', justifyContent:'space-between'}}>
                    <Form.Group style={{width:'45%'}}>
                        <Form.Label>Cantidad de periodos</Form.Label>
                        <Form.Control
                        type='number'
                        name="demand_period_count"
                        value={formData.demand_period_count}
                        onChange={handleChange}
                       
                        />
                    </Form.Group>
                    <Form.Group style={{width:'45%'}}>
                        <Form.Label>Tipo de periodo</Form.Label>
                        <Form.Control
                        as="select"
                        name='period'
                        >
                            <option value="week">Semanal</option>
                            <option value="month">Mensual</option>
                            <option value="year">Anual</option>
                        </Form.Control>
                    </Form.Group>
                    </div>
                    <Form.Group style={{marginBottom:'2%', marginTop:'2%'}}>
                        <Form.Label>Método de error</Form.Label>
                        <Form.Control
                        as="select"
                        name='demand_error_calculation_method'
                        value={formData.demand_error_calculation_method}
                        onChange={handleChange}
                        >
                            <option value="0">Desviacion absoluta</option>
                            <option value="1">Quadratica</option>
                            <option value="2">Porcentaje absoluto</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Error aceptable</Form.Label>
                        <Form.Control
                        type='number'
                        name="demand_acceptable_error"
                        value={formData.demand_acceptable_error}
                        onChange={handleChange}
                       
                        />
                    </Form.Group>
                    <div style={{display: 'flex', justifyContent:'center', marginTop:'4%'}}>
                    <Button variant="primary" onClick={() => handleSubmit()} >Submit</Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}
export default GeneralParamsModal;