import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../index.css';

// Replace this with your Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzYEEOtY59tS7ccErE4nyEap5HHj4yyXiV1BhtbKoxIuDvnRmjMx2m8UGRDWXp0HNVD/exec';

const ContactForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessName: '',
    websiteType: '',
    domainName: '',
    requirements: ''
  });

  const inputRef = useRef(null);

  // Focus input automatically when step changes
  useEffect(() => {
    if (inputRef.current && step < 7) {
      inputRef.current.focus();
    }
  }, [step]);

  const submitForm = async () => {
    setStep(7); // Submitting state
    setError('');
    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: {
          // Using text/plain avoids CORS preflight issues with Google Apps Script
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(formData),
      });
      
      const result = await response.json();
      
      if (result.status === 'success') {
        setStep(8); // Success view
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch (err) {
      console.error('Submission error:', err);
      // Fallback: If it's a CORS opaque response but network succeeded, we can assume success
      if (err.name === 'SyntaxError') {
        setStep(8);
      } else {
        setError('Failed to submit the form. Please try again later.');
        setStep(6); // Go back to the last step to retry
      }
    }
  };

  const handleNext = () => {
    if (step === 0 && !formData.name) return;
    if (step === 1 && !formData.email) return;
    if (step === 2 && !formData.phone) return;
    if (step === 3 && !formData.businessName) return;
    if (step === 4 && !formData.websiteType) return;
    if (step === 5 && !formData.domainName) return;
    if (step === 6 && !formData.requirements) return;
    
    if (step < 6) {
      setStep(prev => prev + 1);
    } else if (step === 6) {
      submitForm();
    }
  };

  const handleBack = () => {
    if (step > 0 && step <= 6) {
      setStep(prev => prev - 1);
      setError('');
    }
  };

  // Handle enter key to proceed
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Allow multi-line input for requirements (step 6) without triggering next on Enter
      if (e.key === 'Enter' && step !== 6) {
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [step, formData, handleNext]);

  const websiteTypesList = [
    'Corporate Website', 'E-Commerce', 'Portfolio', 'Landing Page', 
    'Web Application', 'Blog / Media', 'Other'
  ];

  const selectWebsiteType = (type) => {
    setFormData(prev => ({ ...prev, websiteType: type }));
    setTimeout(() => handleNext(), 300);
  };

  const slideVariants = {
    initial: { opacity: 0, y: 50 },
    enter: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
    exit: { opacity: 0, y: -50, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }
  };

  // Success view (Step 8)
  if (step === 8) {
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
              To give each brand the attention it deserves, we limit our workload to just two projects a month. This ensures high-quality output, focused creativity, and a seamless experience for our clients. We will get back to you shortly!
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
        {step > 0 && step < 7 ? (
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
              <h2>What is your Full Name? <span className="asterisk">*</span></h2>
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
              <h2>What's your Email Address? <span className="asterisk">*</span></h2>
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
              <h2>What's your Phone Number? <span className="asterisk">*</span></h2>
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
              <h2>What is your Business Name? <span className="asterisk">*</span></h2>
              <input 
                ref={inputRef}
                type="text" 
                placeholder="Type your business name here..."
                value={formData.businessName}
                onChange={(e) => setFormData({...formData, businessName: e.target.value})}
              />
            </motion.div>
          )}

          {step === 4 && (
            <motion.div key="step4" variants={slideVariants} initial="initial" animate="enter" exit="exit" className="form-step">
              <h2>What Website Type is required? <span className="asterisk">*</span></h2>
              <div className="options-list">
                {websiteTypesList.map((type, idx) => (
                  <div 
                    key={idx} 
                    className={`option-list-item ${formData.websiteType === type ? 'selected' : ''}`}
                    onClick={() => selectWebsiteType(type)}
                  >
                    <span>{type}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {step === 5 && (
            <motion.div key="step5" variants={slideVariants} initial="initial" animate="enter" exit="exit" className="form-step">
              <h2>Do you have a Domain Name? <span className="asterisk">*</span></h2>
              <input 
                ref={inputRef}
                type="text" 
                placeholder="e.g. www.mybusiness.com or 'No domain yet'"
                value={formData.domainName}
                onChange={(e) => setFormData({...formData, domainName: e.target.value})}
              />
            </motion.div>
          )}

          {step === 6 && (
            <motion.div key="step6" variants={slideVariants} initial="initial" animate="enter" exit="exit" className="form-step">
              <h2>What are your Project Requirements? <span className="asterisk">*</span></h2>
              <textarea 
                ref={inputRef}
                rows={4}
                className="requirements-textarea"
                placeholder="Tell us about your project, goals, and any specific requirements..."
                value={formData.requirements}
                onChange={(e) => setFormData({...formData, requirements: e.target.value})}
                style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '2px solid rgba(255,255,255,0.2)', color: 'white', fontSize: '1.5rem', outline: 'none', resize: 'none', padding: '10px 0' }}
              />
              {error && <p className="error-text" style={{ color: '#ff4444', marginTop: '1rem', fontSize: '1rem' }}>{error}</p>}
            </motion.div>
          )}

          {step === 7 && (
            <motion.div key="step7" variants={slideVariants} initial="initial" animate="enter" exit="exit" className="form-step submitting-step">
              <h2>Submitting...</h2>
              <div className="loading-spinner"></div>
            </motion.div>
          )}
        </AnimatePresence>

        {step < 7 && (
          <motion.div 
            className="form-actions"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <button className="ok-button" onClick={handleNext}>
              {step === 6 ? 'SUBMIT' : 'OK'}
            </button>
            <span className="press-enter">
              {step === 6 ? 'or click Submit' : <>press <strong>Enter ↵</strong></>}
            </span>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ContactForm;
