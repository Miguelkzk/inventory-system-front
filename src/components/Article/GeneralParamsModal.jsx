
import { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import GeneralParamsForm from './GeneralParamsForm';
function GeneralParamsModal({ show, handleClose, initialValues }) {
    const [formData, setFormData] = useState(initialValues)
    useEffect(() => {
        setFormData(initialValues);
    }, [initialValues])


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = () => {
        console.log(formData)
    }
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Parámetros generales</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <GeneralParamsForm
                    formData={formData}
                    handleChange={handleChange}
                />

                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '4%' }}>
                    <Button variant="primary" onClick={() => handleSubmit()} >Guardar</Button>
                </div>
            </Modal.Body>
        </Modal>
    );
}
export default GeneralParamsModal;