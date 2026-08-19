import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const groups = [
  {
    title: "Core Specialization",
    range: [0, 5],
  },
  {
    title: "Clinical Skills",
    range: [5, 10],
  },
  {
    title: "Research & Academic",
    range: [10, 15],
  },
  {
    title: "Public Health",
    range: [15, 99],
  },
];

function Expertise({ data }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });
  const tags = data.tags || [];

  return (
    <section id="expertise" className="section" ref={ref}>
      <div className="container">
        <span className="eyebrow section-eyebrow">Skill Set</span>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
        >
          {data.title}
        </motion.h2>
        <p className="section-subtitle expertise-subtitle">
          Specialized knowledge across transfusion medicine, clinical practice,
          and public health
        </p>

        <div className="expertise-grid">
          {groups.map((group, groupIndex) => {
            const items = tags.slice(group.range[0], group.range[1]);
            if (items.length === 0) return null;
            return (
              <motion.div
                key={group.title}
                className="expertise-card"
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.1 * groupIndex }}
              >
                <div className="expertise-header">
                  <span className="expertise-accent" aria-hidden="true" />
                  <span className="expertise-title">{group.title}</span>
                </div>
                <div className="expertise-tags">
                  {items.map((tag, index) => (
                    <motion.span
                      key={tag}
                      className="tag-pill"
                      initial={{ opacity: 0 }}
                      animate={inView ? { opacity: 1 } : {}}
                      transition={{ duration: 0.3, delay: 0.05 * index }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Expertise;
