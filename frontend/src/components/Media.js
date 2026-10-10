import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { getYouTubeId } from "../data/videos";

function Media({ videos = [], fullPage = false }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section id="media" className="section media-section" ref={ref}>
      <div className="container">
        <span className="eyebrow section-eyebrow">Watch &amp; Learn</span>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
        >
          Media
        </motion.h2>
        <p className="section-subtitle media-intro">
          Videos featuring Dr. Bipin Nepal&apos;s work and perspectives.
        </p>

        <div className="media-grid">
          {videos.map((video, index) => {
            const videoId = getYouTubeId(video.url);
            if (!videoId) return null;

            return (
              <motion.article
                className="media-card"
                key={video.url}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <div className="media-video-frame">
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title={video.title}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
                <h3 className="media-card-title">{video.title}</h3>
              </motion.article>
            );
          })}
        </div>
        {!fullPage && (
          <a href="/media" className="btn btn-primary media-more-link">
            Show More Videos
          </a>
        )}
      </div>
    </section>
  );
}

export default Media;
