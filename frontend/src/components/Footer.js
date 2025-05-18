import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  const handleEmailClick = (e) => {
    e.preventDefault();
    window.location.href = 'mailto:shuklanikhil598@gmail.com';
  };

  const handlePhoneClick = (e) => {
    e.preventDefault();
    window.location.href = 'tel:+917004350721';
  };

  return (
    <footer className="custom-footer mt-auto">
      <Container>
        <Row className="py-4">
          <Col lg={4} md={6} className="mb-4 mb-lg-0">
            <div className="footer-brand mb-4">
              <i className="bi bi-file-earmark-person-fill me-2"></i>
              <span className="brand-text">CVGeneratorPro</span>
            </div>
            <p className="footer-description">
              Create professional resumes in minutes with our intuitive CV generator.
              Stand out from the crowd with beautiful templates and expert guidance.
            </p>
            <div className="social-links">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <i className="bi bi-linkedin"></i>
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <i className="bi bi-github"></i>
              </a>
            </div>
          </Col>
          <Col lg={2} md={6} className="mb-4 mb-lg-0">
            <h5 className="footer-heading">Quick Links</h5>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/templates">Templates</Link></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/editor">Resume Editor</Link></li>
            </ul>
          </Col>
          <Col lg={3} md={6} className="mb-4 mb-lg-0">
            <h5 className="footer-heading">Resources</h5>
            <ul className="footer-links">
              <li><Link to="/resources/career">Career Advice</Link></li>
              <li><Link to="/resources/blog">Career Blog</Link></li>
              <li><Link to="/resources/resume-tips">Resume Tips</Link></li>
              <li><Link to="/resources/faq">FAQ</Link></li>
            </ul>
          </Col>
          <Col lg={3} md={6}>
            <h5 className="footer-heading">Contact Us</h5>
            <ul className="footer-links">
              <li>
                <i className="bi bi-envelope me-2"></i>
                <a href="#" onClick={handleEmailClick}>shuklanikhil598@gmail.com</a>
              </li>
              <li>
                <i className="bi bi-telephone me-2"></i>
                <a href="#" onClick={handlePhoneClick}>+91 7004350721</a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
      <div className="footer-bottom">
        <Container>
          <Row className="py-3">
            <Col md={6} className="mb-2 mb-md-0">
              <p className="mb-0">&copy; {new Date().getFullYear()} CVGeneratorPro. All rights reserved.</p>
            </Col>
            <Col md={6} className="text-md-end">
              <Link to="/privacy" className="me-3">Privacy Policy</Link>
              <Link to="/terms">Terms of Service</Link>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
}
