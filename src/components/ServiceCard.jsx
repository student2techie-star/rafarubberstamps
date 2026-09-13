import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Stamp, Briefcase, Palette, Droplets, FileCheck, Sparkles } from "lucide-react";

const ICON_MAP = {
  Stamp: Stamp,
  Briefcase: Briefcase,
  Palette: Palette,
  Droplets: Droplets,
  FileCheck: FileCheck,
  Sparkles: Sparkles
};

export default function ServiceCard({ service }) {
  const IconComponent = ICON_MAP[service.icon] || Stamp;

  return (
    <div className="service-card">
      <div className="service-card-image-wrap">
        <img
          src="/images/hero.jpg"
          alt={`${service.title} by Rafa Rubber Stamps Tenkasi`}
          loading="lazy"
          className="service-card-img"
        />
        <div className="service-card-tag">{service.tag}</div>
        <div className="service-card-icon-overlay">
          <IconComponent size={22} />
        </div>
      </div>

      <div className="service-card-body">
        <span className="service-category">{service.category}</span>
        <h3 className="service-title">{service.title}</h3>
        <p className="service-desc">{service.shortDescription}</p>

        <ul className="service-feature-list">
          {service.features.slice(0, 2).map((feat, i) => (
            <li key={i}>✓ {feat}</li>
          ))}
        </ul>

        <div className="service-card-footer">
          <Link
            to={`/order?type=${service.id}`}
            className="btn btn-outline-sm btn-service-cta"
          >
            <span>Order This Stamp</span>
            <ArrowRight size={16} className="arrow-icon" />
          </Link>
        </div>
      </div>
    </div>
  );
}
