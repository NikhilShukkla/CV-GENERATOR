import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Dashboard.css';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalCVs: 0,
    downloads: 0,
    templates: 3
  });
  const [recentCVs, setRecentCVs] = useState([]);

  // Fetch dashboard data
  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch CV statistics
      const statsResponse = await fetch('http://localhost:5000/api/cv/stats');
      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        setStats(statsData);
      }

      // Fetch recent CVs
      const cvsResponse = await fetch('http://localhost:5000/api/cv/recent');
      if (cvsResponse.ok) {
        const cvsData = await cvsResponse.json();
        setRecentCVs(cvsData);
      }
    } catch (err) {
      console.error('[Dashboard] Error:', err.message);
      // Set default data if fetch fails
      setStats({
        totalCVs: 0,
        downloads: 0,
        templates: 3
      });
      setRecentCVs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="dashboard-container d-flex justify-content-center align-items-center">
        <Spinner animation="border" variant="primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <Container>
        <div className="dashboard-header">
          <h1 className="dashboard-title">Welcome to CV Generator</h1>
          <p className="dashboard-subtitle">
            Manage your CVs and create new ones using our professional templates
          </p>
        </div>

        <div className="stats-container">
          <Row>
            <Col md={4}>
              <Card className="stat-card">
                <Card.Body>
                  <div className="stat-icon blue">
                    <i className="bi bi-file-text"></i>
                  </div>
                  <div className="stat-value">{stats.totalCVs}</div>
                  <div className="stat-label">Total CVs Created</div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="stat-card">
                <Card.Body>
                  <div className="stat-icon green">
                    <i className="bi bi-download"></i>
                  </div>
                  <div className="stat-value">{stats.downloads}</div>
                  <div className="stat-label">Total Downloads</div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="stat-card">
                <Card.Body>
                  <div className="stat-icon purple">
                    <i className="bi bi-grid-3x3-gap"></i>
                  </div>
                  <div className="stat-value">{stats.templates}</div>
                  <div className="stat-label">Available Templates</div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>

        <Row>
          <Col lg={8}>
            <div className="recent-cvs">
              <div className="recent-cvs-header">
                <h2 className="recent-cvs-title">Recent CVs</h2>
                <Link to="/my-cvs">
                  <Button className="view-all-button">
                    View All
                    <i className="bi bi-arrow-right ms-2"></i>
                  </Button>
                </Link>
              </div>
              {recentCVs.length === 0 ? (
                <div className="text-center py-4">
                  <i className="bi bi-file-earmark-text display-4 text-muted"></i>
                  <p className="mt-3 text-muted">No CVs created yet. Start by creating your first CV!</p>
                </div>
              ) : (
                <ul className="cv-list">
                  {recentCVs.map((cv) => (
                    <li key={cv.id} className="cv-item">
                      <div className="cv-icon">
                        <i className="bi bi-file-earmark-text"></i>
                      </div>
                      <div className="cv-info">
                        <h3 className="cv-name">{cv.name}</h3>
                        <p className="cv-date">
                          {cv.template} • Created on {formatDate(cv.date)}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Col>
          <Col lg={4}>
            <div className="create-cv-card">
              <div className="create-cv-icon">
                <i className="bi bi-plus-circle"></i>
              </div>
              <h2 className="create-cv-title">Create New CV</h2>
              <p className="create-cv-text">
                Choose from our professional templates and create your CV in minutes
              </p>
              <Link to="/create-cv">
                <button className="create-cv-button">
                  Get Started
                  <i className="bi bi-arrow-right ms-2"></i>
                </button>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
