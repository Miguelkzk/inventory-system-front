import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';

function NavBar() {
  const navigate = useNavigate();
  return (
    <>
      <Navbar bg="primary" data-bs-theme="dark">
        <span style={{ marginLeft: '1%', cursor: 'pointer' }}>
          <Navbar.Brand onClick={() => navigate('/')} >Articles</Navbar.Brand>
          <Navbar.Brand onClick={() => navigate('/suppliers')}  >Suppliers</Navbar.Brand>
        </span>
      </Navbar>
    </>
  );
}

export default NavBar;