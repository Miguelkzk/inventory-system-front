import { useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import SearchButton from "../Buttons/SearchButton";

function NewSale({ show, handleClose }) {
    return (
        <>
            <Modal show={show} onHide={handleClose} className="modal-lg">
                <Modal.Header closeButton>
                    <Modal.Title>Nueva venta</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ flex: 1, paddingRight: '20px' }}>
                            <Form>
                                <Form.Group>
                                    <Form.Label>Fecha de la venta</Form.Label>
                                    <Form.Control type="date" />
                                </Form.Group>
                            </Form>
                            <h5 style={{marginTop:'5%'}}>Artículos en venta</h5>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Código</th>
                                        <th>Cantidad a vender</th>
                                    </tr>
                                </thead>
                            </Table>
                        </div>
                        <div style={{ flex: 1, paddingLeft: '20px', borderLeft: '1px solid #ddd' }}>
                            <div style={{ width: '100%', display:'flex', justifyContent:'center'}}>
                                <Form style={{ width: '50%', marginRight:'10%' }}>
                                    <Form.Group>
                                        <Form.Label>Buscar artículo</Form.Label>
                                        <Form.Control type="text" />
                                    </Form.Group>
                                </Form>
                                <Button style={{maxHeight:'40px', marginTop:'8%'}}> Buscar</Button>
                            </div>

                            <div style={{marginTop:'5%'}}>
                                <p>Código: </p>
                                <p>Nombre: </p>
                                <p>Stock acutal: </p>
                            </div>
                            <Form.Group>
                                <div style={{display:'flex', justifyContent:'space-between'}}>
                                <Form.Label style={{marginTop:'2%'}}>cantidad a vender: </Form.Label>
                                <Form.Control type="text" style={{width:'40%'}} />
                                </div>
                            </Form.Group>
                            <div style={{display:'flex', justifyContent:'center', marginTop:'5%'}}>
                            <Button >Agregar artículo</Button>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div style={{display:'flex', justifyContent:'center', marginTop:'2%'}}>
                            <Button >Realizar venta</Button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default NewSale;
