import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, ShieldCheck, MapPin, Truck, Award, Sparkles, MessageSquare, Star } from "lucide-react";
import SEO from "../components/SEO";
import FAQ from "../components/FAQ";
import { BUSINESS, SOCIAL_LINKS } from "../config";

export default function About() {
  const stats = [
    { value: "1960", label: "Year Established", desc: "Decades of Stamp Heritage" },
    { value: "100%", label: "Laser Precision", desc: "Crisp Rubber Die Impressions" },
    { value: "India", label: "Nationwide Shipping", desc: "Delivering to All States & Cities" },
    { value: "Direct", label: "WhatsApp Desk", desc: "Fast Proof & Price Confirmation" }
  ];

  const pillars = [
    {
      icon: <Award size={24} className="text-red" />,
      title: "Artisanal Laser Precision",
      desc: "High-density vulcanized rubber dies cut to replicate exact vector logos, signatures, and crisp text lines."
    },
    {
      icon: <MapPin size={24} className="text-red" />,
      title: "Tenkasi Local Specialist",
      desc: "Based in Tenkasi, Tamil Nadu, serving local businesses, advocates, doctors, and offices with personal care."
    },
    {
      icon: <ShieldCheck size={24} className="text-red" />,
      title: "Government ID Security",
      desc: "Strict verification compliance for official company seals and authorized signatory stamps to prevent fraud."
    },
    {
      icon: <Truck size={24} className="text-red" />,
      title: "Nationwide Express Shipping",
      desc: "Fast courier dispatch with protective packaging delivering customized stamps across all of India."
    }
  ];

  return (
    <>
      <SEO
        title={`About ${BUSINESS.name} ${BUSINESS.city} | Estd. 1960 Stamp Maker`}
        description={`Learn about ${BUSINESS.name} ${BUSINESS.city} (Estd. 1960), a custom stamp maker offering personalized rubber stamps, logo stamps, craft stamps, and stamping solutions with India-wide delivery.`}
        canonical="/about"
      />

      {/* Page Hero Header */}
      <section className="about-hero-header text-center">
        <div className="container">
          <div className="hero-badge mx-auto mb-3">
            <Sparkles size={14} className="badge-star" />
            <span>ESTD. 1960 • TENKASI, TAMIL NADU</span>
          </div>
          <h1 className="about-hero-title">
            Crafting Custom Rubber Stamps <span className="highlight-text">With Precision</span>
          </h1>
          <p className="about-hero-lead">
            Trusted stamp maker in Tenkasi offering customized rubber stamps, logo stamps, craft stamps, and water-based self-inking stamps with delivery across India.
          </p>
        </div>
      </section>

      {/* 4-Stat Counter Bar */}
      <section className="about-stats-bar">
        <div className="container">
          <div className="about-stats-grid">
            {stats.map((st, i) => (
              <div key={i} className="about-stat-item">
                <div className="stat-number">{st.value}</div>
                <div className="stat-title">{st.label}</div>
                <div className="stat-subtitle">{st.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2-Column Split Story Section */}
      <section className="about-story-block">
        <div className="container">
          <div className="about-story-grid">
            
            {/* Left Column: Image Card */}
            <div className="about-story-visual">
              <div className="about-visual-frame">
                <img
                  src="/images/hero.jpg"
                  alt="Rafa Rubber Stamps Tenkasi Studio Workshop"
                  loading="lazy"
                />
                <div className="about-experience-pill">
                  <Star size={18} className="text-red" />
                  <div>
                    <strong>RAFA RUBBER STAMPS</strong>
                    <span>Estd. 1960 • Tenkasi</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Structured Copy */}
            <div className="about-story-content">
              <span className="section-subtitle">OUR CRAFTSMANSHIP & VALUES</span>
              <h2 className="about-content-heading">Trusted Custom Stamp Maker in Tenkasi</h2>
              
              <p className="about-p">
                <strong>Rafa Rubber Stamps</strong> is a Tenkasi-based custom stamp maker specializing in customized rubber stamps, logo stamps, craft stamps, and water-based self-inking stamps.
              </p>
              <p className="about-p">
                We believe every stamp represents identity, authority, or creative expression — whether it’s an official company seal for legal documentation, an Authorized Signatory stamp for billing invoices, or a custom logo stamp for handmade packaging.
              </p>
              <p className="about-p">
                Our process combines fine laser rubber etching with sturdy handles to produce razor-sharp impressions every single time.
              </p>

              <div className="about-checklist">
                <div className="checklist-item">
                  <CheckCircle2 size={18} className="text-red" />
                  <span>Custom sizes & shapes matching your exact document or box</span>
                </div>
                <div className="checklist-item">
                  <CheckCircle2 size={18} className="text-red" />
                  <span>Signature & vector logo artwork conversion</span>
                </div>
                <div className="checklist-item">
                  <CheckCircle2 size={18} className="text-red" />
                  <span>Government ID verification safety compliance</span>
                </div>
                <div className="checklist-item">
                  <CheckCircle2 size={18} className="text-red" />
                  <span>Fast nationwide delivery across all states in India</span>
                </div>
              </div>

              <div className="about-action-buttons">
                <Link to="/order" className="btn btn-primary btn-lg">
                  <span>Order Custom Stamp</span>
                  <ArrowRight size={18} />
                </Link>
                <a
                  href={SOCIAL_LINKS.orderWhatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp btn-lg"
                >
                  <MessageSquare size={18} />
                  <span>WhatsApp Assistance</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4 Pillars Section */}
      <section className="about-pillars-block">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-subtitle">THE RAFA STANDARDS</span>
            <h2 className="section-title">Built On Quality & Trust</h2>
            <p className="section-desc">Why customers in Tenkasi and across India choose Rafa Rubber Stamps.</p>
          </div>

          <div className="pillars-grid-4">
            {pillars.map((pil, idx) => (
              <div key={idx} className="pillar-card-box">
                <div className="pillar-icon-header">{pil.icon}</div>
                <h3 className="pillar-card-title">{pil.title}</h3>
                <p className="pillar-card-desc">{pil.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Local SEO Trust Paragraph Section */}
      <section className="local-trust-section">
        <div className="container">
          <div className="local-trust-card">
            <h3>Serving Tenkasi & Shipping Across India</h3>
            <p>
              Rafa Rubber Stamps is a custom stamp maker based in Tenkasi, Tamil Nadu, providing customized rubber stamps, logo stamps, craft stamps and other personalized stamp solutions. Customers can share their requirements and artwork through the online order form and contact the business through WhatsApp. Orders can be delivered across India.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="about-faq-wrapper">
        <FAQ />
      </section>

    </>
  );
}
