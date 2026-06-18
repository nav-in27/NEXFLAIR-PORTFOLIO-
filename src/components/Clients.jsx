import React from 'react';
import { motion } from 'framer-motion';

const targetClients = [
  "Restaurants & Cafes", 
  "Educational Institutions", 
  "Real Estate Businesses", 
  "Healthcare Clinics", 
  "Local Businesses", 
  "Startups", 
  "Small & Medium Enterprises (SMEs)"
];

const Clients = () => {
  return (
    <section id="clients" className="clients-section content-layer">
      <div className="container">
        <motion.div 
          className="clients-box"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="clients-heading">Target Clients</h2>
          <p className="clients-subtext">
            We partner with diverse businesses across multiple sectors. Our tailored digital strategies provide the architectural foundation for local startups and established enterprises alike to dominate their respective markets.
          </p>
          
          <div className="clients-grid">
            {targetClients.map((client, index) => (
              <motion.div 
                key={index} 
                className="client-item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {client}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Clients;
