import React, { useEffect, useMemo, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { FiMail, FiArrowUp } from "react-icons/fi";
import { FaGraduationCap, FaLinkedinIn } from "react-icons/fa";
import { SiResearchgate } from "react-icons/si";
import contentData from "./data/content.json";
import Loader from "./components/Loader";
import Hero from "./components/Hero";
import About from "./components/About";
import Achievements from "./components/Achievements";
import Research from "./components/Research";
import Expertise from "./components/Expertise";
import Impact from "./components/Impact";
import Contact from "./components/Contact";
import Admin from "./components/Admin";

function App() {
  const [content, setContent] = useState(contentData);
  const [scrolled, setScrolled] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const seen = sessionStorage.getItem("loaderSeen");
    if (!seen) {
      setShowLoader(true);
    }
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll(".section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("scene-in");
          }
        });
      },
      { threshold: 0.2 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
    const mix = (from, to, t) => Math.round(from + (to - from) * t);
    const colors = [
      { r: 6, g: 182, b: 212 },
      { r: 20, g: 184, b: 166 },
      { r: 124, g: 58, b: 237 },
    ];
    let color;

    if (latest < 0.5) {
      const t = clamp(latest / 0.5, 0, 1);
      color = {
        r: mix(colors[0].r, colors[1].r, t),
        g: mix(colors[0].g, colors[1].g, t),
        b: mix(colors[0].b, colors[1].b, t),
      };
    } else {
      const t = clamp((latest - 0.5) / 0.5, 0, 1);
      color = {
        r: mix(colors[1].r, colors[2].r, t),
        g: mix(colors[1].g, colors[2].g, t),
        b: mix(colors[1].b, colors[2].b, t),
      };
    }

    document.documentElement.style.setProperty(
      "--nav-accent",
      `rgb(${color.r}, ${color.g}, ${color.b})`
    );
    document.documentElement.style.setProperty(
      "--nav-accent-rgb",
      `${color.r}, ${color.g}, ${color.b}`
    );
    document.documentElement.style.setProperty(
      "--scene-accent-rgb",
      `${color.r}, ${color.g}, ${color.b}`
    );
  });

  const stats = useMemo(() => {
    const parseNumber = (text) => {
      if (!text) return 0;
      const match = text.match(/\d+/);
      return match ? Number(match[0]) : 0;
    };

    const findNumberByKeyword = (items, keyword) => {
      const lower = keyword.toLowerCase();
      for (const item of items) {
        const combined = `${item.title || ""} ${item.description || ""}`.toLowerCase();
        if (combined.includes(lower)) {
          return parseNumber(combined);
        }
      }
      return 0;
    };

    const publications = findNumberByKeyword(
      [...content.impact.items, ...content.achievements.items],
      "publication"
    );
    const bloodBanks = findNumberByKeyword(
      [...content.impact.items, ...content.achievements.items],
      "blood bank"
    );
    const years = parseNumber(content.hero.experience);
    const affiliations = content.hero.badges?.length || 0;

    return [
      { label: "Publications", value: publications, suffix: "+" },
      { label: "Blood Banks", value: bloodBanks, suffix: "+" },
      { label: "Years", value: years, suffix: "+" },
      { label: "Affiliations", value: affiliations, suffix: "+" },
    ];
  }, [content]);

  const isAdminRoute = window.location.pathname === "/admin";

  const quickLinks = content.navbar.links.filter((link) =>
    ["hero", "about", "research", "contact"].includes(link.id)
  );

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLoaderComplete = () => {
    sessionStorage.setItem("loaderSeen", "true");
    setShowLoader(false);
  };

  if (isAdminRoute) {
    return <Admin data={content} setContent={setContent} />;
  }

  return (
    <div className="app-shell">
      {showLoader && <Loader onComplete={handleLoaderComplete} />}
      <motion.nav
        className={`navbar ${scrolled ? "scrolled" : ""}`}
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
              <a key={link.id} href={`#${link.id}`} className="nav-link">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </motion.nav>
      <Hero data={content.hero} navLinks={content.navbar.links} stats={stats} />
      <About data={content.about} site={content.site} />
      <Achievements data={content.achievements} />
      <Research data={content.research} />
      <Expertise data={content.expertise} />
      <Impact data={content.impact} />
      <Contact data={content.contact} />
      <footer className="footer">
        <div className="footer-top-line" />
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
            <a className="footer-icon" href={`mailto:${content.contact.email}`}>
              <FiMail />
            </a>
            <a className="footer-icon" href="https://www.linkedin.com/in/dr-bipin-nepal-145996101/" aria-label="LinkedIn">
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
          © 2025 Dr. Bipin Nepal · All Rights Reserved
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
