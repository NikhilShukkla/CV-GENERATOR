import React from 'react';
import './Templates.css';

function MinimalistTemplate({ data }) {
  return (
    <div className="resume-template minimalist-template">
      <header className="minimalist-header">
        <h1>{data.fullName || 'Your Name'}</h1>
        <div className="minimalist-contact">
          {data.email && (
            <span>
              <i className="bi bi-envelope"></i>
              {data.email}
            </span>
          )}
          {data.phone && (
            <span>
              <i className="bi bi-telephone"></i>
              {data.phone}
            </span>
          )}
          {data.address && (
            <span>
              <i className="bi bi-geo-alt"></i>
              {data.address}
            </span>
          )}
        </div>
      </header>

      <div className="minimalist-divider"></div>

      {data.summary && (
        <section className="minimalist-section">
          <h2>Professional Summary</h2>
          <p>{data.summary}</p>
        </section>
      )}

      {data.experiences && data.experiences.length > 0 && (
        <section className="minimalist-section">
          <h2>Experience</h2>
          {data.experiences.map((exp, index) => (
            <div key={index} className="minimalist-item">
              <p>{exp}</p>
            </div>
          ))}
        </section>
      )}

      {data.education && data.education.length > 0 && (
        <section className="minimalist-section">
          <h2>Education</h2>
          {data.education.map((edu, index) => (
            <div key={index} className="minimalist-item">
              <h3>{edu.degree}</h3>
              <p>{edu.institution}</p>
              <span className="minimalist-year">{edu.year}</span>
            </div>
          ))}
        </section>
      )}

      {data.skills && data.skills.length > 0 && (
        <section className="minimalist-section">
          <h2>Skills</h2>
          <div className="minimalist-skills">
            {data.skills.map((skill, index) => (
              <span key={index} className="minimalist-skill">{skill}</span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default MinimalistTemplate; 