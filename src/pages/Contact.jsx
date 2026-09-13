import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Phone, MessageSquare, MapPin, Copy, Check, ArrowRight, Clock, ShieldCheck } from "lucide-react";
import SEO from "../components/SEO";
import { BUSINESS, SOCIAL_LINKS } from "../config";

export default function Contact() {
  const [copiedNumber, setCopiedNumber] = useState(false);

  const handleCopyNumber = () => {
    navigator.clipboard.writeText(BUSINESS.orderWhatsappRaw);
    setCopiedNumber(true);
    setTimeout(() => setCopiedNumber(false), 2500);
  };

  return (
    <>
      <SEO
        title={`Contact ${BUSINESS.name} ${BUSINESS.city}`}
        description={`Contact ${BUSINESS.name} ${BUSINESS.city} for custom rubber stamps, logo stamps and personalized stamp orders. Business WhatsApp: ${BUSINESS.phone}, Order Assistance: ${BUSINESS.orderWhatsapp}.`}
        canonical="/contact"
      />

      {/* Page Header */}
      <section className="page-header">
        <div className="container text-center">
          <span className="section-subtitle">GET IN TOUCH</span>
          <h1 className="page-title">Let's Create Your Stamp</h1>
          <p className="page-lead">
            Have questions about custom designs, bulk orders, or stamp specifications? Connect directly with Rafa Rubber Stamps Tenkasi.
          </p>
        </div>
      </section>

      {/* Main Contact Content */}
      <section className="contact-section">
        <div className="container">
          <div className="contact-grid">
            
            {/* Contact Details Column */}
            <div className="contact-info-card">
              <span className="section-subtitle">DIRECT COMMUNICATION</span>
              <h2>Contact Information</h2>
              <p className="contact-intro">
                Reach out to us for quick design reviews, price estimation, or order tracking.
              </p>

              <div className="contact-detail-list">
                
                {/* General Inquiry */}
                <div className="contact-card-item">
                  <div className="contact-icon-box bg-dark">
                    <Phone size={24} className="text-white" />
                  </div>
                  <div>
                    <span className="detail-tag">General Business Inquiry</span>
                    <h3 className="detail-value">{BUSINESS.phone}</h3>
                    <div className="contact-card-actions">
                      <a href={`tel:${BUSINESS.phoneRaw}`} className="btn btn-outline-sm">
                        <Phone size={14} />
                        <span>Call Now</span>
                      </a>
                      <a
                        href={SOCIAL_LINKS.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-whatsapp-sm"
                      >
                        <MessageSquare size={14} />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Order WhatsApp */}
                <div className="contact-card-item highlight-border">
                  <div className="contact-icon-box bg-red">
                    <MessageSquare size={24} className="text-white" />
                  </div>
                  <div>
                    <span className="detail-tag tag-red">Order Assistance & File Reviews</span>
                    <h3 className="detail-value text-red">{BUSINESS.orderWhatsapp}</h3>
                    <div className="contact-card-actions">
                      <a
                        href={SOCIAL_LINKS.orderWhatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-whatsapp-sm"
                      >
                        <MessageSquare size={14} />
                        <span>Order WhatsApp</span>
                      </a>
                      <button className="btn btn-outline-sm" onClick={handleCopyNumber}>
                        {copiedNumber ? <Check size={14} /> : <Copy size={14} />}
                        <span>{copiedNumber ? "Copied!" : "Copy Number"}</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="contact-card-item">
                  <div className="contact-icon-box bg-dark">
                    <MapPin size={24} className="text-white" />
                  </div>
                  <div>
                    <span className="detail-tag">Location</span>
                    <h3 className="detail-value">{BUSINESS.fullAddress}</h3>
                    <p className="detail-subtext">Delivering customized rubber stamps across all of India.</p>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="contact-card-item">
                  <div className="contact-icon-box bg-dark">
                    <Clock size={24} className="text-white" />
                  </div>
                  <div>
                    <span className="detail-tag">Working Hours</span>
                    <h3 className="detail-value">{BUSINESS.openingHours}</h3>
                    <p className="detail-subtext">Online order form accessible 24/7</p>
                  </div>
                </div>

              </div>

              <div className="mt-4">
                <Link to="/order" className="btn btn-primary btn-lg btn-block">
                  <span>Order Your Custom Stamp Now</span>
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>

            {/* Google Map Section */}
            <div className="contact-map-card">
              <div className="map-header">
                <h3>Find Us — Tenkasi, Tamil Nadu</h3>
                <p>Located in Tenkasi district, serving local customers and dispatching nationwide.</p>
              </div>

              <div className="map-iframe-wrapper">
                <iframe
                  title="Rafa Rubber Stamps Tenkasi Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3941.879555627263!2d77.3090!3d8.9595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOMKwNTcnMzQuMiJOIDc3wrAxOCczMi40IkU!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="380"
                  style={{ border: 0, borderRadius: "12px" }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className="map-footer-note">
                <ShieldCheck size={18} className="text-red" />
                <span>Government ID verification required for official stamp orders where applicable.</span>
              </div>
            </div>

          </div>

          {/* Official Online Profiles & Social Directory Section */}
          <div className="contact-social-section">
            <div className="text-center mb-4">
              <span className="section-subtitle">OFFICIAL PROFILES & SOCIAL MEDIA</span>
              <h2>Connect With Us Online</h2>
              <p className="section-desc-sm">
                Follow our official business listings, customer reviews, stamp crafting videos, and daily updates.
              </p>
            </div>

            <div className="social-cards-grid">
              
              {/* Justdial */}
              <a
                href={SOCIAL_LINKS.justdial}
                target="_blank"
                rel="noopener noreferrer"
                className="social-card-item justdial-card"
              >
                <div className="social-card-header">
                  <div className="social-logo-badge justdial-badge">
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm-1-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm5 7h-2v-3c0-.55-.45-1-1-1s-1 .45-1 1v3h-2v-6h2v1.1c.41-.67 1.18-1.1 2-1.1 1.38 0 2.5 1.12 2.5 2.5V17z"/>
                    </svg>
                  </div>
                  <span className="social-network-tag tag-justdial">Justdial</span>
                </div>
                <h3 className="social-card-title">Justdial Business Listing</h3>
                <p className="social-card-handle">Rafa Rubber Stamps (Near Collector Office, LRS Palayam)</p>
                <div className="social-card-cta">
                  <span>View Profile & Reviews</span>
                  <ArrowRight size={16} />
                </div>
              </a>

              {/* Instagram */}
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="social-card-item instagram-card"
              >
                <div className="social-card-header">
                  <div className="social-logo-badge instagram-badge">
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </div>
                  <span className="social-network-tag tag-instagram">Instagram</span>
                </div>
                <h3 className="social-card-title">Instagram Feed</h3>
                <p className="social-card-handle">@rafastampstenkasi</p>
                <div className="social-card-cta">
                  <span>Follow on Instagram</span>
                  <ArrowRight size={16} />
                </div>
              </a>

              {/* Threads */}
              <a
                href={SOCIAL_LINKS.threadsOriginal || SOCIAL_LINKS.threads}
                target="_blank"
                rel="noopener noreferrer"
                className="social-card-item threads-card"
              >
                <div className="social-card-header">
                  <div className="social-logo-badge threads-badge">
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                      <path d="M12.186 24h-.007c-3.581-.026-6.375-1.267-8.304-3.689-1.745-2.193-2.583-5.203-2.493-8.947.106-4.385 1.684-7.79 4.69-10.12 2.457-1.904 5.753-2.84 9.796-2.78 4.417.065 7.857 1.282 10.224 3.618 2.052 2.025 3.076 4.792 3.045 8.225-.03 3.327-.97 5.922-2.793 7.717-1.637 1.611-3.864 2.443-6.619 2.472h-.056c-2.428 0-4.343-.637-5.69-1.894-1.228-1.146-1.84-2.656-1.82-4.488.02-1.956.713-3.484 2.062-4.542 1.258-.988 2.973-1.492 5.099-1.498l1.378.005c.01-.58-.094-1.11-.31-1.574-.356-.767-1.04-1.182-2.036-1.233h-.066c-.722 0-1.464.195-2.207.579-.623.322-1.07.689-1.332 1.09l-2.096-1.428c.55-.913 1.39-1.647 2.497-2.181C10.744 3.018 12.083 2.76 13.4 2.76h.105c1.868.096 3.284.786 4.209 2.052.79 1.08 1.157 2.453 1.09 4.084l-.01 2.378c.007 1.343.326 2.368.948 3.048.513.561 1.218.85 2.094.857.064 0 .13-.003.196-.008 1.396-.107 2.392-.916 2.96-2.404.385-1.009.563-2.298.53-3.832.025-2.736-.786-4.922-2.41-6.495-1.83-1.776-4.502-2.7-7.942-2.75-3.32-.048-5.99.71-7.935 2.253-2.43 1.928-3.71 4.743-3.804 8.368-.074 3.085.61 5.56 2.035 7.357 1.543 1.939 3.774 2.933 6.63 2.955h.007c1.782 0 3.388-.39 4.773-1.159.905-.503 1.666-1.182 2.262-2.018l2.096 1.427c-.887 1.258-2.019 2.268-3.364 3.003-1.92 1.05-4.143 1.583-6.608 1.583zm3.72-8.32c-1.392.004-2.493.308-3.272.905-.733.562-1.107 1.346-1.115 2.33-.01.957.29 1.706.892 2.227.697.603 1.662.91 2.868.91h.034c1.472-.016 2.65-.465 3.501-1.335.791-.809 1.196-1.867 1.205-3.146l-.004-.891-4.109 0z"/>
                    </svg>
                  </div>
                  <span className="social-network-tag tag-threads">Threads</span>
                </div>
                <h3 className="social-card-title">Threads Account</h3>
                <p className="social-card-handle">@rafastampstenkasi</p>
                <div className="social-card-cta">
                  <span>Follow on Threads</span>
                  <ArrowRight size={16} />
                </div>
              </a>

              {/* YouTube */}
              <a
                href={SOCIAL_LINKS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="social-card-item youtube-card"
              >
                <div className="social-card-header">
                  <div className="social-logo-badge youtube-badge">
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </div>
                  <span className="social-network-tag tag-youtube">YouTube</span>
                </div>
                <h3 className="social-card-title">YouTube Channel</h3>
                <p className="social-card-handle">@rafastamps</p>
                <div className="social-card-cta">
                  <span>Watch Stamp Videos</span>
                  <ArrowRight size={16} />
                </div>
              </a>

            </div>
          </div>

        </div>
      </section>

    </>
  );
}
