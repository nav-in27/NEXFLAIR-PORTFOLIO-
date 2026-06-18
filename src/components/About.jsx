import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <>
    <section id="about" className="about-section content-layer">
      <div className="container">
        <motion.h2 
          className="about-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          What we do
        </motion.h2>

        <div className="about-grid">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="col-heading">Core Focus</h3>
            <p className="col-text">
              NEXFLAIR helps businesses grow through modern digital solutions. We focus on increasing your online presence, generating more leads, improving customer engagement, automating repetitive tasks, and driving overall business growth.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="col-heading">AI & Automation</h3>
            <p className="col-text">
              We implement intelligent systems tailored for scale. From AI Chatbots and WhatsApp Automation to complete CRM and Customer Support workflows, we engineer systems that work tirelessly so you don't have to.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="col-heading">Business Growth Solutions</h3>
            <p className="col-text">
              Our approach is data-driven. We set up optimized Google Business Profiles, execute precision lead generation, build high-converting funnels, and provide comprehensive analytics to track and accelerate your success.
            </p>
          </motion.div>
        </div>

        <div className="about-cards-container">
          <motion.div 
            className="about-feature-card left-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="card-image-wrapper">
              <img src="/images/creative_tools_collage.webp" loading="lazy" alt="Turning Ideas Into Digital Success" />
            </div>
            <div className="card-content">
              <h3 className="card-heading">Turning Ideas Into Digital Success</h3>
              <p className="card-text">
                We transform ambitious ideas into impactful digital experiences through thoughtful design, modern development, and a relentless focus on results.
              </p>
            </div>
          </motion.div>

          <motion.div 
            className="about-feature-card right-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="card-content">
              <h3 className="card-heading">Crafted for Growth</h3>
              <p className="card-text">
                Every pixel, interaction, and line of code is purposefully designed to strengthen your brand, engage your audience, and drive measurable business outcomes.
              </p>
            </div>
            <div className="card-image-wrapper">
              <img src="/images/3d_bar_chart.webp" loading="lazy" alt="Crafted for Growth" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    <section className="black-cta-wrapper">
      <div className="container">
        {/* CTA Cards Section */}
        <div className="cta-cards-container">
          <motion.div 
            className="cta-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img src="/images/collaboration_bg.webp" loading="lazy" className="cta-card-bg" alt="Billboard" />
            <div className="cta-card-overlay"></div>
            <div className="cta-card-content">
              <h3 className="cta-card-heading">We're always looking for new collaborations.</h3>
            </div>
            <div className="cta-card-action">
              <a href="/contact" className="btn-outline-light">Start a Project →</a>
            </div>
          </motion.div>

          <motion.div 
            className="cta-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <img src="/images/instagram_bg.webp" loading="lazy" className="cta-card-bg" alt="Instagram" />
            <div className="cta-card-overlay"></div>
            <div className="cta-card-content">
              <h3 className="cta-card-heading">Follow our journey and latest work.</h3>
            </div>
            <div className="cta-card-action">
              <a href="https://www.instagram.com/the.nexflair?igsh=dTg1am84bzE2dWZ4" target="_blank" rel="noopener noreferrer" className="btn-outline-light">Follow Nexflair →</a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* About Footer Banner */}
      <div className="about-footer-banner">
        <div className="about-footer-copyright">
          © Copyrights The Nexflair
        </div>
        <div className="about-footer-title">
          TheNexflair
        </div>
      </div>
    </section>
    </>
  );
};

export default About;
