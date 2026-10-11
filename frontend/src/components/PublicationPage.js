import React from "react";
import Publications from "./Publications";

function PublicationPage({ publications, site }) {
  return (
    <div className="app-shell media-page-shell">
      <header className="media-page-header">
        <div className="container media-page-header-inner">
          <a href="/" className="nav-brand">
            <span className="nav-brand-dot" />
            {site.name}
          </a>
          <a href="/" className="media-back-link">
            Back to homepage
          </a>
        </div>
      </header>
      <main id="main-content">
        <Publications publications={publications} fullPage />
      </main>
    </div>
  );
}

export default PublicationPage;
