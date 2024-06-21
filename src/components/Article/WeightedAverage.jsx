import { useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import DeleteButton2 from "../Buttons/DeleteButton2";

function WeightedAverage() {
    const [period, setPeriod] = useState('');
    const [ponderacion, setPonderacion] = useState('');
    const [ponderaciones, setPonderaciones] = useState([]);

    const handleAddPonderacion = () => {
        if (period && ponderacion) {
            setPonderaciones([...ponderaciones, { period, ponderacion }]);
            setPeriod('');
            setPonderacion('');
        }
    };

    return (
        <div>
            <Form>
                <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '2%', marginBottom: '2%', alignItems: 'flex-end' }}>
                    <Form.Group style={{ width: '20%' }}>
                        <Form.Label>Periodo</Form.Label>
                        <Form.Control
                            type="number"
                            value={period}
                            onChange={(e) => setPeriod(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group style={{ marginLeft: '2%', marginRight: '2%', width: '20%' }}>
                        <Form.Label>Ponderación</Form.Label>
                        <Form.Control
                            type="number"
                            value={ponderacion}
                            onChange={(e) => setPonderacion(e.target.value)}
                        />
                    </Form.Group>
                    <Button style={{ maxHeight: '40px' }} onClick={handleAddPonderacion}>Agregar</Button>
                </div>
            </Form>
            <div style={{ display: 'flex', justifyContent: 'center', maxWidth: '100%' }}>
                <Table striped bordered hover style={{ width: '66%', textAlign: 'center'}}>
                    <thead>
                        <tr>
                            <th style={{ width: '30%' }}>Periodo</th>
                            <th style={{ width: '30%' }}>Ponderación</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody >
                        {ponderaciones.map((item, index) => (
                            <tr key={index}>
                                <td >
                                    {item.period}</td>
                                <td>{item.ponderacion}</td>
                                <td style={{ verticalAlign: 'middle' }}>
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'initial', height: '100%' }}>
                                        <DeleteButton2 />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default WeightedAverage;
