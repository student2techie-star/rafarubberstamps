import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Stamp,
  Briefcase,
  Palette,
  Droplets,
  FileCheck,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Clock,
  Truck,
  Award,
  Filter
} from "lucide-react";
import SEO from "../components/SEO";
import { SERVICES } from "../data/services";
import { BUSINESS } from "../config";

const iconMap = {
  Stamp: Stamp,
  Briefcase: Briefcase,
  Palette: Palette,
  Droplets: Droplets,
  FileCheck: FileCheck,
  Sparkles: Sparkles
};

export default function Services() {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", label: "All Stamp Types" },
    { id: "custom-rubber-stamp", label: "Custom Rubber" },
    { id: "logo-stamp", label: "Logo & Branding" },
    { id: "craft-stamp", label: "Craft & DIY" },
    { id: "water-based-stamp", label: "Water-Based" },
    { id: "business-stamp", label: "Official Business" },
    { id: "custom-design-stamp", label: "Bespoke Design" }
  ];

  const filteredServices = activeCategory === "all"
    ? SERVICES
    : SERVICES.filter(s => s.id === activeCategory);

  return (
    <>
      <SEO
        title={`Custom Rubber Stamp Services in Tenkasi | ${BUSINESS.name}`}
        description={`Explore custom rubber stamps, logo stamps, craft stamps, business seals and water-based self-inking stamps from ${BUSINESS.name} ${BUSINESS.city}. Express nationwide delivery.`}
        canonical="/services"
      />

      {/* Page Header */}
      <section className="page-header services-header">
        <div className="container text-center">
          <span className="section-subtitle">PRECISION CRAFTSMANSHIP SINCE 1960</span>
          <h1 className="page-title">Rubber Stamp Services</h1>
          <p className="page-lead">
            High-precision, durable, and clean stamping solutions tailored for companies, offices, craft makers, legal documents, and personal branding.
          </p>

          {/* Quick Metrics Bar */}
          <div className="services-hero-metrics">
            <div className="metric-pill">
              <Clock size={16} className="text-red" />
              <span>24-48 Hours Crafting</span>
            </div>
            <div className="metric-pill">
              <Truck size={16} className="text-red" />
              <span>Pan-India Courier</span>
            </div>
            <div className="metric-pill">
              <Award size={16} className="text-red" />
              <span>60+ Years Experience</span>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Swipeable Category Filter Bar */}
      <section className="services-filter-bar-wrapper">
        <div className="container">
          <div className="services-filter-scroll">
            <div className="filter-label-pill">
              <Filter size={14} />
              <span>Filter:</span>
            </div>
            {categories.map(cat => (
              <button
                key={cat.id}
                className={`filter-btn ${activeCategory === cat.id ? "active" : ""}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="services-detail-section">
        <div className="container">
          
          <div className="services-list-container">
            {filteredServices.map((service, index) => {
              const IconComp = iconMap[service.icon] || Stamp;

              return (
                <article
                  key={service.id}
                  id={service.id}
                  className="service-clean-card"
                >
                  <div className="service-clean-badge-row">
                    <div className="service-clean-icon-box">
                      <IconComp size={24} />
                    </div>
                    <div className="service-clean-tags">
                      <span className="category-pill">{service.category}</span>
                      <span className="tag-highlight">{service.tag}</span>
                    </div>
                  </div>

                  <div className="service-clean-main">
                    <h2 className="service-clean-title">{service.title}</h2>
                    <p className="service-clean-short">{service.shortDescription}</p>
                    <p className="service-clean-full">{service.fullDescription}</p>

                    <div className="service-highlights-box">
                      <h4 className="highlights-heading">Key Features & Benefits:</h4>
                      <ul className="service-features-grid">
                        {service.features.map((feature, fIdx) => (
                          <li key={fIdx} className="feature-item">
                            <CheckCircle2 size={16} className="feature-check" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="service-clean-footer">
                    <div className="service-specs-quick">
                      <ShieldCheck size={16} className="text-red" />
                      <span>Custom Sizing & Sample Proof Available</span>
                    </div>
                    <Link
                      to={`/order?type=${service.id}`}
                      className="btn btn-primary btn-block-mobile"
                    >
                      <span>Order {service.title}</span>
                      <ArrowRight size={18} />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>

        </div>
      </section>

      {/* Rubber Stamp Materials & Ink Guide Matrix */}
      <section className="specs-matrix-section">
        <div className="container">
          <div className="text-center mb-4">
            <span className="section-subtitle">STAMP SPECIFICATIONS</span>
            <h2>Materials & Finishing Options</h2>
            <p className="section-desc-sm">
              We offer multiple handle bases and ink formulations to suit every application type.
            </p>
          </div>

          <div className="matrix-grid">
            <div className="matrix-card">
              <div className="matrix-card-icon">🪵</div>
              <h3>Wooden Handle Stamps</h3>
              <p>Traditional hardwood mount paired with thick rubber die. Classic, durable, and cost-effective for everyday office use.</p>
            </div>

            <div className="matrix-card">
              <div className="matrix-card-icon">🔮</div>
              <h3>Clear Acrylic Mounts</h3>
              <p>Transparent handle mount allowing precise placement alignment on documents, cards, and craft tags.</p>
            </div>

            <div className="matrix-card">
              <div className="matrix-card-icon">⚡</div>
              <h3>Self-Inking Units</h3>
              <p>Built-in ink pad mechanism. Automatically re-inks with every press. Ideal for rapid high-volume paperwork.</p>
            </div>

            <div className="matrix-card">
              <div className="matrix-card-icon">💧</div>
              <h3>Water-Based & Pigment Inks</h3>
              <p>Quick-drying, crisp ink colors available in Red, Blue, Black, Violet, and Green for sharp impression clarity.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Requirement CTA Banner */}
      <section className="container mb-5">
        <div className="custom-service-banner">
          <div className="banner-content-text">
            <h3>Need a Custom Size or Have Artwork to Review?</h3>
            <p>Upload your vector file, PDF, or photo sketch in our order portal or connect directly over WhatsApp.</p>
          </div>
          <div className="banner-actions-group">
            <Link to="/order" className="btn btn-primary btn-lg">
              <span>Start Custom Stamp Order</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
