import React, { useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * VideoBackground — Canvas-based video rendering
 *
 * WHY CANVAS instead of <video>?
 * CSS mix-blend-mode does NOT work with <video> elements in most browsers.
 * The browser composites video content on a GPU-accelerated layer that is
 * invisible to CSS blend calculations. By drawing each frame to a <canvas>
 * via requestAnimationFrame, the pixel data becomes accessible to CSS blend
 * modes (specifically mix-blend-mode: difference on the navbar logo).
 *
 * The hidden <video> element is kept at 1×1 px / opacity:0 (NOT display:none,
 * because browsers skip decoding for display:none elements).
 */
export const VideoBackground = () => {
  const location = useLocation();
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const rafId = useRef(null);

  // Hide the video on the contact page to maintain a pure black background
  if (location.pathname === '/contact') {
    return null;
  }

  const videoSrc = location.pathname === '/founders-corner'
    ? "/founders-bg.mp4"
    : location.pathname === '/'
      ? "/home-bg.mp4"
      : location.pathname === '/services'
        ? "/services-bg-video.mp4"
        : "/background-video.mp4";

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext('2d');

    // Match canvas resolution to viewport
    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    // Draw the current video frame to the canvas with object-fit: cover math
    function drawFrame() {
      if (video.readyState >= 2) {
        const vw = video.videoWidth;
        const vh = video.videoHeight;
        const cw = canvas.width;
        const ch = canvas.height;

        // object-fit: cover — scale to fill, crop overflow
        const scale = Math.max(cw / vw, ch / vh);
        const sw = cw / scale;
        const sh = ch / scale;
        const sx = (vw - sw) / 2;
        const sy = (vh - sh) / 2;

        ctx.drawImage(video, sx, sy, sw, sh, 0, 0, cw, ch);
      }
      rafId.current = requestAnimationFrame(drawFrame);
    }

    // Start rendering when video can play
    const handleCanPlay = () => {
      video.play().catch(() => {});
      rafId.current = requestAnimationFrame(drawFrame);
    };

    window.addEventListener('resize', resize);
    resize();

    video.addEventListener('canplay', handleCanPlay);

    // Fallback: click to play if autoplay is blocked
    const clickHandler = () => {
      video.play().catch(() => {});
    };
    window.addEventListener('click', clickHandler, { once: true });

    // If video is already ready (e.g. cached), start immediately
    if (video.readyState >= 2) {
      video.play().catch(() => {});
      rafId.current = requestAnimationFrame(drawFrame);
    }

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('click', clickHandler);
      video.removeEventListener('canplay', handleCanPlay);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [videoSrc]);

  return (
    <div className="video-background-container">
      {/* Hidden video source — 1×1px, opacity:0 keeps browser decoding active */}
      <video
        ref={videoRef}
        key={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        className="source-video-hidden"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      {/* Canvas receives drawn video frames — mix-blend-mode works with canvas */}
      <canvas ref={canvasRef} className="background-video-canvas" />
    </div>
  );
};

export default VideoBackground;
