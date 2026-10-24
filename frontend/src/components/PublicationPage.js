import React from "react";
import Publications from "./Publications";
import Footer from "./Footer";

function PublicationPage({ publications, publicationContent, site, contact, quickLinks }) {
  return (
    <div className="app-shell media-page-shell">
      <header className="media-page-header">
        <div className="container media-page-header-inner">
          <a href="/" className="nav-brand">
            <img
              className="brand-logo"
              src={`${process.env.PUBLIC_URL}/favicon.svg`}
              alt=""
              aria-hidden="true"
            />
            {site.name}
          </a>
          <a href="/" className="media-back-link">
            <span aria-hidden="true">←</span>
            Back to homepage
          </a>
        </div>
      </header>
      <main id="main-content">
        <Publications publications={publications} content={publicationContent} fullPage />
      </main>
      <Footer
        content={{ site, contact }}
        quickLinks={quickLinks}
        isSubpage
      />
    </div>
  );
}

export default PublicationPage;
