require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Debug middleware to log all requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  console.log('Request body:', req.body);
  next();
});

// Mock users data
const users = [
  {
    id: '1',
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123'
  }
];

// Authentication routes
app.post('/api/users/login', (req, res) => {
  console.log('Login attempt:', req.body);
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide both email and password' });
  }

  const user = users.find(u => u.email === email);
  
  if (!user) {
    console.log('User not found:', email);
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  if (user.password !== password) {
    console.log('Invalid password for user:', email);
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    'your-secret-key',
    { expiresIn: '1h' }
  );

  console.log('Login successful for user:', email);
  res.json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    }
  });
});

app.post('/api/users/register', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  if (users.some(u => u.email === email)) {
    return res.status(400).json({ message: 'Email already registered' });
  }

  const newUser = {
    id: String(users.length + 1),
    name,
    email,
    password
  };

  users.push(newUser);

  const token = jwt.sign(
    { id: newUser.id, email: newUser.email },
    'your-secret-key',
    { expiresIn: '1h' }
  );

  res.status(201).json({
    token,
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email
    }
  });
});

// Verify token endpoint
app.get('/api/users/verify', (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, 'your-secret-key');
    const user = users.find(u => u.id === decoded.id);
    
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

// Simplified static data
const mockData = {
  stats: {
    totalCVs: 5,
    downloads: 10,
    templates: 3
  },
  recentCVs: [
    {
      id: '1',
      name: 'Software Developer CV',
      template: 'Modern',
      date: new Date().toISOString()
    },
    {
      id: '2',
      name: 'Project Manager CV',
      template: 'Classic',
      date: new Date().toISOString()
    }
  ]
};

// Protected routes middleware
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, 'your-secret-key');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Protected routes
app.get('/api/cv/stats', authenticateToken, (req, res) => {
  console.log('Fetching stats for user:', req.user.email);
  res.json(mockData.stats);
});

app.get('/api/cv/recent', authenticateToken, (req, res) => {
  console.log('Fetching recent CVs for user:', req.user.email);
  res.json(mockData.recentCVs);
});

// 404 handler
app.use((req, res) => {
  console.log(`404 - Not Found: ${req.method} ${req.path}`);
  res.status(404).json({
    message: 'Route not found',
    requestedPath: req.path,
    method: req.method
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    message: err.message || 'Something went wrong!',
    path: req.path,
    method: req.method
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API base URL: http://localhost:${PORT}`);
  console.log('Available routes:');
  console.log('- POST /api/users/login');
  console.log('- POST /api/users/register');
  console.log('- GET /api/users/verify');
  console.log('- GET /api/cv/stats (protected)');
  console.log('- GET /api/cv/recent (protected)');
  console.log('\nTest account:');
  console.log('Email: test@example.com');
  console.log('Password: password123');
});
