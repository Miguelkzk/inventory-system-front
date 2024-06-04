
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import ViewButton from "./ViewButton";
import { Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";

function GenericTable({ attributesToShow, elements, editElement, deleteElement, viewElement, viewButton, textViewButton }) {
    const { t } = useTranslation();
    return (
        <>
            <Table style={{textAlign:'center'}}>
                <thead>
                    <tr>
                        {attributesToShow.map((attribute, index) => (
                            <th key={index}>{t(attribute)}</th>
                        ))}
                        <th></th>
                        <th></th>
                        {viewButton && <th>{textViewButton}</th>}
                    </tr>
                </thead>
                <tbody>
                    {elements.map((element) => (
                        <tr key={element.id}>
                            {attributesToShow.map((attribute, attrIndex) => (
                                <td key={attrIndex}>{t(element[attribute])}</td>
                            ))}
                            <td><EditButton onClick={() => editElement(element)} /></td>
                            <td><DeleteButton onClick={() => deleteElement(element)} /></td>
                            {viewButton && <td><ViewButton onClick={() => viewElement(element)} /></td>}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
} export default GenericTable;