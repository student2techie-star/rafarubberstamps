import React, { useState } from "react";
import { MessageSquare, X } from "lucide-react";
import { BUSINESS, SOCIAL_LINKS } from "../config";

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="floating-whatsapp-container">
      {/* Popover tooltip preview */}
      {showTooltip && (
        <div className="whatsapp-popover">
          <button className="popover-close" onClick={() => setShowTooltip(false)} aria-label="Close popover">
            <X size={14} />
          </button>
          <div className="popover-body">
            <strong>Need help with your stamp order?</strong>
            <p>Chat directly with Rafa Rubber Stamps Tenkasi on WhatsApp.</p>
            <a
              href={SOCIAL_LINKS.orderWhatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-sm btn-block"
            >
              Start Chat ({BUSINESS.orderWhatsapp})
            </a>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <a
        href={SOCIAL_LINKS.orderWhatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-whatsapp-btn"
        onMouseEnter={() => setShowTooltip(true)}
        aria-label="Chat on WhatsApp with Rafa Rubber Stamps"
      >
        <MessageSquare className="whatsapp-icon" size={28} />
        <span className="pulse-ring"></span>
        <span className="btn-text-desktop">Chat with us</span>
      </a>
    </div>
  );
}
