import React, { useState, useContext } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import './Auth.css';

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email || !password) {
      setError('Please fill all fields');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({
          message: 'Login failed. Please check your credentials.'
        }));
        throw new Error(errorData.message || 'Login failed. Please try again.');
      }

      const data = await res.json();
      login(data.user, data.token);
      
      // Navigate to the intended destination or dashboard
      const destination = location.state?.from || '/dashboard';
      navigate(destination);
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Login failed. Please check your credentials and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      className="auth-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Card className="auth-card">
          <Card.Body>
            <motion.div 
              className="auth-header"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <h2 className="auth-title">Welcome Back</h2>
              <p className="auth-subtitle">Sign in to continue to CV Generator</p>
            </motion.div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Alert variant="danger" className="auth-alert">
                  <i className="bi bi-exclamation-circle"></i>
                  {error}
                </Alert>
              </motion.div>
            )}

            <Form onSubmit={handleSubmit} className="auth-form">
              <Form.Group className="form-floating mb-3">
                <Form.Control
                  type="email"
                  id="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  placeholder=" "
                />
                <Form.Label>Email address</Form.Label>
              </Form.Group>

              <Form.Group className="form-floating mb-3">
                <Form.Control
                  type="password"
                  id="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  minLength={6}
                  placeholder=" "
                />
                <Form.Label>Password</Form.Label>
              </Form.Group>

              <Button
                type="submit"
                className="auth-button"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <i className="bi bi-arrow-repeat spin me-2"></i>
                    Signing in...
                  </>
                ) : (
                  <>
                    <i className="bi bi-box-arrow-in-right me-2"></i>
                    Sign In
                  </>
                )}
              </Button>

              <div className="auth-footer">
                Don't have an account?{' '}
                <Link to="/register" className="auth-link">
                  Sign up now
                </Link>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </motion.div>
    </motion.div>
  );
}




