import React from 'react';
import { useParams } from 'react-router-dom';
import SEO from '../components/SEO';
import Hero from '../components/Hero';
import About from '../components/About';

const LocalCityPage = () => {
  const { city } = useParams();
  
  // Capitalize the city name
  const cityName = city.charAt(0).toUpperCase() + city.slice(1).replace(/-/g, ' ');

  const title = `Web Development Company in ${cityName} | The Nexflair`;
  const description = `Looking for the best web development agency in ${cityName}? The Nexflair provides custom web design, React apps, and AI automation services in ${cityName}, Tamil Nadu.`;

  const localSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "name": title,
        "description": description
      },
      {
        "@type": "LocalBusiness",
        "name": `The Nexflair ${cityName}`,
        "image": "https://thenexflair.com/logo.png",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": cityName,
          "addressRegion": "Tamil Nadu",
          "addressCountry": "IN"
        },
        "areaServed": cityName,
        "priceRange": "$$"
      }
    ]
  };

  return (
    <main>
      <SEO 
        title={title}
        description={description}
        url={`https://thenexflair.com/${city}`}
        schema={localSchema}
      />
      {/* We can pass props to Hero to dynamically change the title, but for now we reuse existing components */}
      <div className="local-header" style={{padding: '100px 20px 20px', textAlign: 'center', backgroundColor: '#0a0a0a'}}>
        <h1>Top Web Development & AI Automation in {cityName}</h1>
        <p>Empowering businesses in {cityName} with cutting-edge digital solutions.</p>
      </div>
      <About />
    </main>
  );
};

export default LocalCityPage;
