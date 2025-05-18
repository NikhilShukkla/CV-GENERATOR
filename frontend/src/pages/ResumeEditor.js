import React, { useState, useRef, useEffect } from 'react';
import { Container, Row, Col, Button, Card, Form, Spinner } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import CVForm from '../components/CVForm';
import ClassicTemplate from '../components/templates/ClassicTemplate';
import ModernTemplate from '../components/templates/ModernTemplate';
import MinimalistTemplate from '../components/templates/MinimalistTemplate';
import CreativeTemplate from '../components/templates/CreativeTemplate';
import ExecutiveTemplate from '../components/templates/ExecutiveTemplate';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import './ResumeEditor.css';

function ResumeEditor() {
  const location = useLocation();
  const navigate = useNavigate();
  const previewRef = useRef();
  const [selectedTemplate, setSelectedTemplate] = useState('classic');
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    profilePhoto: '',
    summary: '',
    education: [],
    experiences: [],
    skills: []
  });

  const [loading, setLoading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(false);
  const [saveProgress, setSaveProgress] = useState(false);
  const [cvId, setCvId] = useState(null);
  const [zoom, setZoom] = useState(100);

  // Get template and CV ID from URL query parameter
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const templateParam = params.get('template');
    const idParam = params.get('id');
    
    if (templateParam && ['classic', 'modern', 'minimalist', 'creative', 'executive'].includes(templateParam)) {
      setSelectedTemplate(templateParam);
    }
    
    if (idParam) {
      setCvId(idParam);
      loadCV(idParam);
    }
  }, [location]);

  const loadCV = async (id) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login', { state: { from: location.pathname } });
        return;
      }

      const response = await fetch(`http://localhost:5000/api/cv/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to load CV');
      }

      const cv = await response.json();
      setSelectedTemplate(cv.template);
      setForm(cv.data);
      setCvId(cv._id);
    } catch (error) {
      console.error('Error loading CV:', error);
      toast.error('Failed to load CV. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaveProgress(true);
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please login to save your CV');
        navigate('/login', { state: { from: location.pathname } });
        return;
      }

      // Validate required fields
      if (!form.fullName || !form.email) {
        toast.error('Please fill in at least your full name and email');
        return;
      }

      const response = await fetch('http://localhost:5000/api/cv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          id: cvId,
          template: selectedTemplate,
          data: form
        })
      });

      if (!response.ok) {
        throw new Error('Failed to save CV');
      }

      const savedCV = await response.json();
      setCvId(savedCV._id);
      toast.success('CV saved successfully!');

      // Update URL with CV ID
      const searchParams = new URLSearchParams(location.search);
      searchParams.set('id', savedCV._id);
      navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
    } catch (error) {
      console.error('Error saving CV:', error);
      toast.error('Failed to save CV. Please try again.');
    } finally {
      setSaveProgress(false);
    }
  };

  const templates = [
    {
      id: 'classic',
      name: 'Classic Professional',
      description: 'Clean and traditional layout perfect for any profession',
      icon: '📄'
    },
    {
      id: 'modern',
      name: 'Modern Creative',
      description: 'Contemporary design with a creative touch',
      icon: '🎨'
    },
    {
      id: 'minimalist',
      name: 'Minimalist',
      description: 'Clean, simple design with centered header',
      icon: '✨'
    },
    {
      id: 'creative',
      name: 'Creative',
      description: 'Two-column layout with dark sidebar and animations',
      icon: '🎯'
    },
    {
      id: 'executive',
      name: 'Executive',
      description: 'Professional design with timeline-style experience',
      icon: '👔'
    }
  ];

  const handleTemplateChange = (templateId) => {
    setSelectedTemplate(templateId);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    
    // Handle education fields
    if (name.startsWith('education-')) {
      const [field, index] = name.replace('education-', '').split('-');
      setForm(prev => ({
        ...prev,
        education: prev.education.map((edu, idx) => {
          if (idx === parseInt(index)) {
            return { ...edu, [field]: value };
          }
          return edu;
        })
      }));
      return;
    }

    // Handle experiences fields
    if (name.startsWith('experiences-')) {
      const index = parseInt(name.split('-')[1]);
      setForm(prev => ({
        ...prev,
        experiences: prev.experiences.map((exp, idx) => 
          idx === index ? value : exp
        )
      }));
      return;
    }

    // Handle skills fields
    if (name.startsWith('skills-')) {
      const index = parseInt(name.split('-')[1]);
      setForm(prev => ({
        ...prev,
        skills: prev.skills.map((skill, idx) => 
          idx === index ? value : skill
        )
      }));
      return;
    }

    // Handle regular fields
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDownload = async () => {
    try {
      setDownloadProgress(true);
      const canvas = await html2canvas(previewRef.current, {
        scale: 2, // Increase quality
        useCORS: true, // Enable cross-origin image loading
        allowTaint: true,
        backgroundColor: '#ffffff'
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const width = pdf.internal.pageSize.getWidth();
      const height = (canvas.height * width) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, width, height);
      pdf.save(`${form.fullName || 'resume'}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setDownloadProgress(false);
    }
  };

  const addEducation = () => {
    setForm(prev => ({
      ...prev,
      education: [...prev.education, { degree: '', institution: '', year: '' }]
    }));
  };

  const addExperience = () => {
    setForm(prev => ({
      ...prev,
      experiences: [...prev.experiences, '']
    }));
  };

  const addSkill = () => {
    setForm(prev => ({
      ...prev,
      skills: [...prev.skills, '']
    }));
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 10, 150));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 10, 50));
  };

  const handleResetZoom = () => {
    setZoom(100);
  };

  if (loading) {
    return (
      <div className="editor-loading">
        <Spinner animation="border" variant="primary" />
        <p>Loading editor...</p>
      </div>
    );
  }

  return (
    <div className="resume-editor">
      <Container fluid>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="editor-header"
        >
          <h1>Resume Editor</h1>
          <p>Create and customize your professional resume</p>
          
          <div className="template-cards">
            <Row className="justify-content-center">
              {templates.map((template) => (
                <Col key={template.id} xs={12} sm={6} md={4} lg={3}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleTemplateChange(template.id)}
                    className={`template-card ${selectedTemplate === template.id ? 'selected' : ''}`}
                  >
                    <div className="template-icon">{template.icon}</div>
                    <h5>{template.name}</h5>
                    <p>{template.description}</p>
                    {selectedTemplate === template.id && (
                      <div className="template-selected-badge">
                        <i className="bi bi-check-circle-fill"></i>
                      </div>
                    )}
                  </motion.div>
                </Col>
              ))}
            </Row>
          </div>
        </motion.div>

        <Row className="editor-content">
          <Col lg={5}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="editor-card">
                <Card.Body>
                  <CVForm
                    form={form}
                    onChange={handleFormChange}
                    loading={loading}
                    addExperience={addExperience}
                    addSkill={addSkill}
                    addEducation={addEducation}
                  />
                </Card.Body>
              </Card>
            </motion.div>
          </Col>

          <Col lg={7}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="preview-card">
                <Card.Body>
                  <div className="preview-header">
                    <h4>Live Preview</h4>
                    <div className="preview-actions">
                      <Button
                        variant="primary"
                        onClick={handleSave}
                        disabled={saveProgress}
                        className="save-button"
                      >
                        {saveProgress ? (
                          <>
                            <Spinner
                              as="span"
                              animation="border"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                              className="me-2"
                            />
                            Saving...
                          </>
                        ) : (
                          <>
                            <i className="bi bi-save me-2"></i>
                            Save
                          </>
                        )}
                      </Button>
                      <Button
                        variant="success"
                        onClick={handleDownload}
                        disabled={downloadProgress}
                        className="download-button"
                      >
                        {downloadProgress ? (
                          <>
                            <Spinner
                              as="span"
                              animation="border"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                              className="me-2"
                            />
                            Generating PDF...
                          </>
                        ) : (
                          <>
                            <i className="bi bi-download me-2"></i>
                            Download PDF
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                  
                  <div 
                    className="preview-container"
                    ref={previewRef}
                    style={{
                      transform: `scale(${zoom / 100})`,
                      transformOrigin: 'top center',
                      transition: 'transform 0.3s ease'
                    }}
                  >
                    {selectedTemplate === 'classic' ? (
                      <ClassicTemplate data={form} />
                    ) : selectedTemplate === 'modern' ? (
                      <ModernTemplate data={form} />
                    ) : selectedTemplate === 'minimalist' ? (
                      <MinimalistTemplate data={form} />
                    ) : selectedTemplate === 'creative' ? (
                      <CreativeTemplate data={form} />
                    ) : (
                      <ExecutiveTemplate data={form} />
                    )}
                  </div>

                  <div className="preview-zoom-controls">
                    <button className="zoom-button" onClick={handleZoomOut} disabled={zoom <= 50}>
                      <i className="bi bi-zoom-out"></i>
                    </button>
                    <span className="zoom-level">{zoom}%</span>
                    <button className="zoom-button" onClick={handleZoomIn} disabled={zoom >= 150}>
                      <i className="bi bi-zoom-in"></i>
                    </button>
                    <button className="zoom-button" onClick={handleResetZoom}>
                      <i className="bi bi-arrows-angle-contract"></i>
                    </button>
                  </div>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ResumeEditor;


