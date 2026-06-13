import React, { useCallback, useMemo, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { FaFileAlt, FaHospital, FaClock, FaGlobe } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const isMobile = window.innerWidth < 768;

function Hero({ data, navLinks, stats }) {
  const sectionRef = useRef(null);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Disable parallax on mobile — it causes jank
  const imageY = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [0, 40]);

  const typeSequence = [];
  if (data.tagline) typeSequence.push(data.tagline, 1600);
  if (data.field) typeSequence.push(data.field, 1600);
  if (data.location) typeSequence.push(data.location, 1600);
  if (typeSequence.length === 0) typeSequence.push(data.title || "", 1600);

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const particleOptions = useMemo(() => ({
    fullScreen: false,
    fpsLimit: 30,
    particles: {
      number: { value: isMobile ? 0 : 15 },
      color: { value: ["#ffffff", "#38bdf8"] },
      opacity: { value: 0.35 },
      size: { value: { min: 1, max: 2 } },
      move: {
        enable: true,
        speed: 0.4,
        direction: "none",
        outModes: "out",
      },
    },
    interactivity: {
      events: {
        onHover: { enable: false },
        onClick: { enable: false },
      },
    },
    detectRetina: false,
  }), []);

  const researchLabel = navLinks.find((link) => link.id === "research")?.label || "";
  const contactLabel = navLinks.find((link) => link.id === "contact")?.label || "";
  const iconMap = {
    Publications: FaFileAlt,
    "Blood Banks": FaHospital,
    Years: FaClock,
    Affiliations: FaGlobe,
  };

  return (
    <section
      id="hero"
      className="hero"
      ref={(node) => {
        ref(node);
        sectionRef.current = node;
      }}
    >
      {/* Only render heavy background elements on desktop */}
      {!isMobile && (
        <>
          <Particles
            id="hero-particles"
            className="hero-particles"
            init={particlesInit}
            options={particleOptions}
          />
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-orb orb-cyan" aria-hidden="true" />
          <div className="hero-orb orb-purple" aria-hidden="true" />
        </>
      )}
      <div className="hero-dots" aria-hidden="true" />
      <div className="container hero-content">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: isMobile ? 0.3 : 0.8 }}
        >
          <p className="hero-welcome">
            Welcome — explore the work, research, and contributions of
          </p>
          <motion.h1
            className="hero-title"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: isMobile ? 0 : 0.15 },
              },
            }}
          >
            {(data.title || "").split(" ").map((word, index) => (
              <motion.span
                key={`${word}-${index}`}
                variants={{
                  hidden: { opacity: 0, y: isMobile ? 0 : 24 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { type: "spring", stiffness: 120, damping: 18 },
                  },
                }}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>
          <p className="hero-subtitle">{data.description}</p>
          <div className="hero-type">
            <motion.span
              className="hero-type-line"
              initial={{ width: 0 }}
              animate={inView ? { width: 120 } : {}}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
            <TypeAnimation
              sequence={["", 500, ...typeSequence]}
              speed={50}
              cursor
              repeat={Infinity}
            />
          </div>
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
                    {inView ? (
                      <CountUp end={stat.value} duration={2.2} />
                    ) : (
                      0
                    )}
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
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: isMobile ? 0.3 : 0.8, delay: isMobile ? 0 : 0.2 }}
          style={{ y: imageY }}
        >
          <div className="hero-ring">
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
