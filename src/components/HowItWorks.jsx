import React from "react";
import { Link } from "react-router-dom";
import { MousePointerClick, Edit3, UploadCloud, MessageSquare, ArrowRight } from "lucide-react";
import { SOCIAL_LINKS } from "../config";

export default function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Choose Your Stamp",
      desc: "Select the stamp type (Custom Rubber, Logo, Craft, Water-Based, or Business Seal).",
      icon: <MousePointerClick size={28} className="step-icon" />
    },
    {
      num: "02",
      title: "Enter Your Details",
      desc: "Provide the exact name, text line details, shape, quantity, and delivery address.",
      icon: <Edit3 size={28} className="step-icon" />
    },
    {
      num: "03",
      title: "Upload Your Files",
      desc: "Attach your signature/logo artwork and required Government ID proof for verification.",
      icon: <UploadCloud size={28} className="step-icon" />
    },
    {
      num: "04",
      title: "Submit & Confirm on WhatsApp",
      desc: "Review summary, click submit, and chat directly with Rafa Stamps on WhatsApp to finalize design.",
      icon: <MessageSquare size={28} className="step-icon text-red" />
    }
  ];

  return (
    <section className="how-it-works-section">
      <div className="container">
        
        <div className="section-header text-center">
          <span className="section-subtitle">EASY 4-STEP PROCESS</span>
          <h2 className="section-title">How To Order Your Stamp</h2>
          <p className="section-desc">
            Simple online enquiry and order collection. No complex checkout — instant direct communication via WhatsApp.
          </p>
        </div>

        <div className="timeline-grid">
          {steps.map((step, idx) => (
            <div key={idx} className="timeline-card">
              <div className="timeline-num-badge">{step.num}</div>
              <div className="timeline-icon-box">{step.icon}</div>
              <h3 className="timeline-title">{step.title}</h3>
              <p className="timeline-desc">{step.desc}</p>
              {idx < steps.length - 1 && <div className="timeline-connector d-desktop-only" />}
            </div>
          ))}
        </div>

        <div className="timeline-action text-center">
          <Link to="/order" className="btn btn-primary btn-lg">
            <span>Start Your Order Now</span>
            <ArrowRight size={18} />
          </Link>
        </div>

      </div>
    </section>
  );
}
