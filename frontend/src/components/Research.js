import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaGraduationCap } from "react-icons/fa";
import { SiResearchgate } from "react-icons/si";
import { ICON_MAP, resolveIcon } from "../data/iconMap";

const FALLBACK_ICONS = [ICON_MAP.flask, ICON_MAP.vial, ICON_MAP.shield, ICON_MAP.activity];

function Research({ data }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

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

        <div className="academic-profiles">
          <span className="eyebrow academic-profiles-label">Academic Profiles</span>
          <div className="profile-row">
            <a
              className="profile-link"
              href="https://scholar.google.com/citations?user=iKT_AVoAAAAJ&hl=en"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="profile-link-icon">
                <FaGraduationCap />
              </span>
              <span className="profile-link-text">
                <strong>Google Scholar</strong>
                <span>View Publications</span>
              </span>
            </a>
            <a
              className="profile-link"
              href="https://www.researchgate.net/profile/Bipin-Nepal"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="profile-link-icon">
                <SiResearchgate />
              </span>
              <span className="profile-link-text">
                <strong>ResearchGate</strong>
                <span>View Profile</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Research;
