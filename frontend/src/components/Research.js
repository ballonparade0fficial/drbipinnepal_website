import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaGraduationCap } from "react-icons/fa";
import { SiResearchgate } from "react-icons/si";
import { ICON_MAP, resolveIcon } from "../data/iconMap";

const FALLBACK_ICONS = [ICON_MAP.flask, ICON_MAP.vial, ICON_MAP.shield, ICON_MAP.activity];

function Research({ data, profiles = {} }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const profileLinks = [
    {
      href: profiles.googleScholar,
      icon: FaGraduationCap,
      title: "Google Scholar",
      subtitle: "View Publications",
    },
    {
      href: profiles.researchGate,
      icon: SiResearchgate,
      title: "ResearchGate",
      subtitle: "View Profile",
    },
  ].filter((link) => link.href);

  return (
    <section id="research" className="section" ref={ref}>
      <div className="container">
        <span className="eyebrow section-eyebrow">Focus Areas</span>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
        >
          {data.title}
        </motion.h2>
        <div className="research-grid">
          {data.items.map((item, index) => {
            const Icon = resolveIcon(item, FALLBACK_ICONS, index);
            return (
              <div key={item.title} className="research-card" style={{ "--i": index }}>
                <div className="card-icon">
                  <Icon />
                </div>
                <h3 className="card-title">{item.title}</h3>
                <p className="card-text">{item.description}</p>
              </div>
            );
          })}
        </div>

        {profileLinks.length > 0 && (
          <div className="academic-profiles">
            <span className="eyebrow academic-profiles-label">Academic Profiles</span>
            <div className="profile-row">
              {profileLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.title}
                    className="profile-link"
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="profile-link-icon">
                      <Icon />
                    </span>
                    <span className="profile-link-text">
                      <strong>{link.title}</strong>
                      <span>{link.subtitle}</span>
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Research;
