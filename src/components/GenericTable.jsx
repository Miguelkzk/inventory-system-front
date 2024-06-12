
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import ViewButton from "./ViewButton";
import { Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import GearButton from "./gearButton";

function GenericTable({ attributesToShow, elements, editElement, deleteElement, viewElement,
     viewButton, textViewButton, additionalButton3,  showGearButton1,  showGearButton2, showAdditionalButton3,
     textGearButton1,textGearButton2, textadditionalButton3 }) {
    const { t } = useTranslation();
    return (
        <>
            <Table style={{ textAlign: 'center' }}>
                <thead>
                    <tr>
                        {attributesToShow.map((attribute, index) => (
                            <th key={index}>{t(attribute)}</th>
                        ))}
                        {viewButton && <th>{textViewButton}</th>}
                        {showGearButton1 && <th>{textadditionalButton1}</th>}
                        {showGearButton2 && <th>{textadditionalButton2}</th>}
                        {showAdditionalButton3 && <th>{textadditionalButton3}</th>}
                        <th></th>
                        <th></th>

                    </tr>
                </thead>
                <tbody>
                    {elements.map((element) => (
                        <tr key={element.id}>
                            {attributesToShow.map((attribute, attrIndex) => (
                                <td key={attrIndex}>{t(element[attribute])}</td>
                            ))}
                            {viewButton && <td><ViewButton onClick={() => viewElement(element)} /></td>}
                            {showGearButton1 && <td><GearButton onClick={()=>console.log("implementar")}/></td>}
                            {showGearButton2 && <td></td>}
                            {showAdditionalButton3 && <td></td>}
                            <td><EditButton onClick={() => editElement(element)} /></td>
                            <td><DeleteButton onClick={() => deleteElement(element)} /></td>

                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
} export default GenericTable;