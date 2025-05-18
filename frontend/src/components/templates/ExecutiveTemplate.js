import React from 'react';
import './Templates.css';

function ExecutiveTemplate({ data }) {
  return (
    <div className="resume-template executive-template">
      <header className="executive-header">
        <div className="executive-name-title">
          <h1>{data.fullName || 'Your Name'}</h1>
          {data.title && <h2 className="executive-title">{data.title}</h2>}
        </div>
        <div className="executive-contact">
          {data.email && (
            <div className="executive-contact-item">
              <i className="bi bi-envelope"></i>
              <span>{data.email}</span>
            </div>
          )}
          {data.phone && (
            <div className="executive-contact-item">
              <i className="bi bi-telephone"></i>
              <span>{data.phone}</span>
            </div>
          )}
          {data.address && (
            <div className="executive-contact-item">
              <i className="bi bi-geo-alt"></i>
              <span>{data.address}</span>
            </div>
          )}
        </div>
      </header>

      {data.summary && (
        <section className="executive-section executive-summary">
          <h2>Executive Summary</h2>
          <p>{data.summary}</p>
        </section>
      )}

      {data.experiences && data.experiences.length > 0 && (
        <section className="executive-section">
          <h2>Professional Experience</h2>
          <div className="executive-timeline">
            {data.experiences.map((exp, index) => (
              <div key={index} className="executive-experience">
                <div className="executive-timeline-dot"></div>
                <p>{exp}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="executive-two-column">
        <div className="executive-column">
          {data.education && data.education.length > 0 && (
            <section className="executive-section">
              <h2>Education</h2>
              {data.education.map((edu, index) => (
                <div key={index} className="executive-education">
                  <h3>{edu.degree}</h3>
                  <p>{edu.institution}</p>
                  <span className="executive-year">{edu.year}</span>
                </div>
              ))}
            </section>
          )}
        </div>

        <div className="executive-column">
          {data.skills && data.skills.length > 0 && (
            <section className="executive-section">
              <h2>Core Competencies</h2>
              <div className="executive-skills">
                {data.skills.map((skill, index) => (
                  <div key={index} className="executive-skill">
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

export default ExecutiveTemplate; 