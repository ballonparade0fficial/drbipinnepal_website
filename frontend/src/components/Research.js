import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaFlask, FaVial, FaShieldVirus, FaGraduationCap } from "react-icons/fa";
import { FiActivity } from "react-icons/fi";
import { SiResearchgate } from "react-icons/si";

const ICONS = [FaFlask, FaVial, FaShieldVirus, FiActivity];

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
            const Icon = ICONS[index % ICONS.length];
            return (
              <div key={item.title} className="research-card">
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
