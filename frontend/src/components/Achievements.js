import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaAward, FaMicroscope, FaHospitalAlt } from "react-icons/fa";
import { FiBookOpen } from "react-icons/fi";

const ICONS = [FaAward, FaMicroscope, FaHospitalAlt, FiBookOpen];
const ACCENTS = [
  { hex: "#06b6d4", rgb: "6,182,212" },
  { hex: "#7c3aed", rgb: "124,58,237" },
  { hex: "#3b82f6", rgb: "59,130,246" },
  { hex: "#14b8a6", rgb: "20,184,166" },
  { hex: "#6366f1", rgb: "99,102,241" },
  { hex: "#10b981", rgb: "16,185,129" },
];

function Achievements({ data }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="achievements" className="section" ref={ref}>
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
        <div className="card-grid achievements-grid">
          {data.items.map((item, index) => {
            const Icon = ICONS[index % ICONS.length];
            const accent = ACCENTS[index % ACCENTS.length];
            const number = String(index + 1).padStart(2, "0");
            return (
              <motion.div
                key={item.title}
                className="glass-card achievement-card"
                style={{ "--accent": accent.hex, "--accent-rgb": accent.rgb }}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{ y: -8 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="achievement-number" aria-hidden="true">
                  {number}
                </div>
                <div className="card-icon">
                  <Icon />
                </div>
                <h3 className="card-title">{item.title}</h3>
                <p className="card-text">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Achievements;
