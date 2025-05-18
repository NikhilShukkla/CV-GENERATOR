import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './Resources.css';

const Career = () => {
  const careerTips = [
    {
      title: "Finding Your Dream Job",
      content: "Learn how to identify and pursue career opportunities that align with your passions and skills.",
      icon: "bi bi-star"
    },
    {
      title: "Interview Preparation",
      content: "Master the art of interviewing with our comprehensive guide to common questions and best practices.",
      icon: "bi bi-chat-dots"
    },
    {
      title: "Career Development",
      content: "Discover strategies for continuous professional growth and advancement in your chosen field.",
      icon: "bi bi-graph-up"
    },
    {
      title: "Networking Tips",
      content: "Build and maintain professional relationships that can help advance your career.",
      icon: "bi bi-people"
    }
  ];

  return (
    <div className="resource-page">
      <Container>
        <h1 className="resource-title">Career Advice</h1>
        <p className="resource-subtitle">Expert guidance to help you succeed in your professional journey</p>
        
        <Row className="mt-5">
          {careerTips.map((tip, index) => (
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
          <h2>Latest Career Insights</h2>
          <Row className="mt-4">
            <Col lg={8}>
              <div className="career-article">
                <h3>How to Stand Out in Today's Job Market</h3>
                <p>
                  In today's competitive job market, standing out from the crowd is more important than ever. 
                  Here are some key strategies to help you differentiate yourself:
                </p>
                <ul>
                  <li>Develop unique skills that are in high demand</li>
                  <li>Build a strong personal brand</li>
                  <li>Create an impressive online presence</li>
                  <li>Network effectively with industry professionals</li>
                </ul>
              </div>
            </Col>
            <Col lg={4}>
              <div className="quick-tips">
                <h4>Quick Career Tips</h4>
                <ul>
                  <li>Keep your resume updated</li>
                  <li>Follow industry trends</li>
                  <li>Attend professional events</li>
                  <li>Seek mentorship opportunities</li>
                </ul>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default Career; 