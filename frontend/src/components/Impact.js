import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaHandsHelping, FaHeartbeat, FaGlobeAsia } from "react-icons/fa";
import { FiTrendingUp } from "react-icons/fi";

const ICONS = [FaHandsHelping, FaHeartbeat, FiTrendingUp, FaGlobeAsia];

function Impact({ data }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="impact" className="section" ref={ref}>
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
                transition={{ duration: 0.6, delay: 0.1 * index }}
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
      </div>
    </section>
  );
}

export default Impact;
