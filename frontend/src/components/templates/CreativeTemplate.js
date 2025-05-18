import React from 'react';
import './Templates.css';

function CreativeTemplate({ data }) {
  return (
    <div className="resume-template creative-template">
      <div className="creative-sidebar">
        {data.profilePhoto && (
          <div className="creative-photo-container">
            <img src={data.profilePhoto} alt={data.fullName} className="creative-photo" />
          </div>
        )}
        
        <div className="creative-contact">
          <h2>Contact</h2>
          {data.email && (
            <div className="creative-contact-item">
              <i className="bi bi-envelope-fill"></i>
              <span>{data.email}</span>
            </div>
          )}
          {data.phone && (
            <div className="creative-contact-item">
              <i className="bi bi-telephone-fill"></i>
              <span>{data.phone}</span>
            </div>
          )}
          {data.address && (
            <div className="creative-contact-item">
              <i className="bi bi-geo-alt-fill"></i>
              <span>{data.address}</span>
            </div>
          )}
        </div>

        {data.skills && data.skills.length > 0 && (
          <div className="creative-skills">
            <h2>Skills</h2>
            <div className="creative-skills-list">
              {data.skills.map((skill, index) => (
                <div key={index} className="creative-skill-item">
                  <span className="creative-skill-name">{skill}</span>
                  <div className="creative-skill-bar">
                    <div className="creative-skill-progress"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="creative-main">
        <header className="creative-header">
          <h1>{data.fullName || 'Your Name'}</h1>
          {data.summary && (
            <p className="creative-summary">{data.summary}</p>
          )}
        </header>

        {data.experiences && data.experiences.length > 0 && (
          <section className="creative-section">
            <h2>
              <i className="bi bi-briefcase-fill"></i>
              Experience
            </h2>
            {data.experiences.map((exp, index) => (
              <div key={index} className="creative-experience">
                <p>{exp}</p>
              </div>
            ))}
          </section>
        )}

        {data.education && data.education.length > 0 && (
          <section className="creative-section">
            <h2>
              <i className="bi bi-mortarboard-fill"></i>
              Education
            </h2>
            {data.education.map((edu, index) => (
              <div key={index} className="creative-education">
                <h3>{edu.degree}</h3>
                <p>{edu.institution}</p>
                <span className="creative-year">{edu.year}</span>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}

export default CreativeTemplate; 