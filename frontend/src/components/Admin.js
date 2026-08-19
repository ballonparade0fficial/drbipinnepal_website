import React, { useState } from "react";

function Admin({ data, setContent }) {
  const [content, setLocalContent] = useState(data);
  const [drafts, setDrafts] = useState(() =>
    Object.fromEntries(
      Object.keys(data).map((section) => [section, JSON.stringify(data[section], null, 2)])
    )
  );
  const [errors, setErrors] = useState({});
  const [saveMessage, setSaveMessage] = useState("");
  const [showJson, setShowJson] = useState(false);

  const handleDraftChange = (section, rawValue) => {
    setDrafts((prev) => ({ ...prev, [section]: rawValue }));
    try {
      const parsed = JSON.parse(rawValue);
      setLocalContent((prev) => ({ ...prev, [section]: parsed }));
      setErrors((prev) => ({ ...prev, [section]: null }));
    } catch (err) {
      // Keep the last valid content untouched — never crash the editor on
      // a mid-edit keystroke, just flag the section as invalid.
      setErrors((prev) => ({ ...prev, [section]: "Invalid JSON — fix before saving." }));
    }
  };

  const hasErrors = Object.values(errors).some(Boolean);

  const handleSave = () => {
    if (hasErrors) {
      setSaveMessage("Fix the invalid JSON sections (highlighted below) before saving.");
      return;
    }
    setContent(content);
    setSaveMessage(
      "Content updated locally. To make changes permanent, copy the updated JSON below and replace frontend/src/data/content.json, then redeploy."
    );
    setShowJson(true);
  };

  return (
    <section className="admin">
      <div className="container">
        <h2 className="section-title">{content.navbar?.adminLabel || "Admin"}</h2>
        <p className="admin-note">
          This is a local content-editing aid, not a CMS — nothing here writes back to the
          repo automatically, and this route is stripped out of production builds.
        </p>
        {Object.keys(content).map((section) => (
          <div key={section} className={`admin-section ${errors[section] ? "has-error" : ""}`}>
            <h3>{section}</h3>
            <textarea
              value={drafts[section]}
              onChange={(e) => handleDraftChange(section, e.target.value)}
            ></textarea>
            {errors[section] && <p className="admin-error">{errors[section]}</p>}
          </div>
        ))}
        <button onClick={handleSave} className="btn btn-primary">
          Save Changes
        </button>
        {saveMessage && (
          <div className="admin-save-message">
            <p>{saveMessage}</p>
          </div>
        )}
        {showJson && !hasErrors && (
          <div className="admin-json-copy">
            <h3>Updated JSON (copy to frontend/src/data/content.json)</h3>
            <textarea
              readOnly
              value={JSON.stringify(content, null, 2)}
              onClick={(e) => e.target.select()}
              style={{ height: "400px", width: "100%" }}
            />
            <p style={{ marginTop: "10px", fontSize: "0.85em" }}>
              Click the textarea to select all, then copy.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Admin;
