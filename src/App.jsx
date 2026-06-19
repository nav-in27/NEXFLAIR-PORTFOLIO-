import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import VideoBackground from './components/VideoBackground';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import FoundersCorner from './pages/FoundersCorner';
import ServicesPage from './pages/ServicesPage';
import ContactForm from './pages/ContactForm';
import LocalCityPage from './pages/LocalCityPage';
import { HelmetProvider } from 'react-helmet-async';
import './index.css';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <div className="app-container">
          <VideoBackground />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/founders-corner" element={<FoundersCorner />} />
            <Route path="/contact" element={<ContactForm />} />
            {/* Dynamic Local Pages */}
            <Route path="/:city" element={<LocalCityPage />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
