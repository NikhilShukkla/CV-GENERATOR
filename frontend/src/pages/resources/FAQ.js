import React from 'react';
import { Container, Accordion } from 'react-bootstrap';
import './Resources.css';

const FAQ = () => {
  const faqs = [
    {
      question: "How do I create a resume?",
      answer: "Creating a resume is easy with our platform. Simply click on 'Create Resume' button, choose a template, fill in your information, and our system will generate a professional resume for you. You can then edit, save, and download your resume in multiple formats."
    },
    {
      question: "Can I save multiple versions of my resume?",
      answer: "Yes! You can create and save multiple versions of your resume. This is particularly useful when applying for different types of jobs or industries, as you can tailor each version to specific requirements."
    },
    {
      question: "What format can I download my resume in?",
      answer: "Our platform allows you to download your resume in PDF format, which is the most widely accepted format by employers. PDF ensures your resume maintains its formatting across different devices and systems."
    },
    {
      question: "Is my information secure?",
      answer: "Yes, we take data security very seriously. All your personal information is encrypted and stored securely. We never share your information with third parties without your explicit consent."
    },
    {
      question: "Can I update my resume after creating it?",
      answer: "Absolutely! You can update your resume at any time. Simply log in to your account, select the resume you want to edit, make your changes, and save. All updates are instantly reflected in your saved resume."
    },
    {
      question: "What makes a good resume?",
      answer: "A good resume should be clear, concise, and relevant to the job you're applying for. Key elements include: professional summary, work experience, education, skills, and achievements. Make sure to quantify your achievements and use action words to describe your experiences."
    },
    {
      question: "How long should my resume be?",
      answer: "Generally, your resume should be 1-2 pages long. For entry-level positions, aim for one page. For more experienced professionals, two pages may be appropriate to showcase relevant experience and achievements."
    },
    {
      question: "Do you offer resume templates?",
      answer: "Yes, we offer a variety of professional resume templates designed for different industries and career levels. Our templates are ATS-friendly and fully customizable to match your personal style."
    }
  ];

  const handleContactSupport = (e) => {
    e.preventDefault();
    const email = 'support@cvgeneratorpro.com';
    const subject = 'Support Request - CV Generator Pro';
    const body = 'Hello, I have a question about...';
    
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="resource-page">
      <Container>
        <h1 className="resource-title">Frequently Asked Questions</h1>
        <p className="resource-subtitle">Find answers to common questions about resume building and our platform</p>

        <div className="faq-section mt-5">
          <Accordion>
            {faqs.map((faq, index) => (
              <Accordion.Item eventKey={index.toString()} key={index}>
                <Accordion.Header>
                  <i className="bi bi-question-circle me-2"></i>
                  {faq.question}
                </Accordion.Header>
                <Accordion.Body>
                  {faq.answer}
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </div>

        <div className="contact-support mt-5">
          <h3>Still have questions?</h3>
          <p>
            Can't find the answer you're looking for? Feel free to contact our support team.
            We're here to help!
          </p>
          <button className="support-button" onClick={handleContactSupport}>
            <i className="bi bi-envelope"></i> Contact Support
          </button>
        </div>
      </Container>
    </div>
  );
};

export default FAQ; 