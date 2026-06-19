import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';

import SEO from '../components/SEO';

const homeSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "name": "The Nexflair",
      "url": "https://thenexflair.com",
      "logo": "https://thenexflair.com/logo.png",
      "description": "Leading Web Design and AI Automation Agency in Tamil Nadu, India."
    },
    {
      "@type": "LocalBusiness",
      "name": "The Nexflair",
      "image": "https://thenexflair.com/logo.png",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Chennai",
        "addressRegion": "Tamil Nadu",
        "addressCountry": "IN"
      },
      "priceRange": "$$"
    }
  ]
};

const Home = () => {
  return (
    <main>
      <SEO 
        title="The Nexflair | Top Web Development & AI Automation Agency in Tamil Nadu"
        description="Transform your business with The Nexflair. We specialize in custom web development, AI chatbots, and workflow automation in Chennai, Trichy, and across India."
        schema={homeSchema}
      />
      <Hero />
      <About />
    </main>
  );
};

export default Home;
