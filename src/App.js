import React from 'react';
import HyperloopComparisonDashboard from './components/HyperloopDashboard/HyperloopComparisonDashboard';
import DetailedComparison from './components/HyperloopDashboard/DetailedComparison';
import InteractiveInfo from './components/HyperloopDashboard/InteractiveInfo';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function App() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <Router>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="/">{t('Hyperloop Interactive Dashboard')}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">{t('Overview')}</Nav.Link>
            <Nav.Link href="/comparison">{t('Detailed Comparison')}</Nav.Link>
            <Nav.Link href="/info">{t('Interactive Info')}</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link onClick={() => changeLanguage('en')} className={i18n.language === 'en' ? 'active' : ''}>🇬🇧</Nav.Link>
            <Nav.Link onClick={() => changeLanguage('it')} className={i18n.language === 'it' ? 'active' : ''}>🇮🇹</Nav.Link>
            <Nav.Link onClick={() => changeLanguage('nl')} className={i18n.language === 'nl' ? 'active' : ''}>🇳🇱</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Container>
        <Routes>
          <Route path="/" element={<HyperloopComparisonDashboard />} />
          <Route path="/comparison" element={<DetailedComparison />} />
          <Route path="/info" element={<InteractiveInfo />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
