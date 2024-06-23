import { useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import DeleteButton2 from "../Buttons/DeleteButton2";

function WeightedAverage({ onWeightingsChange }) {
    const [period, setPeriod] = useState('');
    const [weight, setWeight] = useState('');
    const [weightings, setWeightings] = useState([]);

    const handleAddWeighting = () => {
        if (period && weight) {
            const newWeightings = [...weightings, { period, weight }];
            setWeightings(newWeightings);
            onWeightingsChange(newWeightings);
            setPeriod('');
            setWeight('');
        }
    };

    const handleDeleteWeighting = (index) => {
        const newWeightings = weightings.filter((_, i) => i !== index);
        setWeightings(newWeightings);
        onWeightingsChange(newWeightings);
    };

    return (
        <div>
            <Form>
                <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '2%', marginBottom: '2%', alignItems: 'flex-end' }}>
                    <Form.Group style={{ width: '20%' }}>
                        <Form.Label>Period</Form.Label>
                        <Form.Control
                            type="number"
                            value={period}
                            onChange={(e) => setPeriod(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group style={{ marginLeft: '2%', marginRight: '2%', width: '20%' }}>
                        <Form.Label>Weight</Form.Label>
                        <Form.Control
                            type="number"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                        />
                    </Form.Group>
                    <Button style={{ maxHeight: '40px' }} onClick={handleAddWeighting}>Add</Button>
                </div>
            </Form>
            <div style={{ display: 'flex', justifyContent: 'center', maxWidth: '100%' }}>
                <Table striped bordered hover style={{ width: '66%', textAlign: 'center' }}>
                    <thead>
                        <tr>
                            <th style={{ width: '30%' }}>Periodo</th>
                            <th style={{ width: '30%' }}>Ponderacion</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {weightings.map((item, index) => (
                            <tr key={index}>
                                <td>{item.period}</td>
                                <td>{item.weight}</td>
                                <td style={{ verticalAlign: 'middle' }}>
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'initial', height: '100%' }}>
                                        <DeleteButton2 onClick={() => handleDeleteWeighting(index)} />
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
