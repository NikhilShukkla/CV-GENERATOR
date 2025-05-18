import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import ClassicTemplate from './templates/ClassicTemplate';
import ModernTemplate from './templates/ModernTemplate';
import MinimalistTemplate from './templates/MinimalistTemplate';
import CreativeTemplate from './templates/CreativeTemplate';
import ExecutiveTemplate from './templates/ExecutiveTemplate';
import './TemplatePreviewModal.css';

function TemplatePreviewModal({ show, onHide, templateId, sampleData }) {
  const getTemplateTitle = (id) => {
    switch (id) {
      case 'classic':
        return 'Classic Professional Template';
      case 'modern':
        return 'Modern Creative Template';
      case 'minimalist':
        return 'Minimalist Template';
      case 'creative':
        return 'Creative Template';
      case 'executive':
        return 'Executive Template';
      default:
        return 'Template Preview';
    }
  };

  const renderTemplate = () => {
    switch (templateId) {
      case 'classic':
        return <ClassicTemplate data={sampleData} />;
      case 'modern':
        return <ModernTemplate data={sampleData} />;
      case 'minimalist':
        return <MinimalistTemplate data={sampleData} />;
      case 'creative':
        return <CreativeTemplate data={sampleData} />;
      case 'executive':
        return <ExecutiveTemplate data={sampleData} />;
      default:
        return <ClassicTemplate data={sampleData} />;
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{getTemplateTitle(templateId)}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="template-preview-modal-body">
        <div className="template-preview-container">
          {renderTemplate()}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default TemplatePreviewModal; 