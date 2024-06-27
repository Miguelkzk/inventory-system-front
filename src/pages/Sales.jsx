import { Button, Modal, Table } from "react-bootstrap";
import NewSale from "../components/Sale/NewSale";
import { useEffect, useState } from "react";
import { SaleService } from "../service/Sale";
import ViewButton from "../components/Buttons/ViewButton";
import { format } from 'date-fns';

function Sales() {
    const [showSaleMoal, setSaleModal] = useState(false);
    const [sales, setSales] = useState([]);
    const [detailModal, setDetailModal] = useState(false);
    const [detailSale, setDetailSale] = useState({ articles_details: [] });

    useEffect(() => {
        fetchSales();
    }, []);

    const fetchSales = async () => {
        const data = await SaleService.getSales();
        setSales(data);
    };

    const newSale = () => {
        setSaleModal(true);
    };

    const handleCloseModal = () => {
        setSaleModal(false);
        setDetailModal(false);
        fetchSales();
    };

    const viewDetail = async (sale) => {
        const data = await SaleService.getSaleDetail(sale);
        setDetailSale(data);
        setDetailModal(true);
    };

    return (
        <>
            <div className="container">
                <div style={{ width: '100%', display: 'flex', justifyContent: 'right', marginTop: '1%' }}>
                    <Button style={{ marginRight: '1%' }} onClick={newSale}>New Sale</Button>
                </div>
                <Table style={{ textAlign: 'center' }}>
                    <thead>
                        <tr>
                            <th>Código de venta</th>
                            <th>Fecha de venta</th>
                            <th>Artículos vendidos</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales.map(sale => (
                            <tr key={sale.id}>
                                <td>{sale.id}</td>
                                <td>{format(new Date(sale.sold_at), 'MMMM do, yyyy H:mm a')}</td>
                                <td> <ViewButton onClick={() => { viewDetail(sale) }} /> </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <NewSale
                    show={showSaleMoal}
                    handleClose={handleCloseModal}
                />
            </div>
            <Modal show={detailModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Detalle venta</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table style={{textAlign:'center'}}>
                        <thead>
                            <tr>
                                <th>Código de artículo</th>
                                <th>Nombre artículo</th>
                                <th>Cantidad vendida</th>
                            </tr>
                        </thead>
                        <tbody>
                            {detailSale.articles_details && detailSale.articles_details.map((detail, index) => (
                                <tr key={index}>
                                    <td>{detail.article.code}</td>
                                    <td>{detail.article.name}</td>
                                    <td>{detail.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default Sales;
