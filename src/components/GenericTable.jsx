
import EditButton from "./Buttons/EditButton";
import DeleteButton from "./Buttons/DeleteButton";
import ViewButton from "./Buttons/ViewButton";
import { Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import GearButton from "./Buttons/GearButton";
import GraphButton from "./Buttons/GraphButton";
import AddButton from "./Buttons/AddButton";

function GenericTable({ attributesToShow, elements, editElement, deleteElement, viewElement,
     viewButton, textViewButton, showGButton1, textGButton1, showGButton2, textGButton2, showMButton, textMButton, actionshowGButton1, actionShowGButton }) {
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
                        {showGButton1 && <th>{textGButton1}</th>}
                        {showGButton2 && <th>{textGButton2}</th>}
                        {showMButton && <th>{textMButton}</th>}
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
                            {showGButton1 && <td><GearButton onClick={()=>actionshowGButton1(element)}/></td>}
                            {showGButton2 && <td><GraphButton onClick={()=>actionShowGButton(element)}/></td>}
                            {showMButton && <td><AddButton/> </td>}
                            <td><EditButton onClick={() => editElement(element)} /></td>
                            <td><DeleteButton onClick={() => deleteElement(element)} /></td>

                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
} export default GenericTable;