import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="footer content-layer">
      <div className="container">
        <div className="footer-content">
          <motion.h2 
            className="footer-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Ready to engineer your <span className="text-accent">digital dominance?</span>
          </motion.h2>
          
          <motion.button 
            className="btn-primary"
            style={{ padding: '20px 40px', fontSize: '1.2rem' }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.open('https://wa.me/916380046014', '_blank')}
          >
            Let's Talk
          </motion.button>
        </div>
        
        <div className="footer-bottom">
          <div>&copy; {new Date().getFullYear()} NEXFLAIR. All rights reserved.</div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <a href="https://www.instagram.com/the.nexflair?igsh=dTg1am84bzE2dWZ4" target="_blank" rel="noopener noreferrer" className="nav-link">Instagram</a>
            <a href="https://www.linkedin.com/company/the-nexflair/" target="_blank" rel="noopener noreferrer" className="nav-link">LinkedIn</a>
            <a href="https://twitter.com/the_nexflair" target="_blank" rel="noopener noreferrer" className="nav-link">Twitter</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
