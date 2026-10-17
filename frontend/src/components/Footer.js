import React from "react";
import { FiArrowRight, FiMail } from "react-icons/fi";
import { FaGraduationCap, FaLinkedinIn } from "react-icons/fa";
import { SiResearchgate } from "react-icons/si";

function FooterIconOrbit({ label, className = "", children }) {
  const letters = [...label];
  const spread = letters.length > 9 ? 5.8 : letters.length > 6 ? 6.8 : 8;
  const angleStep = letters.length > 9 ? 3.5 : letters.length > 6 ? 4.5 : 7;

  return (
    <span className={`footer-icon-orbit ${className}`.trim()}>
      <span className="footer-icon-arc-label" aria-hidden="true">
        {letters.map((letter, index) => {
          const offset = index - (letters.length - 1) / 2;
          const distance = Math.abs(offset);
          return (
            <span
              key={`${letter}-${index}`}
              style={{
                left: `calc(50% + ${offset * spread}px)`,
                top: `${distance * 1.35}px`,
                transform: `translateX(-50%) rotate(${offset * angleStep}deg)`,
              }}
            >
              {letter}
            </span>
          );
        })}
      </span>
      {children}
    </span>
  );
}

function Footer({ content, quickLinks = [], isSubpage = false }) {
  const homePrefix = isSubpage ? "/" : "";
  const linkDescriptions = {
    hero: "Navigate to home page",
    about: "Learn about Dr. Bipin Nepal",
    achievements: "View professional milestones",
    research: "Explore research areas",
    publications: "Read published work",
    expertise: "View clinical expertise",
    impact: "See professional impact",
    media: "Watch featured videos",
    contact: "Get in touch",
  };

  return (
    <footer className="footer">
      <div className="container footer-columns">
        <div>
          <h3 className="footer-brand">
            <img
              className="brand-logo footer-brand-logo"
              src={`${process.env.PUBLIC_URL}/favicon.svg`}
              alt=""
              aria-hidden="true"
            />
            <span>{content.site.name}</span>
          </h3>
          <p className="footer-tagline">{content.site.tagline}</p>
          <p className="footer-location">Kathmandu, Nepal</p>
        </div>
        <div className="footer-social-column">
          <div className="footer-icons">
          <FooterIconOrbit label="Gmail" className="footer-icon-orbit-email">
            <a className="footer-icon" href={`mailto:${content.contact.email}`} aria-label="Gmail">
              <FiMail />
            </a>
          </FooterIconOrbit>
          {content.contact.linkedin && (
            <FooterIconOrbit label="LinkedIn" className="footer-icon-orbit-linkedin">
              <a
                className="footer-icon"
                href={content.contact.linkedin}
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedinIn />
              </a>
            </FooterIconOrbit>
          )}
          {content.contact.googleScholar && (
            <FooterIconOrbit label="Scholar" className="footer-icon-orbit-scholar">
              <a
                className="footer-icon"
                href={content.contact.googleScholar}
                aria-label="Google Scholar"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGraduationCap />
              </a>
            </FooterIconOrbit>
          )}
          {content.contact.researchGate && (
            <FooterIconOrbit label="ResearchGate" className="footer-icon-orbit-researchgate">
              <a
                className="footer-icon"
                href={content.contact.researchGate}
                aria-label="ResearchGate"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SiResearchgate />
              </a>
            </FooterIconOrbit>
          )}
          </div>
          {isSubpage && (
            <a href="/" className="footer-home-link footer-home-link-column">
              Back to homepage
            </a>
          )}
        </div>
      </div>
      <nav className="container footer-links footer-navigation" aria-label="Footer navigation">
        {quickLinks.map((link) => (
          <a key={link.id} href={`${homePrefix}#${link.id}`} className="footer-link">
            <span className="footer-link-bar" aria-hidden="true" />
            <span className="footer-link-copy">
              <span className="footer-link-label">{link.label}</span>
              <span className="footer-link-description">
                {linkDescriptions[link.id] || `Explore ${link.label.toLowerCase()}`}
              </span>
            </span>
            <FiArrowRight className="footer-link-arrow" aria-hidden="true" />
          </a>
        ))}
      </nav>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} {content.site.name} · All Rights Reserved</span>
      </div>
    </footer>
  );
}

export default Footer;
