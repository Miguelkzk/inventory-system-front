import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ArticlesTable from '../pages/Articles';
import ColorSchemesExample from '../components/NavBar';

import Supplier from '../pages/Suppliers';

const AppRoutes = () => {
  return (
    <Router>
      <div>
        < ColorSchemesExample />
        <Routes>
          <Route path="/" element={< ArticlesTable />} />
          <Route path="/suppliers" element={<Supplier />} />
        </Routes>
      </div>
    </Router>
  )
}
export default AppRoutes;