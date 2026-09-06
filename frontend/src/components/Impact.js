import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { ICON_MAP, resolveIcon } from "../data/iconMap";

const FALLBACK_ICONS = [
  ICON_MAP["hands-helping"],
  ICON_MAP.heartbeat,
  ICON_MAP["trending-up"],
  ICON_MAP.globe,
];

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
            const Icon = resolveIcon(item, FALLBACK_ICONS, index);
            return (
              <div key={item.title} className="impact-row" style={{ "--i": index }}>
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
