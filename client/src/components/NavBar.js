import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Tooltip } from 'react-tooltip'
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { jwtDecode as jwt_decode } from 'jwt-decode';

import 'bootstrap/dist/css/bootstrap.min.css';

const NavBar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwt_decode(token);
        // Check if token is expired
        if (decodedToken.exp * 1000 > Date.now()) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('token');
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Invalid token');
        localStorage.removeItem('token');
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const { t, i18n } = useTranslation();
  
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  
  const tooltipStyle = {
    backgroundColor: 'white',
    color: '#222',
    border: '1px solid black',
    boxShadow: '2px 2px 5px rgba(0, 0, 0, 1)',
    fontSize: '0.5rem',
    padding: '0.5rem',
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    window.location.href = '/';
  };
  
    return (
      <Navbar 
        id="nav-bar" 
        expand="lg" 
        className="bg-secondary">
        <Container>
          <Navbar.Brand className="text-white" href="/">{t('title')}</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link className="text-white" href="/learn">{t('learnLink')}</Nav.Link>
              {isAuthenticated &&
              <Nav.Link className="text-white" href="/scores">{t('scoresLink')}</Nav.Link>}
              {isAuthenticated &&
              <NavDropdown className="custom-dropdown" title={t('gamesDropdown')} id="country-games">
                <NavDropdown.Item id="flag-game" href="/flag-game" data-bs-toggle="tooltip">
                  {t('gamesDropdownOption1')}
                </NavDropdown.Item>
                <Tooltip anchorSelect="#flag-game" style={tooltipStyle} place="right">
                  {t('gamesDropdownToolTip1')}
                </Tooltip>
              </NavDropdown>}
            </Nav>
            <Nav>
              {!isAuthenticated ?
              <Nav.Link className="text-white" href="/log-in">{t('logIn')}</Nav.Link>
              :
              <Nav.Link className="text-white" onClick={handleLogout}>{t('logOut')}</Nav.Link>}
              {!isAuthenticated &&
              <Nav.Link className="text-white" href="/sign-up">{t('signUp')}</Nav.Link>
              }
              <NavDropdown className="custom-dropdown" title={t('languageDropdown')} id="language-selector">
                <NavDropdown.Item onClick={() => changeLanguage('en')}>{t('languageDropdownOption1')}</NavDropdown.Item>
                <NavDropdown.Item onClick={() => changeLanguage('fr')}>{t('languageDropdownOption2')}</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  };
  
  export default NavBar;