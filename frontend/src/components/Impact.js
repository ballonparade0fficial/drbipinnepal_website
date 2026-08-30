import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaHandsHelping, FaHeartbeat, FaGlobeAsia } from "react-icons/fa";
import { FiTrendingUp } from "react-icons/fi";
import CountUp from "react-countup";

const ICONS = [FaHandsHelping, FaHeartbeat, FiTrendingUp, FaGlobeAsia];

function Impact({ data }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section id="impact" className="section section-alt" ref={ref}>
      <div className="container">
        <span className="eyebrow section-eyebrow">By the Numbers</span>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
        >
          {data.title}
        </motion.h2>

        <div className="impact-stats">
          {(data.stats || []).map((stat) => (
            <div key={stat.label}>
              <div className="impact-stat-value">
                {inView ? (
                  <CountUp end={stat.value} duration={1.6} separator="," />
                ) : (
                  0
                )}
                {stat.suffix}
              </div>
              <div className="impact-stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="impact-list">
          {data.items.map((item, index) => {
            const Icon = ICONS[index % ICONS.length];
            return (
              <div key={item.title} className="impact-row">
                <div className="impact-row-title">
                  <Icon className="impact-row-icon" aria-hidden="true" />
                  {item.title}
                </div>
                <p className="impact-row-desc">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Impact;
