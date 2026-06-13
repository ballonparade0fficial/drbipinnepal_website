import React, { useState } from "react";

function Admin({ data, setContent }) {
  const [content, setLocalContent] = useState(data);
  const [saveMessage, setSaveMessage] = useState("");
  const [showJson, setShowJson] = useState(false);

  const handleChange = (section, value) => {
    setLocalContent({ ...content, [section]: value });
  };

  const handleSave = () => {
    setContent(content);
    setSaveMessage("Content updated locally. To make changes permanent, copy the updated JSON below and replace frontend/src/data/content.json, then redeploy to Vercel.");
    setShowJson(true);
  };

  return (
    <section className="admin">
      <div className="container">
        <h2 className="section-title">{content.navbar?.adminLabel}</h2>
        {Object.keys(content).map((section) => (
          <div key={section} className="admin-section">
            <h3>{section}</h3>
            <textarea
              value={JSON.stringify(content[section], null, 2)}
              onChange={(e) => handleChange(section, JSON.parse(e.target.value))}
            ></textarea>
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
        {showJson && (
          <div className="admin-json-copy">
            <h3>Updated JSON (Copy this to frontend/src/data/content.json)</h3>
            <textarea
              readOnly
              value={JSON.stringify(content, null, 2)}
              onClick={(e) => e.target.select()}
              style={{ height: "400px", width: "100%", fontFamily: "monospace" }}
            />
            <p style={{ marginTop: "10px", fontSize: "0.9em", color: "#666" }}>
              Click the textarea to select all, then copy (Ctrl/Cmd+C)
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Admin;
