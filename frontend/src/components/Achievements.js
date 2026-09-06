import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

function Achievements({ data }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section id="achievements" className="section section-alt" ref={ref}>
      <div className="container">
        <span className="eyebrow section-eyebrow">Career Highlights</span>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
        >
          {data.title}
        </motion.h2>
        <div className="achievements-list">
          {data.items.map((item, index) => (
            <div key={item.title} className="achievement-row" style={{ "--i": index }}>
              <div className="achievement-index" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div>
                <h3 className="achievement-title">{item.title}</h3>
                <p className="achievement-desc">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Achievements;
