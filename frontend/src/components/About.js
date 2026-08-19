import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

function About({ data, site }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const badges = [
    "MBBS • Dow University",
    "MS Transfusion Medicine",
    "11+ Years Experience",
  ];
  const affiliations = ["ISBT", "AATM", "EHA", "ISTH"];

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
        <div className="about-affiliations">
          {affiliations.map((label) => (
            <span key={label} className="affiliation-pill">
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;
