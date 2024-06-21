import { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import GeneralParamsForm from './GeneralParamsForm';
import { ArticleService } from '../../service/Article';

function GeneralParamsModal({ show, handleClose, initialValues }) {
    const [formData, setFormData] = useState({
        demand_period_count: 0,
        demand_error_calculation_method: 0,
        demand_acceptable_error: 0
    });

    useEffect(() => {
        if (initialValues) {
            setFormData({
                demand_period_count: initialValues.demand_period_count || '',
                demand_error_calculation_method: initialValues.demand_error_calculation_method || '',
                demand_acceptable_error: initialValues.demand_acceptable_error || ''
            });
        }
    }, [initialValues]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async () => {
        try {
            await ArticleService.updateArticle(formData, initialValues);
            handleClose();
        } catch (error) {
            console.error("Error updating article:", error);
        }
    };

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
                    <Button variant="primary" onClick={handleSubmit}>Guardar</Button>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default GeneralParamsModal;
