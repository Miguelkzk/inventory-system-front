import { useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import { ArticleService } from "../../service/Article";

function NewSale({ show, handleClose }) {
    const [filter, setFilter] = useState('');
    const [quantity, setQuantity] = useState('');
    const [currentArticle, setCurrentArticle] = useState(null);
    const [articlesInSale, setArticlesInSale] = useState([]);
    const [sale_at, setSale_at] = useState('');

    const handleInputChange = (e) => {
        setFilter(e.target.value);
    };

    const handleSearchArticle = async () => {
        const data = await ArticleService.getArticleByCode(filter);
        console.log(data);
        setCurrentArticle(data);
    };

    const handleQuantityChange = (e) => {
        setQuantity(e.target.value);
    };

    const handleDataSaleChange = (e) => {
        setSale_at(e.target.value);
    };

    const handleAddArticle = () => {
        if (currentArticle && quantity) {
            const newArticle = { ...currentArticle, quantity: parseInt(quantity) };
            setArticlesInSale([...articlesInSale, newArticle]);
            setCurrentArticle(null);
            setQuantity('');
        }
    };

    const handleSubmit = () => {
        const saleData = {
            sale: {
                sold_at: sale_at,
                article_sales_attributes: articlesInSale.map(article => ({
                    article_id: article.id,
                    quantity: article.quantity
                }))
            }
        };
        console.log(saleData)
    };

    const handleCloseModal = () => {
        setFilter('');
        setQuantity('');
        setCurrentArticle(null);
        setArticlesInSale([]);
        setSale_at('');
        handleClose();
    };

    return (
        <>
            <Modal show={show} onHide={handleCloseModal} className="modal-lg">
                <Modal.Header closeButton>
                    <Modal.Title>Nueva venta</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ flex: 1, paddingRight: '20px' }}>
                            <Form>
                                <Form.Group>
                                    <Form.Label>Fecha de la venta</Form.Label>
                                    <Form.Control type="date" value={sale_at} onChange={handleDataSaleChange} />
                                </Form.Group>
                            </Form>
                            <h5 style={{ marginTop: '5%' }}>Artículos en venta</h5>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Código</th>
                                        <th>Cantidad a vender</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {articlesInSale.map((article, index) => (
                                        <tr key={index}>
                                            <td>{article.code}</td>
                                            <td>{article.quantity}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                        <div style={{ flex: 1, paddingLeft: '20px', borderLeft: '1px solid #ddd' }}>
                            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                                <Form style={{ width: '50%', marginRight: '10%' }}>
                                    <Form.Group>
                                        <Form.Label>Buscar artículo</Form.Label>
                                        <Form.Control type="text" value={filter} onChange={handleInputChange} />
                                    </Form.Group>
                                </Form>
                                <Button style={{ maxHeight: '40px', marginTop: '8%' }} onClick={handleSearchArticle}>Buscar</Button>
                            </div>

                            {currentArticle && (
                                <div style={{ marginTop: '5%' }}>
                                    <p>Código: {currentArticle.code}</p>
                                    <p>Nombre: {currentArticle.name}</p>
                                    <p>Stock actual: {currentArticle.stock}</p>
                                    <Form.Group>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Form.Label style={{ marginTop: '2%' }}>Cantidad a vender: </Form.Label>
                                            <Form.Control type="number" style={{ width: '40%' }} value={quantity} onChange={handleQuantityChange} />
                                        </div>
                                    </Form.Group>
                                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5%' }}>
                                        <Button onClick={handleAddArticle}>Agregar artículo</Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <hr />
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2%' }}>
                        <Button onClick={handleSubmit}>Realizar venta</Button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default NewSale;
