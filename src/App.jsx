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
import './index.css';

function App() {
  return (
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
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
