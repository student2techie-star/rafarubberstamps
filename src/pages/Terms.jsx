import React from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import { BUSINESS } from "../config";

export default function Terms() {
  return (
    <>
      <SEO
        title={`Terms & Conditions | ${BUSINESS.name}`}
        description={`Terms & conditions for ordering custom rubber stamps from ${BUSINESS.name} ${BUSINESS.city}.`}
        canonical="/terms"
      />

      <section className="page-header">
        <div className="container text-center">
          <h1 className="page-title">Terms & Conditions</h1>
          <p className="page-lead">Order verification and service guidelines.</p>
        </div>
      </section>

      <section className="legal-content-section">
        <div className="container legal-card">
          <h3>1. Order Acceptance & Price Confirmation</h3>
          <p>
            Submitting an enquiry via our online form prepares an order reference. Final pricing, production timelines, and delivery charges are confirmed manually via WhatsApp communication with Rafa Rubber Stamps.
          </p>

          <h3>2. Spelling and Design Accuracy</h3>
          <p>
            Customers are required to carefully check all text spellings, phone numbers, and design layouts prior to submitting their order. Rafa Rubber Stamps is not responsible for spelling mistakes present in customer-provided artwork or text.
          </p>

          <h3>3. Authorization & Government Verification</h3>
          <p>
            By submitting an order for company seals, authorized signatory stamps, or official designations, the customer confirms that they have full legal authority to request the stamp. Government ID verification is compulsory for official stamp production.
          </p>

          <h3>4. Delivery Across India</h3>
          <p>
            Dispatch times depend on design approval and location distance. Standard courier transit times apply for nationwide shipments.
          </p>

          <div className="mt-4 text-center">
            <Link to="/" className="btn btn-primary">
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
