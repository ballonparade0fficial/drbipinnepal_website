import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import InfoPill from "./InfoPill";

function Expertise({ data }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });
  const groups = data.groups || [];

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
        {data.subtitle && (
          <p className="section-subtitle expertise-subtitle">{data.subtitle}</p>
        )}

        <div className="expertise-grid">
          {groups.map((group, groupIndex) => {
            const items = group.tags || [];
            if (items.length === 0) return null;
            return (
              <motion.div
                key={group.title}
                className="expertise-group"
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.1 * groupIndex }}
              >
                <div className="expertise-header">
                  <span className="expertise-accent" aria-hidden="true" />
                  <div>
                    <span className="expertise-title">{group.title}</span>
                    <span className="info-interaction-hint">
                      <span className="desktop-hint">Click or hover below for details</span>
                      <span className="mobile-hint">Tap below for details</span>
                    </span>
                  </div>
                </div>
                <div className="expertise-tags">
                  {items.map((tag, index) => (
                    <motion.div
                      key={tag}
                      initial={{ opacity: 0 }}
                      animate={inView ? { opacity: 1 } : {}}
                      transition={{ duration: 0.3, delay: 0.05 * index }}
                    >
                      <InfoPill
                        pillClassName="tag-pill"
                        info={{
                          eyebrow: group.title,
                          title: tag,
                          description: `${tag} is part of Dr. Bipin Nepal's ${group.title.toLowerCase()} expertise in Transfusion Medicine.`,
                          details:
                            "Select this area to learn more about how it connects to his clinical practice, blood-service leadership, research, and professional education.",
                        }}
                      >
                        {tag}
                      </InfoPill>
                    </motion.div>
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
