import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './services.css';

gsap.registerPlugin(ScrollTrigger);

// Utility component to split text into characters for animation
const SplitTextChars = ({ text, className }) => {
  return (
    <span className={className}>
      {text.split('').map((char, index) => (
        <span 
          key={index} 
          className="intro-char" 
          style={{ display: 'inline-block', opacity: 0, transform: 'translateY(50px) scale(0.9) rotateX(-45deg)' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
};

const Services = () => {
  const containerRef = useRef(null);
  const introRef = useRef(null);
  const scenesRef = useRef([]);
  const navRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const introChars = gsap.utils.toArray('.intro-char');
      const scenes = scenesRef.current;
      const navItems = navRef.current.querySelectorAll('.side-nav-item');

      // Master Timeline for scrub
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=1000%", // 10 viewports of scrolling
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        }
      });

      // 1. Intro Animation
      // Fade in the video background slightly for the intro
      tl.to('.services-video-bg', { opacity: 0.3, duration: 1 }, 0);

      // Animate the intro characters
      tl.to(introChars, {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        stagger: 0.05,
        ease: "power3.out",
        duration: 2
      }, 0);

      // Hold intro for a moment, then fade it out
      tl.to(introRef.current, {
        opacity: 0,
        scale: 1.2,
        duration: 2,
        ease: "power2.in"
      }, 4);

      // 2. Scene Orchestration
      // Each scene takes about 4 units of timeline time
      // 0-6: Intro
      // 6-10: Scene 1
      // 10-14: Scene 2
      // 14-18: Scene 3
      // 18-22: Scene 4
      // 22-26: Scene 5

      scenes.forEach((scene, index) => {
        const startTime = 6 + (index * 4);
        
        // Hide scene initially
        gsap.set(scene, { autoAlpha: 0, scale: 0.8, z: -500 });
        
        // Bring scene in
        tl.to(scene, {
          autoAlpha: 1,
          scale: 1,
          z: 0,
          duration: 1.5,
          ease: "power3.out"
        }, startTime);

        // Animate elements inside the scene
        const headline = scene.querySelector('.scene-headline');
        const bgElements = scene.querySelectorAll('.bg-element');
        
        if (headline) {
          gsap.set(headline, { y: 100, opacity: 0, rotateX: 30 });
          tl.to(headline, {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1.5,
            ease: "power3.out"
          }, startTime + 0.5);
        }

        if (bgElements.length > 0) {
          tl.fromTo(bgElements, 
            { y: () => Math.random() * 200 + 100, opacity: 0, scale: 0.5 },
            { y: () => Math.random() * -100 - 50, opacity: 1, scale: 1, stagger: 0.2, duration: 2, ease: "power2.out" },
            startTime
          );
          
          // Continuous parallax motion during the scene hold
          tl.to(bgElements, {
            y: "-=100",
            rotation: () => Math.random() * 30 - 15,
            duration: 2,
            ease: "none"
          }, startTime + 2);
        }

        // Highlight Navigation
        tl.to(navItems, { opacity: 0.3, scale: 1, duration: 0.5 }, startTime);
        tl.to(navItems[index], { opacity: 1, scale: 1.2, color: '#fff', textShadow: "0 0 20px rgba(255,255,255,0.8)", duration: 0.5 }, startTime);

        // Fade scene out if not the last one
        if (index < scenes.length - 1) {
          tl.to(scene, {
            autoAlpha: 0,
            scale: 1.2,
            z: 500,
            duration: 1.5,
            ease: "power2.in"
          }, startTime + 3.5);
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="cinematic-services" ref={containerRef}>
      
      {/* Dynamic Video Background - kept low opacity */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="services-video-bg"
      >
        <source src="/services-bg.mp4" type="video/mp4" />
      </video>

      {/* Intro Scene */}
      <div className="scene-intro" ref={introRef}>
        <div className="intro-line"></div>
        <h2 className="intro-text">
          <SplitTextChars text="WE DON'T OFFER" className="intro-line-1" /><br/>
          <SplitTextChars text="SERVICES." className="intro-line-2" /><br/>
          <SplitTextChars text="WE BUILD" className="intro-line-3" /><br/>
          <SplitTextChars text="DIGITAL EXPERIENCES." className="intro-line-4" />
        </h2>
      </div>

      {/* Scene 01: Web Development */}
      <div className="service-scene scene-web" ref={el => scenesRef.current[0] = el}>
        <div className="scene-bg-layer">
          <div className="bg-element web-code">{"const build = () => { return <World /> };"}</div>
          <div className="bg-element web-code outline">{"useEffect(() => animate(), [])"}</div>
          <div className="bg-element web-browser glass-panel"></div>
          <div className="bg-element web-browser glass-panel offset"></div>
          <div className="ambient-glow color-web"></div>
        </div>
        <div className="scene-content">
          <h3 className="scene-headline">WEB<br/>DEVELOPMENT</h3>
          <p className="scene-desc">Architecting immersive digital platforms that defy convention and drive conversion.</p>
        </div>
      </div>

      {/* Scene 02: UI/UX Design */}
      <div className="service-scene scene-uiux" ref={el => scenesRef.current[1] = el}>
        <div className="scene-bg-layer">
          <div className="bg-element wireframe-box"></div>
          <div className="bg-element wireframe-box tall"></div>
          <div className="bg-element cursor-element"></div>
          <div className="ambient-glow color-uiux"></div>
        </div>
        <div className="scene-content">
          <h3 className="scene-headline">UI/UX<br/>DESIGN</h3>
          <p className="scene-desc">Sculpting intuitive, pixel-perfect interfaces that humans love to interact with.</p>
        </div>
      </div>

      {/* Scene 03: AI Solutions */}
      <div className="service-scene scene-ai" ref={el => scenesRef.current[2] = el}>
        <div className="scene-bg-layer">
          <div className="bg-element neural-node node-1"></div>
          <div className="bg-element neural-node node-2"></div>
          <div className="bg-element neural-node node-3"></div>
          <div className="bg-element neural-node node-4"></div>
          <svg className="neural-connections" viewBox="0 0 100 100" preserveAspectRatio="none">
            <line x1="20" y1="20" x2="80" y2="50" className="bg-element neural-line" />
            <line x1="80" y1="50" x2="30" y2="80" className="bg-element neural-line" />
            <line x1="30" y1="80" x2="20" y2="20" className="bg-element neural-line" />
          </svg>
          <div className="ambient-glow color-ai"></div>
        </div>
        <div className="scene-content">
          <h3 className="scene-headline">AI<br/>SOLUTIONS</h3>
          <p className="scene-desc">Deploying cognitive systems and machine learning to automate the impossible.</p>
        </div>
      </div>

      {/* Scene 04: Digital Marketing */}
      <div className="service-scene scene-marketing" ref={el => scenesRef.current[3] = el}>
        <div className="scene-bg-layer">
          <div className="bg-element chart-bar bar-1"></div>
          <div className="bg-element chart-bar bar-2"></div>
          <div className="bg-element chart-bar bar-3"></div>
          <div className="bg-element metric-counter">+340%</div>
          <div className="ambient-glow color-marketing"></div>
        </div>
        <div className="scene-content">
          <h3 className="scene-headline">DIGITAL<br/>MARKETING</h3>
          <p className="scene-desc">Engineering exponential growth through data-driven campaigns and absolute precision.</p>
        </div>
      </div>

      {/* Scene 05: Brand Identity */}
      <div className="service-scene scene-branding" ref={el => scenesRef.current[4] = el}>
        <div className="scene-bg-layer">
          <div className="bg-element brand-shape shape-circle"></div>
          <div className="bg-element brand-shape shape-square"></div>
          <div className="bg-element brand-shape shape-triangle"></div>
          <div className="bg-element color-swatch swatch-1"></div>
          <div className="bg-element color-swatch swatch-2"></div>
          <div className="ambient-glow color-branding"></div>
        </div>
        <div className="scene-content">
          <h3 className="scene-headline">BRAND<br/>IDENTITY</h3>
          <p className="scene-desc">Forging timeless visual systems and narratives that dominate market perception.</p>
        </div>
      </div>

      {/* Side Progress Navigation */}
      <div className="cinematic-side-nav" ref={navRef}>
        <div className="side-nav-item">01</div>
        <div className="side-nav-item">02</div>
        <div className="side-nav-item">03</div>
        <div className="side-nav-item">04</div>
        <div className="side-nav-item">05</div>
      </div>

    </section>
  );
};

export default Services;
