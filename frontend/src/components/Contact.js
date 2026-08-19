import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiMail, FiMapPin } from "react-icons/fi";
import { FaLinkedinIn } from "react-icons/fa";

function Contact({ data }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    data.location
  )}`;

  return (
    <section id="contact" className="section" ref={ref}>
      <div className="container">
        <span className="eyebrow section-eyebrow">Get in Touch</span>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
        >
          {data.title}
        </motion.h2>
        <div className="contact-grid">
          <motion.div
            className="contact-card"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
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
            transition={{ duration: 0.5, delay: 0.08 }}
          >
            <div className="contact-icon">
              <FaLinkedinIn />
            </div>
            <div className="contact-title">LinkedIn</div>
            <a
              className="contact-value"
              href="https://www.linkedin.com/in/dr-bipin-nepal-145996101/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Connect on LinkedIn
            </a>
          </motion.div>
          <motion.div
            className="contact-card"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.16 }}
          >
            <div className="contact-icon">
              <FiMapPin />
            </div>
            <div className="contact-title">Location</div>
            <a className="contact-value" href={mapsHref} target="_blank" rel="noopener noreferrer">
              {data.location}
            </a>
          </motion.div>
        </div>
        <p className="contact-note">
          Available for Research Collaborations &amp; Academic Partnerships
        </p>
      </div>
    </section>
  );
}

export default Contact;
