import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiArrowUpRight } from "react-icons/fi";

function About({ data, site }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const badges = data.badges || [];
  const affiliations = data.affiliations || [];

  return (
    <section id="about" className="section about-section" ref={ref}>
      <div className="container">
        <span className="eyebrow section-eyebrow">Physician · Researcher</span>
        <div className="about-layout">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="about-heading">
              <div className="about-accent" aria-hidden="true" />
              <div>
                <h2 className="section-title">{data.title}</h2>
                <div className="about-quote">{site.tagline}</div>
              </div>
            </div>
            <div className="about-badges">
              {badges.map((badge) => (
                <span key={badge} className="badge-pill">
                  {badge}
                </span>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <p className="about-text">{data.text}</p>
            <div className="about-stat-grid">
              <div className="about-stat">
                <div className="about-stat-title">30+ Publications</div>
                <div className="card-text">Peer-reviewed impact</div>
              </div>
              <div className="about-stat">
                <div className="about-stat-title">~20 Blood Banks Established</div>
                <div className="card-text">Nationwide infrastructure</div>
              </div>
            </div>
          </motion.div>
        </div>

        {affiliations.length > 0 && (
          <div className="affiliations">
            <span className="eyebrow affiliations-label">
              {data.affiliationsLabel || "Member of"}
            </span>
            <div className="affiliations-grid">
              {affiliations.map((item) => (
                <a
                  key={item.acronym}
                  className="affiliation"
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="affiliation-acronym">
                    {item.acronym}
                    <FiArrowUpRight className="affiliation-arrow" aria-hidden="true" />
                  </span>
                  <span className="affiliation-name">{item.name}</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default About;
