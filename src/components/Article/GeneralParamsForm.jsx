import { Form } from "react-bootstrap"

const GeneralParamsForm = ({formData, handleChange,})=>{
    return(
        <Form>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Form.Group style={{ width: '45%' }}>
                <Form.Label>Cantidad de periodos</Form.Label>
                <Form.Control
                    type='number'
                    name="demand_period_count"
                    value={formData.demand_period_count}
                    onChange={handleChange}

                />
            </Form.Group>
            <Form.Group style={{ width: '45%' }}>
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
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop:'3%'}}>
        <Form.Group style={{ width: '45%' }}>
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
        <Form.Group style={{ width: '45%' }}>
            <Form.Label>Error aceptable</Form.Label>
            <Form.Control
                type='number'
                name="demand_acceptable_error"
                value={formData.demand_acceptable_error}
                onChange={handleChange}

            />
        </Form.Group>
        </div>
    </Form>
    );
};
export default GeneralParamsForm;