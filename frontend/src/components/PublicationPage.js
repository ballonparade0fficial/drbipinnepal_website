import React from "react";
import Publications from "./Publications";
import Footer from "./Footer";

function PublicationPage({ publications, site, contact, quickLinks }) {
  return (
    <div className="app-shell media-page-shell">
      <header className="media-page-header">
        <div className="container media-page-header-inner">
          <a href="/" className="nav-brand">
            <span className="nav-brand-dot" />
            {site.name}
          </a>
          <a href="/" className="media-back-link">
            <span aria-hidden="true">←</span>
            Back to homepage
          </a>
        </div>
      </header>
      <main id="main-content">
        <Publications publications={publications} fullPage />
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
