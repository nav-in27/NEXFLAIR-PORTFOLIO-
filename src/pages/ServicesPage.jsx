import React from 'react';
import Services from '../components/Services';

import SEO from '../components/SEO';

const servicesSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "serviceType": "AI Automation Services",
      "provider": { "@type": "Organization", "name": "The Nexflair" }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is the best AI automation agency in Tamil Nadu?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Nexflair is widely recognized as a top AI automation agency in Tamil Nadu, specializing in custom chatbots, workflow automation, and generative AI integration for SMEs and enterprises."
          }
        }
      ]
    }
  ]
};

const ServicesPage = () => {
  return (
    <main>
      <SEO 
        title="AI Automation & Web Design Services | The Nexflair India"
        description="Explore our digital solutions including React web development, AI workflow automation, and custom chatbot integrations tailored for Indian businesses."
        schema={servicesSchema}
      />
      <Services />
    </main>
  );
};

export default ServicesPage;

