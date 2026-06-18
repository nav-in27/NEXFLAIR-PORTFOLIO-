import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const SCROLL_THRESHOLD = 10; // Minimum scroll delta (px) to trigger hide/show

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  // Reset navbar visibility on route change
  useEffect(() => {
    setIsHidden(false);
    setMobileMenuOpen(false);
    lastScrollY.current = 0;
  }, [location.pathname]);

  // ─── Auto-hide scroll direction logic ──────────────────────────────
  const updateNavbar = useCallback(() => {
    const currentScrollY = window.scrollY;

    if (currentScrollY <= 10) {
      setIsScrolled(false);
      setIsHidden(false);
      lastScrollY.current = currentScrollY;
      ticking.current = false;
      return;
    }

    setIsScrolled(currentScrollY > 50);

    const delta = currentScrollY - lastScrollY.current;

    if (Math.abs(delta) >= SCROLL_THRESHOLD) {
      if (delta > 0) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      lastScrollY.current = currentScrollY;
    }

    ticking.current = false;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(updateNavbar);
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [updateNavbar]);

  const navLinks = [
    { name: 'About', href: '/#about' },
    { name: 'Services', href: '/services', isRoute: true },
    { name: 'Founders Corner', href: '/founders-corner', isRoute: true },
    { name: 'Contact', href: '/contact', isRoute: true }
  ];

  // Don't hide navbar when mobile menu is open
  const shouldHide = isHidden && !mobileMenuOpen;

  return (
    <>
      {/*
        ARCHITECTURE NOTE — Two separate fixed elements:
        
        1. .navbar-logo-layer  — contains ONLY the logo text.
           Has mix-blend-mode: difference so it inverts against the canvas video.
           This MUST be a separate stacking context from the nav-links
           because mix-blend-mode on a parent affects ALL children.
        
        2. .navbar-nav-layer   — contains the nav-links pill + mobile toggle.
           Normal compositing (no blend mode), so the frosted glass pill
           and its text render normally.
        
        Both layers share the same position/padding/transitions so they
        move together as one visual unit.
      */}
      
      {/* Layer 1: Logo with blend mode */}
      <motion.div
        className={`navbar-logo-layer ${shouldHide ? 'navbar--hidden' : ''}`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="container">
          <Link to="/" className="logo">NEXFLAIR</Link>
        </div>
      </motion.div>

      {/* Layer 2: Nav links pill (no blend mode) */}
      <motion.nav
        className={`navbar-nav-layer ${isScrolled ? 'scrolled' : ''} ${shouldHide ? 'navbar--hidden' : ''}`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="container nav-content">
          {/* Invisible spacer where the logo would be — keeps layout balanced */}
          <span className="logo-spacer" aria-hidden="true">NEXFLAIR</span>

          {/* Desktop Nav */}
          <ul className="nav-links">
            {navLinks.map((link) => (
              <li key={link.name}>
                {link.isRoute ? (
                  <Link to={link.href} className="nav-link">
                    {link.name}
                  </Link>
                ) : (
                  <a href={link.href} className="nav-link">
                    {link.name}
                  </a>
                )}
              </li>
            ))}
          </ul>

          <div className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28} color="#fff" /> : <Menu size={28} color="#fff" />}
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container">
              <ul className="mobile-nav-links">
                {navLinks.map((link) => (
                  <motion.li 
                    key={link.name}
                    whileHover={{ scale: 1.05, x: 10 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {link.isRoute ? (
                      <Link 
                        to={link.href} 
                        className="mobile-nav-link"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.name}
                      </Link>
                    ) : (
                      <a 
                        href={link.href} 
                        className="mobile-nav-link"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.name}
                      </a>
                    )}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
