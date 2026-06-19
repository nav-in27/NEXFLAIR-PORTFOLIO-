import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './founders.css';

const TeamGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  // Generate an array of 12 image frames for the team gallery
  const galleryImages = Array.from({ length: 12 }, (_, i) => 
    `/cgi-frames/ezgif-frame-${(180 + i).toString().padStart(3, '0')}.jpg`
  );

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedImage]);

  const openLightbox = (src) => {
    setSelectedImage(src);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  return (
    <section className="premium-gallery-section">
      <div className="container">
        <motion.div 
          className="gallery-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: '60px', textAlign: 'center' }}
        >
          <h2 className="massive-title" style={{ fontSize: 'clamp(40px, 5vw, 80px)' }}>The Collective</h2>
          <p className="gallery-subtitle" style={{ fontSize: '18px', color: 'rgba(255,255,255,0.6)' }}>
            The brilliant minds working behind the scenes.
          </p>
        </motion.div>

        <div className="gallery-masonry-grid">
          {galleryImages.map((src, index) => (
            <motion.div 
              key={index}
              className="masonry-item"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: (index % 3) * 0.15 }}
              onClick={() => openLightbox(src)}
            >
              <img src={src} alt={`Team Member ${index + 1}`} loading="lazy" />
              <div className="masonry-overlay">
                <span className="overlay-text">View Detail</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            className="lightbox-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
              <button className="lightbox-close" onClick={closeLightbox}>&times;</button>
              <motion.img 
                src={selectedImage} 
                alt="Enlarged preview" 
                className="lightbox-img"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default TeamGallery;
