import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, MessageSquare, ArrowRight, Stamp, Phone, Globe, ChevronRight } from "lucide-react";
import { BUSINESS, SOCIAL_LINKS } from "../config";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when full-screen mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: "Home", path: "/", desc: "Main Overview & Stamp Intro" },
    { name: "About Us", path: "/about", desc: "Our 1960 Heritage & Process" },
    { name: "Rubber Stamp Services", path: "/services", desc: "Custom, Logo & Self-Inking Stamps" },
    { name: "Work Gallery", path: "/gallery", desc: "Photos & Sample Stamp Works" },
    { name: "Order Custom Stamp", path: "/order", desc: "4-Step Online Stamp Booking" },
    { name: "Contact Us", path: "/contact", desc: "Phone, Location & Social Profiles" }
  ];

  return (
    <header className={`site-header ${isScrolled ? "scrolled" : ""}`}>
      <div className="container header-container">
        
        {/* Brand Logo */}
        <Link to="/" className="brand-logo" aria-label="Rafa Rubber Stamps Home">
          <div className="logo-badge">
            <Stamp className="logo-icon" />
          </div>
          <div className="logo-text">
            <span className="brand-title">RAFA</span>
            <span className="brand-subtitle">RUBBER STAMPS</span>
            <span className="brand-location">TENKASI</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <ul className="nav-list">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`nav-link ${location.pathname === link.path ? "active" : ""}`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop CTA Action Buttons */}
        <div className="header-actions">
          <a
            href={SOCIAL_LINKS.orderWhatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline btn-whatsapp-header"
            aria-label="WhatsApp Rafa Stamps"
          >
            <MessageSquare className="btn-icon" />
            <span>WhatsApp</span>
          </a>

          <Link to="/order" className="btn btn-primary btn-header-cta">
            <span>Order Now</span>
            <ArrowRight className="btn-icon-right" />
          </Link>

          {/* Mobile Hamburger Toggle Button */}
          <button
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open full screen menu"
            aria-expanded={mobileMenuOpen}
          >
            <Menu size={26} />
          </button>
        </div>

      </div>

      {/* FULL-SCREEN MOBILE MENU OVERLAY PANEL */}
      {mobileMenuOpen && (
        <div
          className="full-screen-menu-overlay"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="full-screen-menu-panel"
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Header Row */}
            <div className="fs-menu-header">
              <div className="fs-brand">
                <div className="logo-badge badge-red">
                  <Stamp size={22} />
                </div>
                <div className="fs-brand-text">
                  <span className="fs-title">RAFA RUBBER STAMPS</span>
                  <span className="fs-subtitle">TENKASI • ESTD. 1960</span>
                </div>
              </div>

              <button
                className="fs-close-btn"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close full screen menu"
              >
                <X size={24} />
              </button>
            </div>

            {/* Language / Region Badge */}
            <div className="fs-lang-bar">
              <Globe size={14} className="text-red" />
              <span>Tenkasi, Tamil Nadu • Pan-India Express Delivery</span>
            </div>

            {/* Navigation Links List */}
            <nav className="fs-menu-nav">
              <ul className="fs-nav-list">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <li key={link.path}>
                      <Link
                        to={link.path}
                        className={`fs-nav-link ${isActive ? "active" : ""}`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <div className="fs-link-info">
                          <span className="fs-link-name">{link.name}</span>
                          <span className="fs-link-desc">{link.desc}</span>
                        </div>
                        <ChevronRight size={20} className="fs-link-chevron" />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Footer Section with Prominent CTA & Quick Call/WhatsApp */}
            <div className="fs-menu-footer">
              <Link
                to="/order"
                className="btn btn-primary btn-lg btn-block fs-cta-btn"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>Order Custom Stamp Now</span>
                <ArrowRight size={18} />
              </Link>

              <div className="fs-contact-chips">
                <a href={`tel:${BUSINESS.phoneRaw}`} className="fs-chip chip-phone">
                  <Phone size={16} />
                  <span>Call: {BUSINESS.phone}</span>
                </a>
                <a
                  href={SOCIAL_LINKS.orderWhatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="fs-chip chip-wa"
                >
                  <MessageSquare size={16} />
                  <span>WhatsApp Order</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

    </header>
  );
}
