import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Phone, MessageSquare, ArrowRight } from "lucide-react";
import { BUSINESS, SOCIAL_LINKS } from "../config";

export default function MobileBottomBar() {
  const location = useLocation();

  // Hide on order page to avoid obscuring form inputs
  if (location.pathname === "/order") {
    return null;
  }

  return (
    <div className="mobile-bottom-bar d-mobile-only">
      <a
        href={`tel:${BUSINESS.phoneRaw}`}
        className="mobile-bar-btn btn-call"
        aria-label="Call Rafa Stamps"
      >
        <Phone size={18} />
        <span>Call</span>
      </a>

      <a
        href={SOCIAL_LINKS.orderWhatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="mobile-bar-btn btn-wa"
        aria-label="WhatsApp Rafa Stamps"
      >
        <MessageSquare size={18} />
        <span>WhatsApp</span>
      </a>

      <Link
        to="/order"
        className="mobile-bar-btn btn-order"
        aria-label="Order Custom Stamp"
      >
        <span>Order Now</span>
        <ArrowRight size={16} />
      </Link>
    </div>
  );
}
