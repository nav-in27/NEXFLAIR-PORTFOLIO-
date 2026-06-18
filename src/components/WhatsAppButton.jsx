import React, { useState, useEffect } from 'react';

const WHATSAPP_NUMBER = '916380046014';
const PREFILLED_MESSAGE = encodeURIComponent(
  "Hello! I visited your website and I'm interested in your digital marketing services. I would like to know more about website design and development, SEO optimization, Google Ads, social media marketing, branding, and other online growth solutions. Please share your service packages and let me know how we can work together. Thank you!"
);
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${PREFILLED_MESSAGE}`;

const WhatsAppButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Delayed entrance for a smooth appear animation
    const timer = setTimeout(() => setIsVisible(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <a
      id="whatsapp-float-btn"
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`whatsapp-float${isVisible ? ' whatsapp-float--visible' : ''}`}
      aria-label="Chat with us on WhatsApp"
    >
      {/* Animated pulse ring */}
      <span className="whatsapp-pulse-ring" aria-hidden="true" />

      {/* Official WhatsApp SVG Logo */}
      <svg
        className="whatsapp-icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 175.216 175.552"
        fill="#fff"
        aria-hidden="true"
      >
        <path d="M87.882 14.067c-40.781 0-73.96 33.18-73.973 73.96-.004 13.032 3.407 25.76 9.888 36.977L14.654 161.5l37.544-9.852c10.804 5.89 22.975 8.994 35.36 8.998h.03c40.78 0 73.96-33.182 73.973-73.964.007-19.76-7.685-38.338-21.67-52.33-13.984-13.993-32.564-21.694-52.33-21.701l.32.416zM87.882 147.93h-.026c-11.028-.004-21.84-2.966-31.268-8.566l-2.244-1.332-23.256 6.102 6.21-22.688-1.463-2.328c-6.15-9.78-9.403-21.084-9.398-32.676.012-33.89 27.594-61.468 61.5-61.468 16.418.006 31.842 6.404 43.44 18.01 11.6 11.604 17.988 27.032 17.982 43.452-.014 33.894-27.596 61.47-61.478 61.494zM127.092 100.336c-2.15-1.076-12.724-6.278-14.696-6.994-1.972-.716-3.406-1.076-4.84 1.076-1.434 2.152-5.558 6.994-6.812 8.428-1.254 1.434-2.508.716-4.658-.358-2.15-1.076-9.078-3.346-17.29-10.672-6.394-5.702-10.712-12.74-11.966-14.892-1.254-2.152-.134-3.316 .942-4.388.968-.964 2.15-2.51 3.226-3.764 1.076-1.254 1.434-2.15 2.15-3.586.716-1.434.358-2.69-.18-3.764-.536-1.076-4.84-11.664-6.632-15.97-1.746-4.194-3.52-3.626-4.84-3.694-1.254-.062-2.69-.076-4.124-.076-1.434 0-3.764.538-5.736 2.69-1.972 2.15-7.53 7.352-7.53 17.938 0 10.586 7.71 20.812 8.786 22.246 1.076 1.434 15.176 23.168 36.774 32.49 5.134 2.216 9.142 3.54 12.268 4.532 5.156 1.638 9.848 1.408 13.558.854 4.136-.618 12.724-5.2 14.518-10.222 1.794-5.022 1.794-9.326 1.254-10.222-.538-.896-1.972-1.434-4.124-2.51z" />
      </svg>

      {/* Tooltip - shown via CSS on hover */}
      <span className="whatsapp-tooltip" aria-hidden="true">
        Chat with us on WhatsApp
      </span>
    </a>
  );
};

export default WhatsAppButton;
