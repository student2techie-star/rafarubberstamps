import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MessageSquare, CheckCircle2, Truck, ShieldCheck, MapPin, Award, Star } from "lucide-react";
import SEO from "../components/SEO";
import TrustStrip from "../components/TrustStrip";
import ServiceCard from "../components/ServiceCard";
import WhyChooseUs from "../components/WhyChooseUs";
import HowItWorks from "../components/HowItWorks";
import FAQ from "../components/FAQ";
import { SERVICES } from "../data/services";
import { GALLERY_ITEMS } from "../data/gallery";
import { BUSINESS, SOCIAL_LINKS } from "../config";

export default function Home() {
  return (
    <>
      <SEO
        title="Rafa Rubber Stamps Tenkasi | Custom Rubber Stamp Maker"
        description="Rafa Rubber Stamps Tenkasi offers custom rubber stamps, logo stamps, craft stamps and water-based stamps with delivery across India. Order your customized stamp today."
        canonical="/"
      />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-container">
          
          <div className="hero-content">
            <div className="hero-badge">
              <Star className="badge-star" size={14} />
              <span>Trusted Rubber Stamp Maker in Tenkasi</span>
            </div>

            <h1 className="hero-heading">
              Custom Rubber Stamps <span className="highlight-text">Made With Precision</span>
            </h1>

            <p className="hero-subtext">
              Trusted stamp maker in Tenkasi offering customized rubber stamps, logo stamps, craft stamps, and water-based stamps with fast delivery across India.
            </p>

            <div className="hero-cta-group">
              <Link to="/order" className="btn btn-primary btn-hero">
                <span>Order Your Stamp</span>
                <ArrowRight size={20} />
              </Link>

              <a
                href={SOCIAL_LINKS.orderWhatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-hero"
              >
                <MessageSquare size={20} />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            <div className="hero-quick-features">
              <div className="feature-item">
                <CheckCircle2 size={16} className="text-red" />
                <span>Custom Designs</span>
              </div>
              <div className="feature-item">
                <CheckCircle2 size={16} className="text-red" />
                <span>Quality Craftsmanship</span>
              </div>
              <div className="feature-item">
                <CheckCircle2 size={16} className="text-red" />
                <span>Delivery Across India</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-image-wrapper">
              <img
                src="/images/hero.jpg"
                alt="Custom wooden and rubber stamp impression seal made by Rafa Rubber Stamps Tenkasi"
                className="hero-main-img"
                loading="eager"
              />
              <div className="hero-stamp-badge">
                <Award size={32} className="badge-icon" />
                <div>
                  <strong>100% Precision</strong>
                  <span>Laser Etched Rubber</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Trust Strip */}
      <TrustStrip />

      {/* Services Grid Section */}
      <section className="services-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-subtitle">OUR STAMP SERVICES</span>
            <h2 className="section-title">Tailored Stamping Solutions</h2>
            <p className="section-desc">
              Customized stamping solutions for businesses, professionals, creators, and personal use.
            </p>
          </div>

          <div className="services-grid">
            {SERVICES.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>

          <div className="text-center mt-5">
            <Link to="/services" className="btn btn-outline btn-lg">
              <span>Explore All Stamp Types</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Rafa */}
      <WhyChooseUs />

      {/* How Ordering Works */}
      <HowItWorks />

      {/* Stamp Gallery Showcase */}
      <section className="showcase-section">
        <div className="container">
          <div className="showcase-header">
            <div>
              <span className="section-subtitle">OUR CRAFTSMANSHIP</span>
              <h2 className="section-title">Recent Stamp Work</h2>
            </div>
            <Link to="/gallery" className="btn btn-outline">
              <span>View Full Gallery</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="gallery-preview-grid">
            {GALLERY_ITEMS.slice(0, 3).map((item) => (
              <div key={item.id} className="gallery-preview-card">
                <img src={item.image} alt={item.alt} loading="lazy" />
                <div className="gallery-overlay">
                  <span className="gallery-category">{item.category}</span>
                  <h4 className="gallery-title">{item.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="about-preview-section">
        <div className="container about-preview-container">
          <div className="about-preview-image">
            <div className="about-img-box">
              <img
                src="/images/hero.jpg"
                alt="Rafa Rubber Stamps Tenkasi Studio Workshop"
                loading="lazy"
              />
              <div className="experience-badge">
                <span className="exp-city">TENKASI</span>
                <span className="exp-label">Local Expertise</span>
              </div>
            </div>
          </div>

          <div className="about-preview-content">
            <span className="section-subtitle">ABOUT RAFA RUBBER STAMPS</span>
            <h2 className="section-title">Trusted Stamp Maker in Tenkasi</h2>
            <p>
              Rafa Rubber Stamps is a Tenkasi-based custom stamp maker specializing in customized rubber stamps and personalized stamping solutions for businesses, offices, and creative projects.
            </p>
            <p>
              We focus on clean impression clarity, durable vulcanized rubber, ergonomic wooden and self-inking handles, and direct personal assistance through WhatsApp.
            </p>

            <ul className="about-check-list">
              <li>✓ Custom size & shape matching your document or box</li>
              <li>✓ Signature & vector logo conversion</li>
              <li>✓ Secure Government ID verification compliance</li>
              <li>✓ Safe nationwide delivery across India</li>
            </ul>

            <div className="mt-4">
              <Link to="/about" className="btn btn-primary">
                <span>Learn More About Us</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* India Delivery Section */}
      <section className="delivery-banner-section">
        <div className="container delivery-banner-card">
          <div className="delivery-banner-content">
            <div className="delivery-icon-wrap">
              <Truck size={36} />
            </div>
            <div>
              <h3>Delivering Custom Stamps Across India</h3>
              <p>
                Based in Tenkasi, Tamil Nadu, we safely package and deliver customized rubber stamps to customers across all states and districts in India.
              </p>
            </div>
          </div>
          <div className="delivery-banner-action">
            <Link to="/order" className="btn btn-white">
              <span>Order Delivery Online</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />

    </>
  );
}
