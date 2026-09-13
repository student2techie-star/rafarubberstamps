import React, { useState } from "react";
import { Link } from "react-router-dom";
import { X, ArrowRight, Stamp } from "lucide-react";
import SEO from "../components/SEO";
import { GALLERY_ITEMS, GALLERY_CATEGORIES } from "../data/gallery";

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);

  const filteredItems = activeCategory === "All"
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === activeCategory);

  return (
    <>
      <SEO
        title="Stamp Showcase & Gallery | Rafa Rubber Stamps Tenkasi"
        description="View our portfolio of custom rubber stamps, logo stamps, craft stamps, and official business seals created by Rafa Rubber Stamps Tenkasi."
        canonical="/gallery"
      />

      {/* Page Header */}
      <section className="page-header">
        <div className="container text-center">
          <span className="section-subtitle">OUR PORTFOLIO</span>
          <h1 className="page-title">Our Stamp Work Showcase</h1>
          <p className="page-lead">
            Explore recent customized rubber stamps, logo impressions, craft seals, and official company stamps.
          </p>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="gallery-section">
        <div className="container">
          
          <div className="gallery-tabs">
            {GALLERY_CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`tab-btn ${activeCategory === cat ? "active" : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Image Grid */}
          <div className="gallery-grid">
            {filteredItems.map(item => (
              <div
                key={item.id}
                className="gallery-card"
                onClick={() => setSelectedImage(item)}
              >
                <div className="gallery-img-wrap">
                  <img
                    src={item.image}
                    alt={item.alt}
                    loading="lazy"
                  />
                  <div className="gallery-hover-overlay">
                    <span className="cat-badge">{item.category}</span>
                    <h3>{item.title}</h3>
                    <span className="zoom-label">Click to expand</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-5">
            <Link to="/order" className="btn btn-primary btn-lg">
              <span>Order Your Custom Stamp</span>
              <ArrowRight size={18} />
            </Link>
          </div>

        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="lightbox-modal-backdrop" onClick={() => setSelectedImage(null)}>
          <div className="lightbox-modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="lightbox-close-btn"
              onClick={() => setSelectedImage(null)}
              aria-label="Close modal"
            >
              <X size={24} />
            </button>
            <img src={selectedImage.image} alt={selectedImage.alt} />
            <div className="lightbox-caption">
              <span className="cat-pill">{selectedImage.category}</span>
              <h3>{selectedImage.title}</h3>
              <p>{selectedImage.alt}</p>
              <Link to="/order" className="btn btn-primary btn-sm mt-3">
                Order Similar Stamp
              </Link>
            </div>
          </div>
        </div>
      )}

    </>
  );
}
