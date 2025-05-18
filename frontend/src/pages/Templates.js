import React, { useState } from 'react';
import ClassicTemplate from '../components/templates/ClassicTemplate';
import ModernTemplate from '../components/templates/ModernTemplate';
import MinimalistTemplate from '../components/templates/MinimalistTemplate';
import CreativeTemplate from '../components/templates/CreativeTemplate';
import ExecutiveTemplate from '../components/templates/ExecutiveTemplate';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import TemplatePreviewModal from '../components/TemplatePreviewModal';
import './Templates.css';

const sampleData = {
  fullName: "John Doe",
  email: "john@example.com",
  phone: "123-456-7890",
  education: [
    { degree: "Bachelor of Computer Science", institution: "XYZ University", year: "2023" }
  ],
  experiences: [
    "Senior Software Engineer at Tech Corp",
    "Full Stack Developer at Web Solutions"
  ],
  skills: [
    "JavaScript", "React", "Node.js", "Python"
  ]
};

const templates = [
  {
    id: 'classic',
    name: 'Classic Template',
    component: ClassicTemplate,
    icon: 'bi bi-file-text'
  },
  {
    id: 'modern',
    name: 'Modern Template',
    component: ModernTemplate,
    icon: 'bi bi-file-earmark-text'
  },
  {
    id: 'minimalist',
    name: 'Minimalist Template',
    component: MinimalistTemplate,
    icon: 'bi bi-file-earmark'
  },
  {
    id: 'creative',
    name: 'Creative Template',
    component: CreativeTemplate,
    icon: 'bi bi-file-richtext'
  },
  {
    id: 'executive',
    name: 'Executive Template',
    component: ExecutiveTemplate,
    icon: 'bi bi-file-person'
  }
];

export default function Templates() {
  const [showPreview, setShowPreview] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const handlePreview = (templateId) => {
    setSelectedTemplate(templateId);
    setShowPreview(true);
  };

  return (
    <div className="templates-container">
      <Container>
        <h1 className="templates-title">Choose Your Perfect Template</h1>
        <Row>
          {templates.map((template) => (
            <Col lg={6} key={template.id}>
              <div className="template-card">
                <h3 className="template-title">
                  <i className={template.icon}></i>
                  {template.name}
                </h3>
                <div className="template-preview">
                  <template.component data={sampleData} />
                </div>
                <div className="template-actions">
                  <Link 
                    to={`/editor?template=${template.id}`} 
                    className="preview-button primary"
                  >
                    <i className="bi bi-pencil-square"></i>
                    Use This Template
                  </Link>
                  <button 
                    type="button"
                    className="preview-button secondary"
                    onClick={() => handlePreview(template.id)}
                  >
                    <i className="bi bi-eye"></i>
                    Preview Template
                  </button>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>

      <TemplatePreviewModal
        show={showPreview}
        onHide={() => setShowPreview(false)}
        templateId={selectedTemplate}
        sampleData={sampleData}
      />
    </div>
  );
}
