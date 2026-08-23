import React from "react";

function NotFound() {
  return (
    <section className="not-found">
      <div className="container not-found-inner">
        <span className="eyebrow">404</span>
        <h1 className="not-found-title">Page not found</h1>
        <p className="not-found-text">
          The page you're looking for doesn't exist — it may have been moved, or the link may
          be out of date.
        </p>
        <a href="/" className="btn btn-primary">
          Back to homepage
        </a>
      </div>
    </section>
  );
}

export default NotFound;
