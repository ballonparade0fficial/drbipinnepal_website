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
import Contact from "./components/Contact";
import Admin from "./components/Admin";
import NotFound from "./components/NotFound";

const KNOWN_PATHS = ["/", "/admin"];

function App() {
  const [content, setContent] = useState(contentData);
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

  const pathname = window.location.pathname;
  const isAdminRoute = pathname === "/admin";
  const isKnownRoute = KNOWN_PATHS.includes(pathname);

  const quickLinks = content.navbar.links.filter((link) =>
    ["hero", "about", "research", "contact"].includes(link.id)
  );

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const closeMenu = () => setMenuOpen(false);

  // The admin content editor is a local editing aid, not a secured CMS —
  // it is only built into development bundles, never shipped to production.
  if (isAdminRoute) {
    if (process.env.NODE_ENV === "production") {
      window.location.replace("/");
      return null;
    }
    return <Admin data={content} setContent={setContent} />;
  }

  if (!isKnownRoute) {
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
        <Research data={content.research} />
        <Expertise data={content.expertise} />
        <Impact data={content.impact} />
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
            <a className="footer-icon" href={`mailto:${content.contact.email}`} aria-label="Email">
              <FiMail />
            </a>
            <a
              className="footer-icon"
              href="https://www.linkedin.com/in/dr-bipin-nepal-145996101/"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedinIn />
            </a>
            <a
              className="footer-icon"
              href="https://scholar.google.com/citations?user=iKT_AVoAAAAJ&hl=en"
              aria-label="Google Scholar"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGraduationCap />
            </a>
            <a
              className="footer-icon"
              href="https://www.researchgate.net/profile/Bipin-Nepal"
              aria-label="ResearchGate"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SiResearchgate />
            </a>
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
