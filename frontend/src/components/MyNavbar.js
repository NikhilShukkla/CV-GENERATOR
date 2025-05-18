import React, { useContext } from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './MyNavbar.css';

export default function MyNavbar() {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleProtectedLink = (path) => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: path } });
    } else {
      navigate(path);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="navbar-wrapper">
      <Navbar expand="lg" className="py-3 navbar-custom">
        <Container>
          <Navbar.Brand 
            as={Link} 
            to="/" 
            className="brand-logo"
          >
            <div className="d-flex align-items-center">
              <div className="logo-circle">
                <i className="bi bi-file-earmark-person-fill"></i>
              </div>
              <span className="ms-2">CVGeneratorPro</span>
            </div>
          </Navbar.Brand>
          
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <i className="bi bi-list"></i>
          </Navbar.Toggle>

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              <Nav.Link 
                as={Link} 
                to="/"
                className="nav-link-custom"
                active={location.pathname === '/'}
              >
                <i className="bi bi-house-door me-1"></i>
                Home
              </Nav.Link>

              <Nav.Link 
                onClick={() => handleProtectedLink('/dashboard')}
                className="nav-link-custom"
                active={location.pathname === '/dashboard'}
              >
                <i className="bi bi-speedometer2 me-1"></i>
                Dashboard
              </Nav.Link>

              <Nav.Link 
                onClick={() => handleProtectedLink('/editor')}
                className="nav-link-custom"
                active={location.pathname === '/editor'}
              >
                <i className="bi bi-pencil-square me-1"></i>
                Resume Editor
              </Nav.Link>

              <Nav.Link 
                onClick={() => handleProtectedLink('/templates')}
                className="nav-link-custom"
                active={location.pathname === '/templates'}
              >
                <i className="bi bi-grid-3x3-gap me-1"></i>
                Templates
              </Nav.Link>
            </Nav>
            
            <Nav className="nav-buttons">
              {!isAuthenticated ? (
                <>
                  <Link 
                    to="/login" 
                    className="btn btn-outline-light me-2"
                  >
                    <i className="bi bi-box-arrow-in-right me-1"></i>
                    Login
                  </Link>
                  
                  <Link 
                    to="/register" 
                    className="btn btn-primary"
                  >
                    <i className="bi bi-person-plus me-1"></i>
                    Register
                  </Link>
                </>
              ) : (
                <NavDropdown
                  title={
                    <div className="user-profile">
                      <div className="user-avatar">
                        <i className="bi bi-person"></i>
                      </div>
                      <span>{user?.name || 'User'}</span>
                    </div>
                  }
                  id="basic-nav-dropdown"
                  align="end"
                  className="custom-dropdown"
                >
                  <NavDropdown.Item onClick={handleLogout}>
                    <i className="bi bi-box-arrow-right me-2"></i>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}


