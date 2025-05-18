import React from 'react';
import { Container, Row, Col, Card, Accordion } from 'react-bootstrap';
import './Resources.css';

const ResumeTips = () => {
  const essentialTips = [
    {
      title: "Tailor Your Resume",
      content: "Customize your resume for each job application by matching your qualifications to the job requirements.",
      icon: "bi bi-bullseye"
    },
    {
      title: "Use Action Words",
      content: "Start bullet points with strong action verbs to demonstrate your achievements and responsibilities.",
      icon: "bi bi-lightning"
    },
    {
      title: "Quantify Achievements",
      content: "Include specific numbers and metrics to showcase the impact of your work.",
      icon: "bi bi-graph-up-arrow"
    },
    {
      title: "Keep it Concise",
      content: "Limit your resume to 1-2 pages, focusing on the most relevant information.",
      icon: "bi bi-file-text"
    }
  ];

  return (
    <div className="resource-page">
      <Container>
        <h1 className="resource-title">Resume Writing Tips</h1>
        <p className="resource-subtitle">Expert advice to create a compelling resume</p>

        <Row className="mt-5">
          {essentialTips.map((tip, index) => (
            <Col md={6} lg={3} key={index} className="mb-4">
              <Card className="resource-card h-100">
                <Card.Body>
                  <div className="resource-icon">
                    <i className={tip.icon}></i>
                  </div>
                  <Card.Title className="resource-card-title">{tip.title}</Card.Title>
                  <Card.Text>{tip.content}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <div className="resource-section mt-5">
          <h2>Resume Writing Guide</h2>
          <Row className="mt-4">
            <Col lg={8}>
              <Accordion defaultActiveKey="0" className="resume-guide">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>1. Contact Information</Accordion.Header>
                  <Accordion.Body>
                    <ul>
                      <li>Include your full name, phone number, and professional email</li>
                      <li>Add your LinkedIn profile and portfolio website (if relevant)</li>
                      <li>Make sure your contact information is up-to-date</li>
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1">
                  <Accordion.Header>2. Professional Summary</Accordion.Header>
                  <Accordion.Body>
                    <ul>
                      <li>Write a compelling 2-3 sentence overview of your career</li>
                      <li>Highlight your most relevant skills and experiences</li>
                      <li>Tailor it to the specific job you're applying for</li>
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="2">
                  <Accordion.Header>3. Work Experience</Accordion.Header>
                  <Accordion.Body>
                    <ul>
                      <li>List your experience in reverse chronological order</li>
                      <li>Use bullet points to describe your achievements</li>
                      <li>Focus on results and quantifiable accomplishments</li>
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="3">
                  <Accordion.Header>4. Education & Skills</Accordion.Header>
                  <Accordion.Body>
                    <ul>
                      <li>Include relevant degrees, certifications, and training</li>
                      <li>List technical skills and soft skills separately</li>
                      <li>Highlight skills mentioned in the job description</li>
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Col>
            <Col lg={4}>
              <div className="tips-sidebar">
                <h4>Common Mistakes to Avoid</h4>
                <ul className="mistakes-list">
                  <li>Using generic objectives</li>
                  <li>Including irrelevant information</li>
                  <li>Typos and grammatical errors</li>
                  <li>Dense, hard-to-read paragraphs</li>
                  <li>Outdated or irrelevant experience</li>
                </ul>
                <div className="pro-tip">
                  <h5><i className="bi bi-lightbulb"></i> Pro Tip</h5>
                  <p>Always proofread your resume multiple times and ask someone else to review it before submitting.</p>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default ResumeTips; 