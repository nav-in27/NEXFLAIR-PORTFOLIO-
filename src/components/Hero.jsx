import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="hero-section container">
      <div className="hero-content">
        <motion.h1 
          className="hero-title hero-title-white"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          We Don't Build<br />Websites. We Engineer
        </motion.h1>
      </div>
      <div className="hero-content hero-blend">
        <motion.h1 
          className="hero-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <strong>Digital Dominance.</strong>
        </motion.h1>
      </div>
    </section>
  );
};

export default Hero;
