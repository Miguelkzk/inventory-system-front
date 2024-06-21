import { Button, Table } from "react-bootstrap";
import NewSale from "../components/Sale/NewSale";
import { useState } from "react";

function Sales(){
    const [showSaleMoal, setSaleModal]=useState(false)
    const newSale= ()=>{
        setSaleModal(true)
    }
    const handleCloseModal= ()=>{
        setSaleModal(false)
    }
    return(<>
    <div>
        <div style={{width:'100%', display:'flex', justifyContent:'right', marginTop:'1%'}}>
        <Button style={{marginRight:'1%'}}onClick={newSale}>Nueva venta</Button>
        </div>
        <Table>
            <thead>
                <tr>
                    <th>Código Venta</th>
                    <th>Fecha de venta</th>
                </tr>
            </thead>
        </Table>
        <NewSale
        show={showSaleMoal}
        handleClose={handleCloseModal}
        />
    </div>
    </>)
}export default Sales;