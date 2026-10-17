import React from "react";
import Media from "./Media";
import Footer from "./Footer";

function MediaPage({ videos, site, contact, quickLinks }) {
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
        <Media videos={videos} fullPage />
      </main>
      <Footer
        content={{ site, contact }}
        quickLinks={quickLinks}
        isSubpage
      />
    </div>
  );
}

export default MediaPage;
