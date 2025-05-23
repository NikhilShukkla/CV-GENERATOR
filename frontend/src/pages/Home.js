import React, { useContext } from 'react';
import { Button, Row, Col, Card, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Home.css';

export default function Home() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/register');
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <div className="hero-content text-center">
            <h1 className="hero-title">Build a Stunning CV in Minutes</h1>
            <p className="hero-description">
              Choose from professional templates, customize easily, and download instantly.
            </p>
            <Button 
              onClick={handleGetStarted}
              size="lg" 
              variant="light" 
              className="hero-button"
            >
              Get Started - It's Free
            </Button>
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <Container>
          <h2 className="features-title text-center">What We Offer</h2>
          <Row className="g-4">
            <Col md={4}>
              <Card className="feature-card h-100 border-0 text-center p-4">
                <div className="feature-icon">
                  <i className="bi bi-layout-text-window-reverse"></i>
                </div>
                <Card.Body>
                  <h3 className="feature-title">Multiple Templates</h3>
                  <p className="feature-text">
                    Choose from various modern, ATS-friendly templates suited for every profession.
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="feature-card h-100 border-0 text-center p-4">
                <div className="feature-icon">
                  <i className="bi bi-eye"></i>
                </div>
                <Card.Body>
                  <h3 className="feature-title">Real-time Preview</h3>
                  <p className="feature-text">
                    Instantly see your changes reflected in a live preview of your resume.
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="feature-card h-100 border-0 text-center p-4">
                <div className="feature-icon">
                  <i className="bi bi-download"></i>
                </div>
                <Card.Body>
                  <h3 className="feature-title">Download & Share</h3>
                  <p className="feature-text">
                    Save your CV as a high-quality PDF and share it with employers or recruiters.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

