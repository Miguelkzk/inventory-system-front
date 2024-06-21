import { useLocation } from "react-router-dom";

function HistoricalDemand() {
    const location = useLocation();
    const { article } = location.state || {};
    return (
        <>
            <div style={{margin:'1%'}}>
            <h2>Demanda Historica</h2>
            <p>Códgio artículo: {article.code}</p>
            <p>Nombre artículo: {article.name}</p>
            </div>
            
        </>
    );
}

export default HistoricalDemand;
