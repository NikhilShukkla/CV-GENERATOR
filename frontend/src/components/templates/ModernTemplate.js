import React from 'react';
import './Templates.css';

function ModernTemplate({ data }) {
  return (
    <div className="resume-template modern-template">
      <header className="modern-header">
        {data.profilePhoto && (
          <img src={data.profilePhoto} alt={data.fullName} className="modern-photo" />
        )}
        <h1>{data.fullName || 'Your Name'}</h1>
        <div className="modern-contact">
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
        </div>
      </header>

      <div className="modern-content">
        {data.education && data.education.length > 0 && (
          <section className="modern-section">
            <h2>
              <i className="bi bi-mortarboard"></i>
              Education
            </h2>
            {data.education.map((edu, index) => (
              <div key={index} className="mb-3">
                <h3>{edu.degree}</h3>
                <p className="mb-1">{edu.institution}</p>
                <small className="text-muted">{edu.year}</small>
              </div>
            ))}
          </section>
        )}

        {data.experiences && data.experiences.length > 0 && (
          <section className="modern-section">
            <h2>
              <i className="bi bi-briefcase"></i>
              Professional Experience
            </h2>
            {data.experiences.map((exp, index) => (
              <div key={index} className="mb-3">
                <p>{exp}</p>
              </div>
            ))}
          </section>
        )}

        {data.skills && data.skills.length > 0 && (
          <section className="modern-section">
            <h2>
              <i className="bi bi-stars"></i>
              Skills
            </h2>
            <div className="modern-skills">
              {data.skills.map((skill, index) => (
                <span key={index} className="modern-skill">
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default ModernTemplate;
