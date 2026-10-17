import React from "react";
import { FiMail } from "react-icons/fi";
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

  return (
    <footer className="footer">
      <div className="container footer-columns">
        <div>
          <h3>{content.site.name}</h3>
          <p className="footer-tagline">{content.site.tagline}</p>
          <p className="footer-location">Kathmandu, Nepal</p>
        </div>
        <div className="footer-links">
          {quickLinks.map((link) => (
            <a key={link.id} href={`${homePrefix}#${link.id}`} className="footer-link">
              {link.label}
            </a>
          ))}
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
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} {content.site.name} · All Rights Reserved</span>
      </div>
    </footer>
  );
}

export default Footer;
