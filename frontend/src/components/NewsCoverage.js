import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiArrowUpRight, FiExternalLink } from "react-icons/fi";

function NewsCoverage({ items = [], content = {} }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.01 });

  return (
    <section id="news" className="section news-section" ref={ref}>
      <div className="container">
        <span className="eyebrow section-eyebrow">{content.eyebrow || "In the Press"}</span>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
        >
          {content.title || "News Coverage"}
        </motion.h2>
        <p className="section-subtitle news-intro">
          {content.intro || "Selected interviews, features, and media coverage about Dr. Bipin Nepal's work."}
        </p>

        <div className="news-grid">
          {items.map((item, index) => (
            <motion.a
              key={`${item.url}-${index}`}
              className="news-card"
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 22 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: Math.min(index * 0.03, 0.3) }}
            >
              <span className="news-card-topline">
                <span className="news-card-source">{item.source}</span>
                <FiExternalLink aria-hidden="true" />
              </span>
              <span className="news-card-title">{item.title}</span>
              <span className="news-card-link">
                Read coverage <FiArrowUpRight aria-hidden="true" />
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default NewsCoverage;
