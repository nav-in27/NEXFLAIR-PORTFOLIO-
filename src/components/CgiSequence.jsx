import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CgiSequence = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  
  // Settings for the image sequence
  const frameCount = 233;
  
  // Pad number with leading zeros (e.g., 001, 015, 233)
  const currentFrameUrl = (index) => 
    `/cgi-frames/ezgif-frame-${(index + 1).toString().padStart(3, '0')}.webp`;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const context = canvas.getContext('2d');
    const isMobile = window.innerWidth <= 768;
    const bufferSize = isMobile ? 4 : 15; // Smaller buffer on mobile to save memory
    
    // Set canvas dimensions accounting for high-DPI (4k/Retina) displays
    const updateCanvasSize = () => {
      // Cap device pixel ratio to 1.5 on mobile and 2 on desktop to drastically improve render performance without losing noticeable quality
      const dpr = isMobile ? Math.min(window.devicePixelRatio || 1, 1.5) : Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };

    updateCanvasSize();

    // Memory-efficient Image Cache
    const loadedImages = new Map();
    const obj = { frame: 0 }; 

    const render = (frameIndex) => {
      const img = loadedImages.get(frameIndex);
      
      // If it's still 'loading' or not in map, we skip rendering until it finishes
      if (!img || img === 'loading') return;
      
      const hRatio = canvas.width / img.width;
      const vRatio = canvas.height / img.height;
      const ratio = Math.max(hRatio, vRatio);
      
      const centerShift_x = (canvas.width - img.width * ratio) / 2;
      const centerShift_y = (canvas.height - img.height * ratio) / 2;  

      context.clearRect(0, 0, canvas.width, canvas.height);
      
      // Use lower quality smoothing on mobile for better frame rates
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = isMobile ? 'low' : 'high';

      context.drawImage(img, 0, 0, img.width, img.height,
        centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
    };

    const preloadFrames = (currentIdx) => {
      const start = Math.max(0, currentIdx - bufferSize);
      const end = Math.min(frameCount - 1, currentIdx + bufferSize);
      
      // Garbage Collection: remove images far outside the buffer radius
      for (const key of loadedImages.keys()) {
        if (key < start - 5 || key > end + 5) { // Add a slight slop factor before deleting
          const img = loadedImages.get(key);
          if (img !== 'loading') {
            img.src = ""; // Nullify to help garbage collection
          }
          loadedImages.delete(key);
        }
      }

      // Preload frames within the buffer
      for (let i = start; i <= end; i++) {
        if (!loadedImages.has(i)) {
          loadedImages.set(i, 'loading'); // Mark as loading
          const img = new Image();
          img.onload = () => {
            loadedImages.set(i, img);
            // If this is the frame we're currently waiting for, render immediately
            if (Math.round(obj.frame) === i) {
              render(i);
            }
          };
          img.src = currentFrameUrl(i);
        }
      }
    };

    // Initialize: preload the first chunk and render frame 0
    preloadFrames(0);
    
    // Fallback: manually force load frame 0 just to guarantee initial paint
    const initImg = new Image();
    initImg.onload = () => {
      loadedImages.set(0, initImg);
      render(0);
    };
    initImg.src = currentFrameUrl(0);

    // Set up ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=300%', // 300vh scroll duration
        scrub: 0.5,    // Smooth scrubbing
        pin: true      // Pin the canvas in place
      }
    });

    tl.to(obj, {
      frame: frameCount - 1,
      snap: 'frame',
      ease: 'none',
      onUpdate: () => {
        const currentIdx = Math.round(obj.frame);
        preloadFrames(currentIdx);
        render(currentIdx);
      }
    });

    // Handle resize
    const handleResize = () => {
      updateCanvasSize();
      render(Math.round(obj.frame));
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach(t => t.kill());
      
      // Cleanup all images on unmount
      for (const img of loadedImages.values()) {
        if (img !== 'loading') img.src = "";
      }
      loadedImages.clear();
    };
  }, []);

  return (
    <section ref={containerRef} className="cgi-sequence-container" style={{ backgroundColor: '#000' }}>
      <canvas ref={canvasRef} className="cgi-canvas" />
    </section>
  );
};

export default CgiSequence;
