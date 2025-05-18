import React from 'react';
import { Form, Row, Col, Button, Card } from 'react-bootstrap';
import toast from 'react-hot-toast';
import './CVForm.css';

function CVForm({
  form,
  onChange,
  loading,
  addExperience,
  addSkill,
  addEducation,
}) {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5000000) { // 5MB limit
        toast.error('Image size should be less than 5MB');
        return;
      }

      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file');
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        onChange({
          target: {
            name: 'profilePhoto',
            value: reader.result
          }
        });
        toast.success('Photo uploaded successfully!');
      };

      reader.onerror = () => {
        toast.error('Error reading file');
      };

      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    onChange({
      target: {
        name: 'profilePhoto',
        value: ''
      }
    });
    toast.success('Photo removed');
  };

  return (
    <Card className="cv-form-card p-4">
      <Card.Body>
        <Form>
          {/* Profile Photo Upload */}
          <div className="form-section text-center">
            <h5 className="section-title justify-content-center">
              <i className="bi bi-person-circle"></i>
              Profile Photo
            </h5>
            <div className="profile-photo-container">
              {form.profilePhoto ? (
                <>
                  <img
                    src={form.profilePhoto}
                    alt="Profile Preview"
                    className="profile-photo"
                  />
                  <button
                    type="button"
                    className="remove-photo-btn"
                    onClick={removePhoto}
                    title="Remove photo"
                  >
                    <i className="bi bi-x-circle-fill"></i>
                  </button>
                </>
              ) : (
                <div className="photo-placeholder">
                  <i className="bi bi-person-fill"></i>
                </div>
              )}
            </div>
            <label className="photo-upload-label">
              <i className="bi bi-upload me-2"></i>
              Choose Photo
              <input
                type="file"
                className="photo-upload-input"
                onChange={handleFileChange}
                accept="image/*"
              />
            </label>
          </div>

          {/* Personal Information */}
          <div className="form-section">
            <h5 className="section-title">
              <i className="bi bi-person"></i>
              Personal Information
            </h5>
            <Row className="g-3">
              <Col md={6}>
                <Form.Group className="form-floating-group">
                  <Form.Control
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={onChange}
                    placeholder="Full Name"
                    required
                  />
                  <Form.Label>Full Name</Form.Label>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="form-floating-group">
                  <Form.Control
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={onChange}
                    placeholder="Email"
                    required
                  />
                  <Form.Label>Email</Form.Label>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="form-floating-group">
                  <Form.Control
                    type="text"
                    name="phone"
                    value={form.phone}
                    onChange={onChange}
                    placeholder="Phone"
                    required
                  />
                  <Form.Label>Phone</Form.Label>
                </Form.Group>
              </Col>
            </Row>
          </div>

          {/* Education */}
          <div className="form-section">
            <h5 className="section-title">
              <i className="bi bi-mortarboard"></i>
              Education
            </h5>
            {(form.education || []).map((edu, idx) => (
              <Row key={idx} className="g-3 mb-3">
                <Col md={4}>
                  <Form.Control
                    type="text"
                    name={`education-degree-${idx}`}
                    value={edu.degree}
                    onChange={onChange}
                    placeholder="Degree"
                    required
                  />
                </Col>
                <Col md={4}>
                  <Form.Control
                    type="text"
                    name={`education-institution-${idx}`}
                    value={edu.institution}
                    onChange={onChange}
                    placeholder="Institution"
                    required
                  />
                </Col>
                <Col md={4}>
                  <Form.Control
                    type="text"
                    name={`education-year-${idx}`}
                    value={edu.year}
                    onChange={onChange}
                    placeholder="Year"
                    required
                  />
                </Col>
              </Row>
            ))}
            <Button variant="outline-primary" className="add-button" onClick={addEducation}>
              <i className="bi bi-plus-lg me-2"></i>Add Education
            </Button>
          </div>

          {/* Experience */}
          <div className="form-section">
            <h5 className="section-title">
              <i className="bi bi-briefcase"></i>
              Professional Experience
            </h5>
            {(form.experiences || []).map((exp, idx) => (
              <Row key={idx} className="mb-3">
                <Col>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name={`experiences-${idx}`}
                    value={exp}
                    onChange={onChange}
                    placeholder="Describe your role and responsibilities"
                    required
                  />
                </Col>
              </Row>
            ))}
            <Button variant="outline-primary" className="add-button" onClick={addExperience}>
              <i className="bi bi-plus-lg me-2"></i>Add Experience
            </Button>
          </div>

          {/* Skills */}
          <div className="form-section">
            <h5 className="section-title">
              <i className="bi bi-stars"></i>
              Skills
            </h5>
            {(form.skills || []).map((skill, idx) => (
              <Row key={idx} className="mb-3">
                <Col>
                  <Form.Control
                    type="text"
                    name={`skills-${idx}`}
                    value={skill}
                    onChange={onChange}
                    placeholder="Enter a skill"
                    required
                  />
                </Col>
              </Row>
            ))}
            <Button variant="outline-primary" className="add-button" onClick={addSkill}>
              <i className="bi bi-plus-lg me-2"></i>Add Skill
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default CVForm;









