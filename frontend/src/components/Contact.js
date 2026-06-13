import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiMail, FiMapPin } from "react-icons/fi";
import { FaLinkedinIn } from "react-icons/fa";

function Contact({ data }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="contact" className="section contact-section" ref={ref}>
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
        <div className="contact-grid">
          <motion.div
            className="contact-card"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="contact-icon">
              <FiMail />
            </div>
            <div className="contact-title">Email</div>
            <a className="contact-value" href={`mailto:${data.email}`}>
              {data.email}
            </a>
          </motion.div>
          <motion.div
            className="contact-card"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="contact-icon">
              <FaLinkedinIn />
            </div>
            <div className="contact-title">LinkedIn</div>
            <a className="contact-value" href="https://www.linkedin.com/in/dr-bipin-nepal-145996101/" target="_blank" rel="noopener noreferrer">
              Connect on LinkedIn
            </a>
          </motion.div>
          <motion.div
            className="contact-card"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="contact-icon">
              <FiMapPin />
            </div>
            <div className="contact-title">Location</div>
            <div className="contact-value">{data.location}</div>
          </motion.div>
        </div>
        <p className="contact-note">
          Available for Research Collaborations & Academic Partnerships
        </p>
      </div>
    </section>
  );
}

export default Contact;
