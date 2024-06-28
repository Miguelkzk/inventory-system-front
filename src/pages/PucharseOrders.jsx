import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { PucharseOrderService } from "../service/PucharseOrder";
import { useTranslation } from "react-i18next";
import ViewButton from "../components/Buttons/ViewButton";
import EditButton from "../components/Buttons/EditButton";
import DeleteButton from "../components/Buttons/DeleteButton";
import GenericModal from "../components/GenericAbmModal";
import ConfirmModal from "../components/ConfirmModal";

function PucharseOrders() {
    const [pucharseOrders, setPucharseOrders] = useState([]);
    const [initialValues, setInitialValues]=useState({})
    const [attributes, setAttributes] = useState([])
    const [selectOrder, setSelectOrder]=useState({})
    const [showModal, setShowModal] =useState(false)
    const [showDeleteModal, setshowDeleteModal] =useState(false)
    const { t, i18n } = useTranslation();

    useEffect(() => {
        fetchPucharseOrders();
        getAttributes();
    }, []);

    const fetchPucharseOrders = async () => {
        const data = await PucharseOrderService.getOrders();
        setPucharseOrders(data);
    };

    const getAttributes = async ()=>{
        const data = await PucharseOrderService.getAttributes();
        setAttributes(data)
    }
    
    const handleCloseModal= ()=>{
        setShowModal(false)
        setSelectOrder('')
        setshowDeleteModal(false)
    }

    const handleShowModal = (element) =>{
        setInitialValues(element)
        setShowModal(true)
        setSelectOrder(element)
    }
    const handleShowDeleteModal = (element)=>{
        setSelectOrder(element)
        setshowDeleteModal(true)
    }

    const handleSave = async (formData)=>{
        await PucharseOrderService.updateOrder(formData, selectOrder)
        fetchPucharseOrders();
        setSelectOrder('')
        handleCloseModal();
    }

    const handleConfirmDelete = async ()=>{
        try{
            await PucharseOrderService.deleteOrder(selectOrder)
            fetchPucharseOrders();
            handleCloseModal();
        }
        catch{
            console.log("no se ha podido eliminar")
        }
    }

    const handleCancelDelete = ()=>{
        setshowDeleteModal(false)
        setSelectOrder('')
    }

    const handleFinish = async (element)=>{
        const body = {
            state: 'finished'
        }
        await PucharseOrderService.updateOrder(body,element)
        fetchPucharseOrders();
    }
    return (
        <>
        <div className="container">
            <Table style={{ textAlign: 'center' }}>
                <thead>
                    <tr>
                        <th>Id orden de compra</th>
                        <th>Id Artículo</th>
                        <th>Cantidad</th>
                        <th>Estado</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {pucharseOrders.map((element) => (
                        <tr key={element.id}>
                            <td>{element.id}</td>
                            <td>{element.article_id}</td>
                            <td>{element.quantity}</td>
                            <td>{t(element.state)}</td>
                            {element.state === "pending" ? (
                                <>
                                    <td><EditButton onClick={()=>handleShowModal(element)}/></td>
                                    <td><DeleteButton onClick={()=>handleShowDeleteModal(element)} /></td>
                                </>
                            ) : element.state === "sent" ? (
                                <>
                                    <td><Button onClick={()=>handleFinish(element)}>Finalizar</Button></td>
                                    <td></td>
                                </>
                            ) : (
                                <>
                                    <td></td>
                                    <td></td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
        <GenericModal
        show={showModal}
        handleClose={handleCloseModal}
        title={"Editar orden de compra"}
        attributes={attributes}
        handleFormSubmit={handleSave}
        initialValues={initialValues}
        />
        <ConfirmModal
        show={showDeleteModal}
        handleClose={handleCloseModal}
        title={"Eliminar orden de compra"}
        content={`¿Seguro que desea eliminar la orden de compra con id ${selectOrder.id}?`}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        />

        </>
    );
}

export default PucharseOrders;
