import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ArticlesTable from '../pages/Articles';
import ColorSchemesExample from '../components/NavBar';
import Sales from '../pages/Sales';
import PucharseOrders from '../pages/PucharseOrders';

const AppRoutes = () => {
  return (
    <Router>
      <div>
        < ColorSchemesExample />
        <Routes>
          <Route path="/" element={< ArticlesTable />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/pucharseorders" element={<PucharseOrders/>} />

        </Routes>
      </div>
    </Router>
  )
}
export default AppRoutes;