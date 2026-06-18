import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './founders.css';

gsap.registerPlugin(ScrollTrigger);

const founders = [
  {
    name: 'NAVEEN R',
    role: 'FOUNDER & CEO',
    description: 'Founder of Nexflair. Not driven by trends. Driven by possibilities. He founded Nexflair with a vision to bridge creativity and technology, transforming bold ideas into meaningful digital experiences. From modern websites and intelligent systems to AI-powered solutions, his work is centered on one principle: build things that create real value.',
    image: '/images/naveen-founder.webp'
  },
  {
    name: 'KOKILAN',
    role: 'Digital Systems Architect',
    description: 'Kokilan specializes in designing and developing robust digital systems that power modern business experiences. His expertise bridges technology and innovation, turning complex challenges into seamless solutions.',
    image: '/images/kokilan-profile.jpeg'
  },
  {
    name: 'Elena Rodriguez',
    role: 'Head of UI/UX',
    description: 'Creating intuitive digital experiences through user-centered design, meticulous motion systems, and modern interface architecture.',
    image: '/cgi-frames/ezgif-frame-150.webp'
  },
  {
    name: 'IRFAN',
    role: 'Client Consultant',
    description: 'Irfan bridges the gap between clients and solutions, ensuring every project aligns with business goals. With a sharp eye for client needs and market trends, he drives meaningful partnerships and delivers strategic guidance that fuels long-term success.',
    image: '/images/irfan-profile.jpeg'
  }
];

const FoundersSection = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scenes = gsap.utils.toArray('.founder-scene');
      
      // Ensure the first scene is visible immediately
      gsap.set(scenes[0], { opacity: 1, pointerEvents: 'auto' });
      gsap.set(scenes[0].querySelector('.founder-portrait'), { scale: 1 });
      gsap.set(scenes[0].querySelectorAll('.split-line'), { y: 0, opacity: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${scenes.length * 100}%`,
          pin: true,
          scrub: 1,
        }
      });

      // We skip i=0 for the initial reveal, since it's already visible.
      // But we animate its exit.
      scenes.forEach((scene, i) => {
        const portrait = scene.querySelector('.founder-portrait');
        const textLines = scene.querySelectorAll('.split-line');

        if (i > 0) {
          // Entrance for scene > 0
          tl.to(scenes[i - 1], {
            opacity: 0,
            scale: 0.95,
            duration: 1,
            ease: 'power2.inOut'
          }, '+=0.5');

          tl.fromTo(scene, 
            { opacity: 0, scale: 1.05 },
            { opacity: 1, scale: 1, duration: 1, ease: 'power2.inOut' },
            '<'
          );

          tl.fromTo(portrait,
            { scale: 1.2 },
            { scale: 1, duration: 1.5, ease: 'power3.out' },
            '<'
          );

          tl.fromTo(textLines,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: 'power3.out' },
            '-=0.5'
          );
        }

        // Slight parallax hold while viewing the scene
        tl.to(portrait, {
          scale: 1.05,
          duration: 2,
          ease: 'none'
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="founders-cinematic-wrapper">
      <div ref={containerRef} className="cinematic-founders">
        {founders.map((founder, index) => (
          <div key={index} className={`founder-scene scene-${index}`}>
            <div className="founder-content-split">
              <div className="founder-image-col">
                <img src={founder.image} loading="lazy" alt={founder.name} className="founder-portrait" />
              </div>
              <div className="founder-text-col">
                <div className="text-mask">
                  <h3 className="founder-name split-line">{founder.name}</h3>
                </div>
                <div className="text-mask">
                  <p className="founder-role split-line">{founder.role}</p>
                </div>
                <div className="text-mask">
                  <p className="founder-bio split-line">{founder.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FoundersSection;
