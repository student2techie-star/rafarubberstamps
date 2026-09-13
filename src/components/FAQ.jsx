import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

export default function FAQ() {
  const faqs = [
    {
      q: "What types of stamps do you make?",
      a: "We manufacture custom rubber stamps, business logo stamps, craft & packaging stamps, self-inking water-based stamps, company seals, doctor/advocate name stamps, and bespoke artwork stamps."
    },
    {
      q: "Can I order a stamp with my logo?",
      a: "Yes! You can upload your vector logo, PNG, or PDF file directly through our online order form. We convert your logo into a high-density stamp die."
    },
    {
      q: "Can I upload my signature for a signature stamp?",
      a: "Yes. Simply sign on a white sheet of paper, take a clear photo or scan, and upload it in the order form. Clear black-and-white images give the best stamp results."
    },
    {
      q: "Do you deliver outside Tenkasi?",
      a: "Yes, we deliver across all cities, towns, and districts throughout Tamil Nadu and all over India via courier services."
    },
    {
      q: "What documents are required for government/official stamps?",
      a: "Government ID proof (such as Aadhaar, Driving License, or Company Registration document) is required for order verification where applicable to prevent unauthorized stamp duplication."
    },
    {
      q: "How do I place an order?",
      a: "Select your desired stamp type, fill in your text/dimensions, upload your logo/signature and Government ID, and submit. The site generates a formatted WhatsApp message for you to send to +91 93602 93815 for price and delivery confirmation."
    }
  ];

  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      <div className="container">
        
        <div className="section-header text-center">
          <span className="section-subtitle">FREQUENTLY ASKED QUESTIONS</span>
          <h2 className="section-title">Everything You Need To Know</h2>
          <p className="section-desc">Got questions about stamp customization, ordering, or delivery? Find your answers below.</p>
        </div>

        <div className="faq-accordion">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className={`faq-card ${isOpen ? "active" : ""}`}>
                <button
                  className="faq-question-btn"
                  onClick={() => toggleFAQ(idx)}
                  aria-expanded={isOpen}
                >
                  <span className="faq-question-text">
                    <HelpCircle size={20} className="faq-q-icon" />
                    {faq.q}
                  </span>
                  <ChevronDown className={`faq-chevron ${isOpen ? "rotate" : ""}`} size={20} />
                </button>

                {isOpen && (
                  <div className="faq-answer-body">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
