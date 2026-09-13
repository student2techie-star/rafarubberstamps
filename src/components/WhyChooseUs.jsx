import React from "react";
import { Sliders, Sparkles, Send, MessageCircle, MapPin, Truck } from "lucide-react";

export default function WhyChooseUs() {
  const points = [
    {
      icon: <Sliders size={26} />,
      title: "100% Custom Made",
      desc: "Every stamp is prepared meticulously according to your exact text, dimension, and artwork requirements."
    },
    {
      icon: <Sparkles size={26} />,
      title: "Quality Focused",
      desc: "We focus on sharp, clean, and durable stamp impressions that last thousands of presses without fading."
    },
    {
      icon: <Send size={26} />,
      title: "Easy Online Form",
      desc: "Submit your text details, signature, and artwork directly through our streamlined order wizard."
    },
    {
      icon: <MessageCircle size={26} />,
      title: "Personal Assistance",
      desc: "Communicate directly with our stamp crafters on WhatsApp for quick proofs and custom pricing."
    },
    {
      icon: <MapPin size={26} />,
      title: "Tenkasi Based",
      desc: "Dedicated local Tamil Nadu business focused on friendly service and high quality craftsmanship."
    },
    {
      icon: <Truck size={26} />,
      title: "India-Wide Delivery",
      desc: "Fast and reliable shipping across all states and union territories in India."
    }
  ];

  return (
    <section className="why-choose-section">
      <div className="container">
        
        <div className="section-header text-center">
          <span className="section-subtitle">THE RAFA DIFFERENCE</span>
          <h2 className="section-title">Why Choose Rafa Rubber Stamps?</h2>
          <p className="section-desc">
            Precision engineering, artisanal care, and hassle-free WhatsApp order confirmation.
          </p>
        </div>

        <div className="why-grid">
          {points.map((pt, idx) => (
            <div key={idx} className="why-card">
              <div className="why-icon-badge">{pt.icon}</div>
              <h3 className="why-title">{pt.title}</h3>
              <p className="why-desc">{pt.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
