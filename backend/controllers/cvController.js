const CV = require('../models/CV');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// Get CV statistics for a user
exports.getStats = async (req, res) => {
  try {
    console.log('Fetching stats for user:', req.user._id);
    
    const totalCVs = await CV.countDocuments({ user: req.user._id });
    const downloads = await CV.aggregate([
      { $match: { user: req.user._id } },
      { $group: { _id: null, total: { $sum: '$downloads' } } }
    ]);

    const stats = {
      totalCVs,
      downloads: downloads[0]?.total || 0,
      templates: 3 // Currently supported templates
    };

    console.log('Stats retrieved:', stats);
    res.json(stats);
  } catch (error) {
    console.error('Error fetching CV stats:', error);
    res.status(500).json({ message: 'Error fetching CV statistics' });
  }
};

// Get recent CVs for a user
exports.getRecentCVs = async (req, res) => {
  try {
    console.log('Fetching recent CVs for user:', req.user._id);
    
    const cvs = await CV.find({ user: req.user._id })
      .select('name template createdAt')
      .sort({ createdAt: -1 })
      .limit(5);

    const formattedCVs = cvs.map(cv => ({
      id: cv._id,
      name: cv.name,
      template: cv.template,
      date: cv.createdAt
    }));

    console.log('Recent CVs retrieved:', formattedCVs.length);
    res.json(formattedCVs);
  } catch (error) {
    console.error('Error fetching recent CVs:', error);
    res.status(500).json({ message: 'Error fetching recent CVs' });
  }
};

// Get all CVs for a user
exports.getAllCVs = async (req, res) => {
  try {
    console.log('Fetching all CVs for user:', req.user._id);
    
    const cvs = await CV.find({ user: req.user._id })
      .select('name template createdAt downloads')
      .sort({ createdAt: -1 });

    const formattedCVs = cvs.map(cv => ({
      id: cv._id,
      name: cv.name,
      template: cv.template,
      date: cv.createdAt,
      downloads: cv.downloads
    }));

    console.log('All CVs retrieved:', formattedCVs.length);
    res.json(formattedCVs);
  } catch (error) {
    console.error('Error fetching all CVs:', error);
    res.status(500).json({ message: 'Error fetching CVs' });
  }
};

// Create a new CV
exports.createCV = async (req, res) => {
  try {
    console.log('Creating CV for user:', req.user._id);
    
    const newCV = new CV({
      user: req.user._id,
      name: req.body.name,
      template: req.body.template,
      content: req.body.content
    });

    await newCV.save();
    console.log('CV created successfully:', newCV._id);
    res.status(201).json(newCV);
  } catch (error) {
    console.error('Error creating CV:', error);
    res.status(500).json({ message: 'Error creating CV' });
  }
};

// Get a single CV
exports.getCV = async (req, res) => {
  try {
    console.log('Fetching CV:', req.params.id, 'for user:', req.user._id);
    
    const cv = await CV.findOne({ _id: req.params.id, user: req.user._id });
    
    if (!cv) {
      console.log('CV not found');
      return res.status(404).json({ message: 'CV not found' });
    }

    console.log('CV retrieved successfully');
    res.json(cv);
  } catch (error) {
    console.error('Error fetching CV:', error);
    res.status(500).json({ message: 'Error fetching CV' });
  }
};

// Update a CV
exports.updateCV = async (req, res) => {
  try {
    console.log('Updating CV:', req.params.id, 'for user:', req.user._id);
    
    const cv = await CV.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { 
        $set: {
          name: req.body.name,
          template: req.body.template,
          content: req.body.content,
          updatedAt: new Date()
        }
      },
      { new: true }
    );

    if (!cv) {
      console.log('CV not found');
      return res.status(404).json({ message: 'CV not found' });
    }

    console.log('CV updated successfully');
    res.json(cv);
  } catch (error) {
    console.error('Error updating CV:', error);
    res.status(500).json({ message: 'Error updating CV' });
  }
};

// Delete a CV
exports.deleteCV = async (req, res) => {
  try {
    console.log('Deleting CV:', req.params.id, 'for user:', req.user._id);
    
    const cv = await CV.findOneAndDelete({ _id: req.params.id, user: req.user._id });

    if (!cv) {
      console.log('CV not found');
      return res.status(404).json({ message: 'CV not found' });
    }

    console.log('CV deleted successfully');
    res.json({ message: 'CV deleted successfully' });
  } catch (error) {
    console.error('Error deleting CV:', error);
    res.status(500).json({ message: 'Error deleting CV' });
  }
};

// Download CV as PDF
exports.downloadCV = async (req, res) => {
  try {
    console.log('Downloading CV:', req.params.id, 'for user:', req.user._id);
    
    const cv = await CV.findOne({ _id: req.params.id, user: req.user._id });

    if (!cv) {
      console.log('CV not found');
      return res.status(404).json({ message: 'CV not found' });
    }

    // Create a new PDF document
    const doc = new PDFDocument();
    const filename = `cv-${cv._id}.pdf`;

    // Set response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

    // Pipe the PDF document to the response
    doc.pipe(res);

    // Add content to the PDF based on template and CV data
    generatePDF(doc, cv);

    // Increment download count
    cv.downloads += 1;
    await cv.save();

    console.log('CV downloaded successfully');
    // Finalize the PDF
    doc.end();
  } catch (error) {
    console.error('Error downloading CV:', error);
    res.status(500).json({ message: 'Error generating PDF' });
  }
};

// Helper function to generate PDF content
function generatePDF(doc, cv) {
  // Add header
  doc.fontSize(25)
     .text(cv.content.personalInfo.fullName, { align: 'center' })
     .fontSize(12)
     .moveDown()
     .text(cv.content.personalInfo.email)
     .text(cv.content.personalInfo.phone)
     .moveDown();

  // Add profile photo if exists
  if (cv.content.personalInfo.profilePhoto) {
    try {
      doc.image(cv.content.personalInfo.profilePhoto, {
        fit: [100, 100],
        align: 'center'
      });
    } catch (error) {
      console.error('Error adding profile photo to PDF:', error);
    }
  }

  // Add education section
  doc.moveDown()
     .fontSize(16)
     .text('Education', { underline: true })
     .moveDown();

  cv.content.education.forEach(edu => {
    doc.fontSize(14)
       .text(edu.degree)
       .fontSize(12)
       .text(`${edu.institution} - ${edu.year}`)
       .moveDown();
  });

  // Add experience section
  doc.moveDown()
     .fontSize(16)
     .text('Experience', { underline: true })
     .moveDown();

  cv.content.experiences.forEach(exp => {
    doc.fontSize(12)
       .text(exp)
       .moveDown();
  });

  // Add skills section
  doc.moveDown()
     .fontSize(16)
     .text('Skills', { underline: true })
     .moveDown();

  doc.fontSize(12)
     .text(cv.content.skills.join(', '))
     .moveDown();
} 