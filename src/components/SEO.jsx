import React from "react";
import { Helmet } from "react-helmet-async";
import { BUSINESS } from "../config";

export default function SEO({
  title = `${BUSINESS.name} ${BUSINESS.city} | Custom Rubber Stamp Maker`,
  description = `${BUSINESS.name} ${BUSINESS.city} offers custom rubber stamps, logo stamps, craft stamps and water-based stamps with delivery across India. Order your customized stamp today.`,
  canonical,
  ogImage = `${BUSINESS.domain}/images/hero.jpg`,
  ogType = "website",
  schemaType = "LocalBusiness"
}) {
  const pageUrl = canonical ? `${BUSINESS.domain}${canonical}` : BUSINESS.domain;

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": schemaType,
    "name": BUSINESS.name,
    "description": description,
    "url": BUSINESS.domain,
    "telephone": BUSINESS.phone,
    "priceRange": "₹₹",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": BUSINESS.city,
      "addressRegion": BUSINESS.state,
      "addressCountry": BUSINESS.country
    },
    "areaServed": "India",
    "image": ogImage,
    "openingHours": "Mo-Sa 09:00-20:00"
  };

  return (
    <Helmet>
      {/* Basic HTML Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={pageUrl} />

      {/* OpenGraph Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:type" content={ogType} />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Structured Data JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(localBusinessSchema)}
      </script>
    </Helmet>
  );
}
