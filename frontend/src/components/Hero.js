import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { FaFileAlt, FaHospital, FaClock, FaGlobe } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < breakpoint
  );

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const handleChange = (event) => setIsMobile(event.matches);
    handleChange(mql);
    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, [breakpoint]);

  return isMobile;
}

function Hero({ data, navLinks, stats }) {
  const isMobile = useIsMobile();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const researchLabel = navLinks.find((link) => link.id === "research")?.label || "";
  const contactLabel = navLinks.find((link) => link.id === "contact")?.label || "";
  const iconMap = {
    Publications: FaFileAlt,
    "Blood Banks": FaHospital,
    Years: FaClock,
    Affiliations: FaGlobe,
  };

  return (
    <section id="hero" className="hero" ref={ref}>
      <div className="hero-pattern" aria-hidden="true" />
      <div className="container hero-content">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: isMobile ? 0.3 : 0.7 }}
        >
          <span className="eyebrow hero-eyebrow">
            {data.field || "Transfusion Medicine"} · {data.location}
          </span>
          <motion.h1
            className="hero-title"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: isMobile ? 0 : 0.1 },
              },
            }}
          >
            {(data.title || "").split(" ").map((word, index) => (
              <motion.span
                key={`${word}-${index}`}
                variants={{
                  hidden: { opacity: 0, y: isMobile ? 0 : 18 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { type: "spring", stiffness: 130, damping: 20 },
                  },
                }}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>
          <p className="hero-subtitle">{data.description}</p>
          <p className="hero-byline">
            <span className="hero-byline-line" aria-hidden="true" />
            {data.tagline}
          </p>
          <div className="hero-cta">
            <a href="#research" className="btn btn-primary">
              {researchLabel}
            </a>
            <a href="#contact" className="btn btn-outline">
              {contactLabel}
            </a>
          </div>
          <div className="hero-stats">
            {stats.map((stat) => {
              const Icon = iconMap[stat.label] || FaFileAlt;
              return (
                <div key={stat.label} className="stat-card">
                  <div className="stat-icon">
                    <Icon />
                  </div>
                  <div className="stat-value">
                    {inView ? <CountUp end={stat.value} duration={1.8} /> : 0}
                    {stat.suffix}
                  </div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          className="hero-image-wrap"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: isMobile ? 0.3 : 0.7, delay: isMobile ? 0 : 0.15 }}
        >
          <div className="hero-frame">
            <img
              src={data.image || "/images/placeholder.jpg"}
              alt={data.title}
              className="hero-profile"
            />
          </div>
        </motion.div>
      </div>

      <div className="scroll-indicator" aria-hidden="true">
        <FiChevronDown />
      </div>
    </section>
  );
}

export default Hero;
