import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiArrowUpRight } from "react-icons/fi";
import InfoPill from "./InfoPill";

function About({ data, site }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const badges = data.badgeDetails?.length
    ? data.badgeDetails
    : (data.badges || []).map((label) => ({label}));
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
                <span className="info-interaction-hint">
                  <span className="desktop-hint">Click or hover below for details</span>
                  <span className="mobile-hint">Tap below for details</span>
                </span>
              </div>
            </div>
            <div className="about-badges">
              {badges.map((badge) => (
                <InfoPill
                  key={badge._key || badge.label}
                  info={{
                    eyebrow: badge.eyebrow || "Professional profile",
                    title: badge.title || badge.label,
                    description:
                      badge.description ||
                      `${badge.label} is part of Dr. Bipin Nepal's professional profile.`,
                    details:
                      badge.details ||
                      "Additional information about this credential can be added in the About content data.",
                  }}
                >
                  {badge.label}
                </InfoPill>
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
              <a className="about-stat" href="/publication">
                <div className="about-stat-title">30+ Publications</div>
                <div className="card-text">Peer-reviewed impact</div>
              </a>
              <div className="about-stat">
                <div className="about-stat-title">~20 Blood Banks Established</div>
                <div className="card-text">Nationwide infrastructure</div>
              </div>
            </div>
          </motion.div>
        </div>

        {affiliations.length > 0 && (
          <div id="member-of" className="affiliations">
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
