import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaFileAlt } from "react-icons/fa";

function Publications({ publications = [], fullPage = false }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.12 });

  return (
    <section id="publications" className="section publications-section" ref={ref}>
      <div className="container">
        <span className="eyebrow section-eyebrow">Research &amp; Writing</span>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
        >
          Publications
        </motion.h2>
        <p className="section-subtitle publications-intro">
          Selected research, clinical studies, and academic contributions.
        </p>

        <div className="publications-grid">
          {publications.map((publication, index) => (
            <motion.a
              key={`${publication.url}-${index}`}
              className="publication-card"
              href={publication.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 22 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: Math.min(index * 0.04, 0.3) }}
            >
              <span className="publication-icon" aria-hidden="true">
                <FaFileAlt />
              </span>
              <span className="publication-card-title">{publication.title}</span>
              <span className="publication-card-link">View publication ↗</span>
            </motion.a>
          ))}
        </div>

        {!fullPage && (
          <a href="/publication" className="btn btn-primary publication-more-link">
            Show More Publications
          </a>
        )}
      </div>
    </section>
  );
}

export default Publications;
