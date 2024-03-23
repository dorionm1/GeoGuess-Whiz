import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Tooltip } from 'react-tooltip'
import { useTranslation } from 'react-i18next';

import 'bootstrap/dist/css/bootstrap.min.css';

const NavBar = () => {
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
  
    return (
      <Navbar 
        id="nav-bar" 
        expand="lg" 
        className="bg-secondary">
        <Container>
          <Navbar.Brand href="/">{t('title')}</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/learn">{t('learnLink')}</Nav.Link>
              <Nav.Link href="/scores">{t('scoresLink')}</Nav.Link>
              <NavDropdown title={t('gamesDropdown')} id="country-games">
                <NavDropdown.Item id="flag-game" href="/flag-game" data-bs-toggle="tooltip">
                  {t('gamesDropdownOption1')}
                </NavDropdown.Item>
                <Tooltip anchorSelect="#flag-game" style={tooltipStyle} place="right">
                  {t('gamesDropdownToolTip1')}
                </Tooltip>
                <NavDropdown.Item id="currency-game" href="/currency-game">
                  {t('gamesDropdownOption2')}
                </NavDropdown.Item>
                <Tooltip anchorSelect="#currency-game" style={tooltipStyle} place="right">
                  {t('gamesDropdownToolTip2')}
                </Tooltip>
                <NavDropdown.Item id="continent-game" href="/continent-game">
                  {t('gamesDropdownOption3')}
                </NavDropdown.Item>
                <Tooltip anchorSelect="#continent-game" style={tooltipStyle} place="right">
                  {t('gamesDropdownToolTip3')}
                </Tooltip>
              </NavDropdown>
            </Nav>
            <Nav>
              <NavDropdown title={t('languageDropdown')} id="language-selector">
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