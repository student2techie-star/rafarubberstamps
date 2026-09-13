import React from "react";
import { Link } from "react-router-dom";
import { Stamp, Phone, MessageSquare, MapPin, Truck, ShieldCheck, ArrowRight } from "lucide-react";
import { BUSINESS, SOCIAL_LINKS } from "../config";

export default function Footer() {
  return (
    <footer className="site-footer">
      
      {/* Footer Banner CTA */}
      <div className="footer-cta-banner">
        <div className="container footer-cta-content">
          <div className="footer-cta-text">
            <h2>Need a Customized Rubber Stamp?</h2>
            <p>Send us your design, text, or signature. Fast crafting and delivery across all over India.</p>
          </div>
          <div className="footer-cta-actions">
            <Link to="/order" className="btn btn-primary btn-lg">
              <span>Order Now</span>
              <ArrowRight size={18} />
            </Link>
            <a
              href={SOCIAL_LINKS.orderWhatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-light btn-lg"
            >
              <MessageSquare size={18} />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Info */}
      <div className="container footer-main">
        <div className="footer-grid">
          
          {/* Brand Info */}
          <div className="footer-col brand-col">
            <div className="footer-logo">
              <div className="logo-badge badge-red">
                <Stamp size={24} />
              </div>
              <div>
                <h3 className="footer-brand-title">RAFA RUBBER STAMPS</h3>
                <span className="footer-brand-tagline">TENKASI • TAMIL NADU</span>
              </div>
            </div>

            <p className="footer-desc">
              Trusted custom stamp maker in Tenkasi specializing in customized rubber stamps, logo stamps, craft stamps, and water-based stamps with delivery across India.
            </p>

            <div className="delivery-badge-card">
              <Truck size={20} className="delivery-icon" />
              <div>
                <strong>Nationwide Delivery</strong>
                <span>Delivering to all states & cities in India</span>
              </div>
            </div>

            {/* Social & Directory Links with Small Logos */}
            <div className="footer-social-row">
              <a
                href={SOCIAL_LINKS.justdial}
                target="_blank"
                rel="noopener noreferrer"
                title="Justdial Profile"
                className="footer-social-icon justdial"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm-1-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm5 7h-2v-3c0-.55-.45-1-1-1s-1 .45-1 1v3h-2v-6h2v1.1c.41-.67 1.18-1.1 2-1.1 1.38 0 2.5 1.12 2.5 2.5V17z"/>
                </svg>
              </a>

              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram @rafastampstenkasi"
                className="footer-social-icon instagram"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              <a
                href={SOCIAL_LINKS.threadsOriginal || SOCIAL_LINKS.threads}
                target="_blank"
                rel="noopener noreferrer"
                title="Threads @rafastampstenkasi"
                className="footer-social-icon threads"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M12.186 24h-.007c-3.581-.026-6.375-1.267-8.304-3.689-1.745-2.193-2.583-5.203-2.493-8.947.106-4.385 1.684-7.79 4.69-10.12 2.457-1.904 5.753-2.84 9.796-2.78 4.417.065 7.857 1.282 10.224 3.618 2.052 2.025 3.076 4.792 3.045 8.225-.03 3.327-.97 5.922-2.793 7.717-1.637 1.611-3.864 2.443-6.619 2.472h-.056c-2.428 0-4.343-.637-5.69-1.894-1.228-1.146-1.84-2.656-1.82-4.488.02-1.956.713-3.484 2.062-4.542 1.258-.988 2.973-1.492 5.099-1.498l1.378.005c.01-.58-.094-1.11-.31-1.574-.356-.767-1.04-1.182-2.036-1.233h-.066c-.722 0-1.464.195-2.207.579-.623.322-1.07.689-1.332 1.09l-2.096-1.428c.55-.913 1.39-1.647 2.497-2.181C10.744 3.018 12.083 2.76 13.4 2.76h.105c1.868.096 3.284.786 4.209 2.052.79 1.08 1.157 2.453 1.09 4.084l-.01 2.378c.007 1.343.326 2.368.948 3.048.513.561 1.218.85 2.094.857.064 0 .13-.003.196-.008 1.396-.107 2.392-.916 2.96-2.404.385-1.009.563-2.298.53-3.832.025-2.736-.786-4.922-2.41-6.495-1.83-1.776-4.502-2.7-7.942-2.75-3.32-.048-5.99.71-7.935 2.253-2.43 1.928-3.71 4.743-3.804 8.368-.074 3.085.61 5.56 2.035 7.357 1.543 1.939 3.774 2.933 6.63 2.955h.007c1.782 0 3.388-.39 4.773-1.159.905-.503 1.666-1.182 2.262-2.018l2.096 1.427c-.887 1.258-2.019 2.268-3.364 3.003-1.92 1.05-4.143 1.583-6.608 1.583zm3.72-8.32c-1.392.004-2.493.308-3.272.905-.733.562-1.107 1.346-1.115 2.33-.01.957.29 1.706.892 2.227.697.603 1.662.91 2.868.91h.034c1.472-.016 2.65-.465 3.501-1.335.791-.809 1.196-1.867 1.205-3.146l-.004-.891-4.109 0z"/>
                </svg>
              </a>

              <a
                href={SOCIAL_LINKS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                title="YouTube Channel @rafastamps"
                className="footer-social-icon youtube"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/services">Stamp Services</Link></li>
              <li><Link to="/gallery">Work Gallery</Link></li>
              <li><Link to="/order">Order Custom Stamp</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          {/* Our Services */}
          <div className="footer-col">
            <h4 className="footer-heading">Stamp Services</h4>
            <ul className="footer-links">
              <li><Link to="/services#custom-rubber-stamp">Custom Rubber Stamp</Link></li>
              <li><Link to="/services#logo-stamp">Logo Stamp</Link></li>
              <li><Link to="/services#craft-stamp">Craft & DIY Stamp</Link></li>
              <li><Link to="/services#water-based-stamp">Water-Based Stamp</Link></li>
              <li><Link to="/services#business-stamp">Business & Company Seal</Link></li>
              <li><Link to="/services#custom-design-stamp">Bespoke Artwork Stamp</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="footer-col contact-col">
            <h4 className="footer-heading">Direct Contact</h4>
            
            <div className="contact-item">
              <Phone size={18} className="contact-icon" />
              <div>
                <span className="contact-label">Business Contact:</span>
                <a href={`tel:${BUSINESS.phoneRaw}`} className="contact-value">{BUSINESS.phone}</a>
              </div>
            </div>

            <div className="contact-item">
              <MessageSquare size={18} className="contact-icon text-red" />
              <div>
                <span className="contact-label">Order Assistance (WhatsApp):</span>
                <a href={SOCIAL_LINKS.orderWhatsapp} target="_blank" rel="noopener noreferrer" className="contact-value">
                  {BUSINESS.orderWhatsapp}
                </a>
              </div>
            </div>

            <div className="contact-item">
              <MapPin size={18} className="contact-icon" />
              <div>
                <span className="contact-label">Location:</span>
                <span className="contact-value">{BUSINESS.fullAddress}</span>
              </div>
            </div>

            <div className="verification-notice-pill">
              <ShieldCheck size={16} />
              <span>Government ID verification required where applicable.</span>
            </div>

          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="container bottom-content">
          <p>© {new Date().getFullYear()} Rafa Rubber Stamps Tenkasi. All Rights Reserved.</p>
          <div className="legal-links">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <span className="sep">•</span>
            <Link to="/terms">Terms & Conditions</Link>
          </div>
        </div>
      </div>

    </footer>
  );
}
