import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiArrowUpRight } from "react-icons/fi";
import InfoPill from "./InfoPill";

const badgeInfo = {
  "Consultant & Department Head": {
    eyebrow: "Clinical leadership",
    title: "Consultant & Department Head",
    description:
      "Leads the Department of Transfusion Medicine and Blood Bank at Grande International Hospital in Kathmandu.",
    details:
      "This role brings together patient-focused consultation, laboratory coordination, transfusion safety, and the ongoing improvement of hospital blood-bank services.",
  },
  "Joint Secretary, AATM": {
    eyebrow: "Professional leadership",
    title: "Joint Secretary, Asian Association of Transfusion Medicine",
    description:
      "Supports regional collaboration and professional exchange in transfusion medicine through the Asian Association of Transfusion Medicine.",
    details:
      "The role connects practitioners and educators across the region to share experience, strengthen services, and advance transfusion-medicine practice.",
  },
  "AABB Education Working Group": {
    eyebrow: "International education",
    title: "AABB Global Transfusion Forum Education Working Group",
    description:
      "Participates in an international working group focused on education, learning, and competency in transfusion services.",
    details:
      "This work contributes to accessible professional learning and the exchange of practical knowledge across blood-bank and transfusion-medicine teams.",
  },
  "Grande International Hospital": {
    eyebrow: "Kathmandu · Nepal",
    title: "Grande International Hospital",
    description:
      "A major clinical setting where Dr. Bipin Nepal has led transfusion-medicine and blood-bank services.",
    details:
      "His responsibilities include clinical consultation, laboratory coordination, transfusion safety, and departmental service development.",
  },
  "Birat Medical College": {
    eyebrow: "Biratnagar · Nepal",
    title: "Birat Medical College",
    description:
      "A medical-college setting where Dr. Bipin Nepal has contributed departmental leadership in blood-transfusion services.",
    details:
      "The role combines specialist service delivery with the development of practical systems and learning opportunities for healthcare professionals.",
  },
  "TU Lions Blood Transfusion & Research Centre": {
    eyebrow: "Blood-transfusion centre",
    title: "TU Lions Blood Transfusion and Research Centre",
    description:
      "A dedicated blood-transfusion organization in Kathmandu where Dr. Bipin Nepal has provided medical leadership.",
    details:
      "The centre reflects his wider work in blood-service development, research, quality systems, and dependable transfusion support.",
  },
};

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
                <span className="info-interaction-hint">Click or hover below for details</span>
              </div>
            </div>
            <div className="about-badges">
              {badges.map((badge) => (
                badgeInfo[badge] ? (
                  <InfoPill
                    key={badge}
                    info={badgeInfo[badge]}
                  >
                    {badge}
                  </InfoPill>
                ) : (
                  <span key={badge} className="badge-pill">
                    {badge}
                  </span>
                )
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
