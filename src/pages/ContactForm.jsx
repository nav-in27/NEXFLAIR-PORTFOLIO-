import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Check, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../index.css';

const ContactForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    services: [],
    category: ''
  });

  const inputRef = useRef(null);

  // Focus input automatically when step changes
  useEffect(() => {
    if (inputRef.current && step < 3) {
      inputRef.current.focus();
    }
  }, [step]);

  // Handle enter key to proceed
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  const handleNext = () => {
    if (step === 0 && !formData.name) return;
    if (step === 1 && !formData.email) return;
    if (step === 2 && !formData.phone) return;
    if (step === 3 && formData.services.length === 0) return;
    if (step === 4 && !formData.category) return;
    
    if (step < 6) {
      setStep(prev => prev + 1);
      if (step === 4) {
        // Trigger "Submitting..." step
        setTimeout(() => {
          setStep(6);
        }, 2000);
      }
    }
  };

  const handleBack = () => {
    if (step > 0 && step < 5) {
      setStep(prev => prev - 1);
    }
  };

  const toggleService = (service) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const selectCategory = (category) => {
    setFormData(prev => ({ ...prev, category }));
    // Auto advance on single select
    setTimeout(() => handleNext(), 300);
  };

  const servicesList = [
    'Branding', 'Website Development', 'Mobile App Development', 
    'UI/UX Design', 'Brand Photoshoots', 'Social Media Marketing'
  ];

  const categoriesList = [
    'Products', 'Services', 'ECommerce-Brands', 'Events', 
    'Media', 'Private Label', 'Celebrity', 'Corporate', 'Other'
  ];

  const slideVariants = {
    initial: { opacity: 0, y: 50 },
    enter: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
    exit: { opacity: 0, y: -50, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }
  };

  // Success view (Step 6)
  if (step === 6) {
    return (
      <div className="contact-form-container success-view">
        <button className="contact-close-btn" onClick={() => navigate('/')}>
          <X size={24} color="#ffffff" />
        </button>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="success-content"
        >
          <div className="container">
            <h1 className="success-heading">Welcome, We Onboard 2 Projects a Month</h1>
            <p className="success-body">
              To give each brand the attention it deserves, we limit our workload to just two projects a month. This ensures high-quality output, focused creativity, and a seamless experience for our clients.
            </p>
          </div>
        </motion.div>

        <motion.div 
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <span>Scroll down to connect with us</span>
          <div className="scroll-line"></div>
        </motion.div>

        {/* Reusing the Footer Banner style */}
        <section className="about-footer-banner contact-footer">
          <div className="container">
            <h2>TheNexflair</h2>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="contact-form-container">
      {/* Header controls */}
      <div className="contact-header">
        {step > 0 && step < 5 ? (
          <button className="contact-back-btn" onClick={handleBack}>
            <ArrowLeft size={24} color="#ffffff" />
          </button>
        ) : <div />}
        <button className="contact-close-btn" onClick={() => navigate('/')}>
          <X size={24} color="#ffffff" />
        </button>
      </div>

      <div className="form-content-wrapper">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div key="step0" variants={slideVariants} initial="initial" animate="enter" exit="exit" className="form-step">
              <h2>What is your name? <span className="asterisk">*</span></h2>
              <input 
                ref={inputRef}
                type="text" 
                placeholder="Type your answer here..."
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </motion.div>
          )}

          {step === 1 && (
            <motion.div key="step1" variants={slideVariants} initial="initial" animate="enter" exit="exit" className="form-step">
              <h2>What's your email address? <span className="asterisk">*</span></h2>
              <input 
                ref={inputRef}
                type="email" 
                placeholder="name@example.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" variants={slideVariants} initial="initial" animate="enter" exit="exit" className="form-step">
              <h2>What's your phone number? <span className="asterisk">*</span></h2>
              <div className="phone-input-wrapper">
                <span className="country-code">🇮🇳 +91</span>
                <input 
                  ref={inputRef}
                  type="tel" 
                  placeholder="0000000000"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" variants={slideVariants} initial="initial" animate="enter" exit="exit" className="form-step">
              <h2>What service do you require? <span className="asterisk">*</span></h2>
              <div className="options-grid">
                {servicesList.map((service, idx) => (
                  <div 
                    key={idx} 
                    className={`option-card ${formData.services.includes(service) ? 'selected' : ''}`}
                    onClick={() => toggleService(service)}
                  >
                    <div className="option-indicator">
                      {formData.services.includes(service) ? <Check size={14} color="#000" /> : null}
                    </div>
                    <span>{service}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div key="step4" variants={slideVariants} initial="initial" animate="enter" exit="exit" className="form-step">
              <h2>What category does your business fall under? <span className="asterisk">*</span></h2>
              <div className="options-list">
                {categoriesList.map((cat, idx) => (
                  <div 
                    key={idx} 
                    className={`option-list-item ${formData.category === cat ? 'selected' : ''}`}
                    onClick={() => selectCategory(cat)}
                  >
                    <span>{cat}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {step === 5 && (
            <motion.div key="step5" variants={slideVariants} initial="initial" animate="enter" exit="exit" className="form-step submitting-step">
              <h2>Submitting...</h2>
            </motion.div>
          )}
        </AnimatePresence>

        {step < 5 && (
          <motion.div 
            className="form-actions"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <button className="ok-button" onClick={handleNext}>OK</button>
            <span className="press-enter">press <strong>Enter ↵</strong></span>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ContactForm;
