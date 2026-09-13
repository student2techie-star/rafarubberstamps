import React from "react";
import { Link } from "react-router-dom";
import { Stamp, ArrowLeft } from "lucide-react";
import SEO from "../components/SEO";

export default function NotFound() {
  return (
    <>
      <SEO title="404 - Page Not Found | Rafa Rubber Stamps Tenkasi" />
      <section className="not-found-section">
        <div className="container text-center">
          <div className="not-found-stamp-badge">
            <Stamp size={64} className="text-red" />
          </div>
          <h1 className="error-code">404</h1>
          <h2 className="error-title">Oops! This page doesn't exist.</h2>
          <p className="error-desc">
            The page you are looking for might have been moved or removed.
          </p>
          <div className="mt-4">
            <Link to="/" className="btn btn-primary btn-lg">
              <ArrowLeft size={18} />
              <span>Back To Home</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
