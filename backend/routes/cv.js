const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const {
  getStats,
  getRecentCVs,
  getAllCVs,
  createCV,
  getCV,
  updateCV,
  deleteCV,
  downloadCV
} = require('../controllers/cvController');
const CV = require('../models/CV');
const { authenticateToken } = require('../middleware/auth');

// Debug route registration
console.log('Registering CV routes at /api/cv...');

// All routes are protected with auth middleware
router.use((req, res, next) => {
  console.log(`[CV Route] ${req.method} ${req.path} - Auth check`);
  auth(req, res, next);
});

// Apply authentication middleware to all routes
router.use(authenticateToken);

// Get CV statistics
router.get('/stats', (req, res, next) => {
  console.log(`[CV Route] GET /stats - Token: ${req.header('Authorization')?.substring(0, 20)}...`);
  console.log('[CV Route] User:', req.user?._id);
  getStats(req, res, next);
});

// Get recent CVs
router.get('/recent', (req, res, next) => {
  console.log('Recent CVs route hit');
  getRecentCVs(req, res, next);
});

// Get all CVs
router.get('/all', (req, res, next) => {
  console.log('All CVs route hit');
  getAllCVs(req, res, next);
});

// Get all CVs for the current user
router.get('/', async (req, res) => {
  try {
    const cvs = await CV.find({ userId: req.user.id }).sort({ updatedAt: -1 });
    res.json(cvs);
  } catch (error) {
    console.error('Error fetching CVs:', error);
    res.status(500).json({ message: 'Error fetching CVs' });
  }
});

// Get a specific CV
router.get('/:id', async (req, res) => {
  try {
    const cv = await CV.findOne({ _id: req.params.id, userId: req.user.id });
    if (!cv) {
      return res.status(404).json({ message: 'CV not found' });
    }
    res.json(cv);
  } catch (error) {
    console.error('Error fetching CV:', error);
    res.status(500).json({ message: 'Error fetching CV' });
  }
});

// Create or update a CV
router.post('/', async (req, res) => {
  try {
    const { id, template, data } = req.body;
    
    // Validate required fields
    if (!template || !data || !data.fullName || !data.email) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    let cv;
    if (id) {
      // Update existing CV
      cv = await CV.findOne({ _id: id, userId: req.user.id });
      if (!cv) {
        return res.status(404).json({ message: 'CV not found' });
      }
      cv.template = template;
      cv.data = data;
    } else {
      // Create new CV
      cv = new CV({
        userId: req.user.id,
        template,
        data
      });
    }

    await cv.save();
    res.json(cv);
  } catch (error) {
    console.error('Error saving CV:', error);
    res.status(500).json({ message: 'Error saving CV' });
  }
});

// Delete a CV
router.delete('/:id', async (req, res) => {
  try {
    const cv = await CV.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!cv) {
      return res.status(404).json({ message: 'CV not found' });
    }
    res.json({ message: 'CV deleted successfully' });
  } catch (error) {
    console.error('Error deleting CV:', error);
    res.status(500).json({ message: 'Error deleting CV' });
  }
});

// Get CV statistics
router.get('/stats/summary', async (req, res) => {
  try {
    const totalCVs = await CV.countDocuments({ userId: req.user.id });
    const templates = await CV.distinct('template', { userId: req.user.id });
    
    res.json({
      totalCVs,
      templates: templates.length,
      lastUpdated: new Date()
    });
  } catch (error) {
    console.error('Error fetching CV stats:', error);
    res.status(500).json({ message: 'Error fetching CV statistics' });
  }
});

// Update a CV
router.put('/:id', (req, res, next) => {
  console.log('Update CV route hit');
  updateCV(req, res, next);
});

// Download CV as PDF
router.get('/:id/download', (req, res, next) => {
  console.log('Download CV route hit');
  downloadCV(req, res, next);
});

console.log('CV routes registered successfully');

module.exports = router;
