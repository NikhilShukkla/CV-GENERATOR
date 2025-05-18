import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './Resources.css';

const Blog = () => {
  const blogPosts = [
    {
      title: "10 Resume Tips for 2024",
      excerpt: "Learn the latest trends in resume writing and how to make your CV stand out in the digital age.",
      date: "March 15, 2024",
      category: "Resume Tips",
      image: "resume-tips.jpg"
    },
    {
      title: "The Future of Work",
      excerpt: "Discover how AI and automation are changing the job market and how to prepare for future careers.",
      date: "March 12, 2024",
      category: "Career Insights",
      image: "future-work.jpg"
    },
    {
      title: "Mastering Remote Job Interviews",
      excerpt: "Essential tips for succeeding in virtual interviews and remote hiring processes.",
      date: "March 10, 2024",
      category: "Interview Tips",
      image: "remote-interview.jpg"
    },
    {
      title: "Building Your Personal Brand",
      excerpt: "Learn how to create and maintain a strong professional presence online.",
      date: "March 8, 2024",
      category: "Personal Development",
      image: "personal-brand.jpg"
    }
  ];

  return (
    <div className="resource-page">
      <Container>
        <h1 className="resource-title">Career Blog</h1>
        <p className="resource-subtitle">Insights and advice for your professional journey</p>

        <Row className="mt-5">
          {blogPosts.map((post, index) => (
            <Col lg={6} key={index} className="mb-4">
              <Card className="blog-card">
                <Card.Body>
                  <div className="blog-category">{post.category}</div>
                  <Card.Title className="blog-title">{post.title}</Card.Title>
                  <Card.Text className="blog-excerpt">{post.excerpt}</Card.Text>
                  <div className="blog-meta">
                    <span className="blog-date">
                      <i className="bi bi-calendar3"></i> {post.date}
                    </span>
                    <button className="blog-read-more">
                      Read More <i className="bi bi-arrow-right"></i>
                    </button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <div className="resource-section mt-5">
          <h2>Featured Article</h2>
          <Row className="mt-4">
            <Col lg={8}>
              <div className="featured-article">
                <h3>How to Write a Resume That Gets You Hired</h3>
                <div className="article-meta">
                  <span><i className="bi bi-person"></i> By Career Expert</span>
                  <span><i className="bi bi-clock"></i> 5 min read</span>
                </div>
                <p>
                  Creating a resume that stands out is both an art and a science. 
                  In this comprehensive guide, we'll walk you through the essential 
                  elements of a modern resume and share expert tips for highlighting 
                  your achievements effectively.
                </p>
                <button className="read-full-article">
                  Read Full Article <i className="bi bi-arrow-right"></i>
                </button>
              </div>
            </Col>
            <Col lg={4}>
              <div className="popular-posts">
                <h4>Popular Posts</h4>
                <ul>
                  <li>
                    <a href="#">Top Skills Employers Look For in 2024</a>
                    <span className="post-date">March 5, 2024</span>
                  </li>
                  <li>
                    <a href="#">How to Navigate Career Changes</a>
                    <span className="post-date">March 3, 2024</span>
                  </li>
                  <li>
                    <a href="#">Resume Mistakes to Avoid</a>
                    <span className="post-date">March 1, 2024</span>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default Blog; 