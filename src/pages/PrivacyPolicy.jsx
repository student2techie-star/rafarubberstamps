import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Lock } from "lucide-react";
import SEO from "../components/SEO";
import { BUSINESS } from "../config";

export default function PrivacyPolicy() {
  return (
    <>
      <SEO
        title={`Privacy Policy | ${BUSINESS.name}`}
        description={`Privacy policy and identity verification guidelines for ${BUSINESS.name} ${BUSINESS.city}.`}
        canonical="/privacy-policy"
      />

      <section className="page-header">
        <div className="container text-center">
          <h1 className="page-title">Privacy Policy & Document Verification</h1>
          <p className="page-lead">Your document security and verification integrity policy.</p>
        </div>
      </section>

      <section className="legal-content-section">
        <div className="container legal-card">
          
          <div className="security-notice-box">
            <Lock size={22} className="text-red" />
            <div>
              <strong>Government ID Verification Security Notice</strong>
              <p>
                Government ID proof is required for custom rubber stamp orders where applicable (such as official company seals, legal signatory stamps, or authorized signatures) to prevent fraud and unauthorized duplication.
              </p>
            </div>
          </div>

          <h3>1. Collection of Information</h3>
          <p>
            When you place an order on Rafa Rubber Stamps website, we request customer contact information (Name, Mobile Number, Address, Pincode) and design artwork files (logos, text layout, signatures) along with Government ID proof for verification purposes.
          </p>

          <h3>2. Frontend Data Handling & Privacy</h3>
          <p>
            Our website is a frontend enquiry and order preparation tool. Your entered details and uploaded files are converted into a structured WhatsApp order message that you send directly to our official WhatsApp number (+91 93602 93815).
          </p>
          <ul>
            <li>We do NOT store your Government ID proof in public browser databases or local storage.</li>
            <li>We do NOT share your documents with any third-party advertisers.</li>
            <li>Uploaded documents are used solely by Rafa Rubber Stamps for order validation.</li>
          </ul>

          <h3>3. Document Upload Guidance</h3>
          <p>
            Please upload only the specific document required for order verification (e.g. Aadhaar, Driving License, or Company Registration Certificate). Do not upload unnecessary personal or financial documents.
          </p>

          <h3>4. Contact Us</h3>
          <p>
            For any privacy concerns or questions regarding document verification, please contact us at {BUSINESS.phone} or order assistance WhatsApp {BUSINESS.orderWhatsapp}.
          </p>

          <div className="mt-4 text-center">
            <Link to="/order" className="btn btn-primary">
              Return to Order Page
            </Link>
          </div>

        </div>
      </section>
    </>
  );
}
