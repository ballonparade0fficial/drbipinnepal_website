import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FiChevronRight, FiX } from "react-icons/fi";

function InfoPill({
  children,
  info,
  className = "",
  pillClassName = "badge-pill",
  hint,
  showPreview = true,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const closeDialog = () => {
    setIsOpen(false);
    setIsHovered(false);
  };

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        setIsHovered(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.classList.add("info-dialog-open");

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("info-dialog-open");
    };
  }, [isOpen]);

  const openDialog = () => {
    setIsHovered(false);
    setIsOpen(true);
  };

  return (
    <span
      className={`info-pill-wrap ${className}`.trim()}
    >
      <button
        type="button"
        className={`${pillClassName} info-pill`.trim()}
        onClick={openDialog}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        {children}
        <FiChevronRight className="info-pill-icon" aria-hidden="true" />
      </button>
      {hint && <span className="info-pill-hint">{hint}</span>}

      {showPreview && isHovered && !isOpen && (
        <span className="info-pill-preview" role="tooltip">
          <span className="info-pill-preview-label">{info.eyebrow || "Learn more"}</span>
          <span>{info.description}</span>
          <span className="info-pill-preview-action">Click for details</span>
        </span>
      )}

      {isOpen &&
        createPortal(
          <div
            className="info-dialog-backdrop"
            role="presentation"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) closeDialog();
            }}
          >
            <div
              className="info-dialog"
              role="dialog"
              aria-modal="true"
              aria-labelledby="info-dialog-title"
            >
              <button
                type="button"
                className="info-dialog-close"
                onClick={closeDialog}
                aria-label="Close information"
              >
                <FiX aria-hidden="true" />
              </button>
              <span className="info-dialog-mark" aria-hidden="true" />
              <span className="eyebrow info-dialog-eyebrow">
                {info.eyebrow || "Professional profile"}
              </span>
              <h3 id="info-dialog-title">{info.title || children}</h3>
              <p>{info.description}</p>
              {info.details && <p>{info.details}</p>}
            </div>
          </div>,
          document.body
        )}
    </span>
  );
}

export default InfoPill;
