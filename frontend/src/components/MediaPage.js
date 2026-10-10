import React from "react";
import Media from "./Media";

function MediaPage({ videos, site }) {
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
        <Media videos={videos} fullPage />
      </main>
    </div>
  );
}

export default MediaPage;
