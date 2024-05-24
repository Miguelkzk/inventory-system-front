import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';

function NavBar() {
  const navigate = useNavigate();
  return (
    <>
      <Navbar bg="primary" data-bs-theme="dark">
        <Navbar.Brand onClick={() => navigate('/')} style={{ cursor: 'pointer' }} >Articles</Navbar.Brand>
        <Navbar.Brand onClick={() => navigate('/suppliers')} style={{ cursor: 'pointer' }} >Suppliers</Navbar.Brand>
      </Navbar>
    </>
  );
}

export default NavBar;