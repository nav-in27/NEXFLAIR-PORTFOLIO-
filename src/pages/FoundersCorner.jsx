import React from 'react';
import CgiSequence from '../components/CgiSequence';
import FoundersSection from '../components/FoundersSection';

import { motion } from 'framer-motion';

const FoundersCorner = () => {
  return (
    <main className="founders-page">
      <section className="founders-hero">
        <motion.div 
          className="container founders-hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="hero-title founders-title">Founders Corner</h1>
          <p className="founders-subtitle">
            Meet the visionaries and creative minds driving innovation and excellence.
          </p>
        </motion.div>
      </section>

      <CgiSequence />
      
      <div className="founders-content-layer">
        <FoundersSection />

      </div>
    </main>
  );
};

export default FoundersCorner;
