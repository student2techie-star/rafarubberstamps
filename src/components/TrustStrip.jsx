import React from "react";
import { CheckCircle2, ShieldCheck, MapPin, Truck } from "lucide-react";

export default function TrustStrip() {
  const trustItems = [
    {
      icon: <CheckCircle2 size={24} className="trust-icon" />,
      title: "Custom Made",
      desc: "Tailored to your exact design"
    },
    {
      icon: <ShieldCheck size={24} className="trust-icon" />,
      title: "Quality Printing",
      desc: "Crisp laser impression finish"
    },
    {
      icon: <MapPin size={24} className="trust-icon" />,
      title: "Tenkasi Based",
      desc: "Trusted local specialist"
    },
    {
      icon: <Truck size={24} className="trust-icon" />,
      title: "Delivery Across India",
      desc: "Fast dispatch nationwide"
    }
  ];

  return (
    <section className="trust-strip">
      <div className="container">
        <div className="trust-grid">
          {trustItems.map((item, idx) => (
            <div key={idx} className="trust-card">
              <div className="trust-icon-box">{item.icon}</div>
              <div className="trust-text">
                <h4 className="trust-title">{item.title}</h4>
                <p className="trust-desc">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
