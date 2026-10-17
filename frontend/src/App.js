import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiArrowUp } from "react-icons/fi";
import { FaGraduationCap, FaLinkedinIn } from "react-icons/fa";
import { SiResearchgate } from "react-icons/si";
import contentData from "./data/content.json";
import Hero from "./components/Hero";
import About from "./components/About";
import Achievements from "./components/Achievements";
import Research from "./components/Research";
import Expertise from "./components/Expertise";
import Impact from "./components/Impact";
import Media from "./components/Media";
import MediaPage from "./components/MediaPage";
import Publications from "./components/Publications";
import PublicationPage from "./components/PublicationPage";
import Contact from "./components/Contact";
import NotFound from "./components/NotFound";
import videos from "./data/videos";
import publications from "./data/publications";

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

function App() {
  // Fixed at build time — the sync script writes content.json before the build.
  const content = contentData;
  const [scrolled, setScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll(".section, .hero");
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("scene-in");
          }
        });
      },
      { threshold: 0.2 }
    );
    sections.forEach((section) => revealObserver.observe(section));

    const navSections = document.querySelectorAll("section[id]");
    const spyObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    navSections.forEach((section) => spyObserver.observe(section));

    return () => {
      revealObserver.disconnect();
      spyObserver.disconnect();
    };
  }, []);

  // Content is edited in Sanity Studio and synced into content.json at build
  // time, so the app itself is read-only — a single page at "/".
  const isHomeRoute = window.location.pathname === "/";
  const isMediaRoute = window.location.pathname === "/media";
  const isPublicationRoute = window.location.pathname === "/publication";

  const quickLinks = content.navbar.links.filter((link) =>
    ["hero", "about", "research", "publications", "media", "contact"].includes(link.id)
  );

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const closeMenu = () => setMenuOpen(false);

  if (isMediaRoute) {
    return <MediaPage videos={videos} site={content.site} />;
  }

  if (isPublicationRoute) {
    return <PublicationPage publications={publications} site={content.site} />;
  }

  if (!isHomeRoute) {
    return (
      <div className="app-shell">
        <NotFound />
      </div>
    );
  }

  return (
    <div className="app-shell">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <motion.nav
        className={`navbar ${scrolled || menuOpen ? "scrolled" : ""}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="container navbar-inner">
          <div className="nav-brand">
            <span className="nav-brand-dot" />
            {content.navbar.brand}
          </div>
          <div className="nav-links">
            {content.navbar.links.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`nav-link ${activeSection === link.id ? "active" : ""}`}
                aria-current={activeSection === link.id ? "true" : undefined}
              >
                {link.label}
              </a>
            ))}
          </div>
          <button
            type="button"
            className={`nav-toggle ${menuOpen ? "open" : ""}`}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
        <div className={`nav-mobile-panel ${menuOpen ? "open" : ""}`}>
          {content.navbar.links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="nav-mobile-link"
              onClick={closeMenu}
            >
              {link.label}
            </a>
          ))}
        </div>
      </motion.nav>
      <main id="main-content">
        <Hero data={content.hero} navLinks={content.navbar.links} stats={content.hero.stats} />
        <About data={content.about} site={content.site} />
        <Achievements data={content.achievements} />
        <Research data={content.research} profiles={content.contact} />
        <Publications publications={publications.slice(0, 6)} />
        <Expertise data={content.expertise} />
        <Impact data={content.impact} />
        <Media videos={videos.slice(0, 6)} />
        <Contact data={content.contact} />
      </main>
      <footer className="footer">
        <div className="container footer-columns">
          <div>
            <h3>{content.site.name}</h3>
            <p className="footer-tagline">{content.site.tagline}</p>
            <p className="footer-location">Kathmandu, Nepal</p>
          </div>
          <div className="footer-links">
            {quickLinks.map((link) => (
              <a key={link.id} href={`#${link.id}`} className="footer-link">
                {link.label}
              </a>
            ))}
          </div>
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
        </div>
        <div className="footer-bottom">
          © {new Date().getFullYear()} Dr. Bipin Nepal · All Rights Reserved
        </div>
      </footer>
      <button
        type="button"
        className={`back-to-top ${showBackToTop ? "show" : ""}`}
        onClick={handleBackToTop}
        aria-label="Back to top"
      >
        <FiArrowUp />
      </button>
    </div>
  );
}

export default App;
