import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiMail, FiMapPin } from "react-icons/fi";
import { FaLinkedinIn } from "react-icons/fa";

function Contact({ data }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const cards = [
    {
      icon: FiMail,
      title: "Email",
      value: data.email,
      href: data.email ? `mailto:${data.email}` : null,
      external: false,
    },
    {
      icon: FaLinkedinIn,
      title: "LinkedIn",
      value: "Connect on LinkedIn",
      href: data.linkedin,
      external: true,
    },
    {
      icon: FiMapPin,
      title: "Location",
      value: data.location,
      href: data.location
        ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.location)}`
        : null,
      external: true,
    },
    // A card with no link would be a dead box — drop it instead.
  ].filter((card) => card.href);

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
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.a
                key={card.title}
                className="contact-card"
                href={card.href}
                {...(card.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.08 * index }}
              >
                <span className="contact-icon">
                  <Icon />
                </span>
                <span className="contact-title">{card.title}</span>
                <span className="contact-value">{card.value}</span>
              </motion.a>
            );
          })}
        </div>
        {data.note && <p className="contact-note">{data.note}</p>}
      </div>
    </section>
  );
}

export default Contact;
