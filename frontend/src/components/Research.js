import React, { useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaFlask, FaVial, FaShieldVirus } from "react-icons/fa";
import { FiActivity } from "react-icons/fi";

const ICONS = [FaFlask, FaVial, FaShieldVirus, FiActivity];

function Research({ data }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const sectionRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    sectionRef.current.style.setProperty("--mouse-x", `${x}px`);
    sectionRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  const handleMouseLeave = () => {
    if (!sectionRef.current) return;
    sectionRef.current.style.setProperty("--mouse-x", "50%");
    sectionRef.current.style.setProperty("--mouse-y", "50%");
  };

  return (
    <section
      id="research"
      className="section research-section"
      ref={(node) => {
        ref(node);
        sectionRef.current = node;
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="section-glow" aria-hidden="true" />
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {data.title}
        </motion.h2>
        <div className="card-grid">
          {data.items.map((item, index) => {
            const Icon = ICONS[index % ICONS.length];
            return (
              <motion.div
                key={item.title}
                className="glass-card"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 18,
                  delay: 0.08 * index,
                }}
                whileHover={{ y: -8 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="card-icon">
                  <Icon />
                </div>
                <h3 className="card-title">{item.title}</h3>
                <p className="card-text">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
        <div
          className="academic-profiles"
          style={{ marginTop: "32px", textAlign: "center" }}
        >
          <p
            className="section-subtitle"
            style={{
              textTransform: "uppercase",
              letterSpacing: "2px",
              fontSize: "0.9rem",
              textDecoration: "underline",
              textDecorationThickness: "2px",
              textUnderlineOffset: "6px",
              display: "block",
              width: "100%",
              textAlign: "center",
              maxWidth: "640px",
              margin: "0 auto",
            }}
          >
            Academic Profiles
          </p>
          <div
            className="card-grid"
            style={{ marginTop: "18px", justifyItems: "center" }}
          >
            <a
              className="glass-card"
              href="https://scholar.google.com/citations?user=iKT_AVoAAAAJ&hl=en"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", width: "100%", maxWidth: "360px" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <span style={{ fontSize: "1.6rem" }} aria-hidden="true">
                  🎓
                </span>
                <div style={{ textAlign: "left" }}>
                  <div className="card-title">Google Scholar</div>
                  <div className="card-text">View Publications</div>
                </div>
              </div>
            </a>
            <a
              className="glass-card"
              href="https://www.researchgate.net/profile/Bipin-Nepal"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", width: "100%", maxWidth: "360px" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <span style={{ fontSize: "1.6rem" }} aria-hidden="true">
                  🔬
                </span>
                <div style={{ textAlign: "left" }}>
                  <div className="card-title">ResearchGate</div>
                  <div className="card-text">View Profile</div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Research;
