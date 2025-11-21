const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

// कंट्रोलर और मिडिलवेअर इंपोर्ट करें
const candidateController = require('../controllers/candidateController');
const upload = require('../middleware/upload');

// POST /api/candidates: नया कैंडिडेट रेफ़रल जोड़ें
router.post(
  '/',
  // 1. Multer Middleware: 'resume' फील्ड नाम के साथ एक फ़ाइल की अनुमति दें
  upload.single('resume'),

  // 2. Validation Middleware: सुनिश्चित करें कि इनपुट सही फॉर्मेट में है
  [
    body('name')
      .notEmpty()
      .withMessage('Name is required'),

    body('email')
      .isEmail()
      .withMessage('Valid email is required'),

    body('phone')
      .notEmpty()
      .withMessage('Phone is required'),

    body('jobTitle')
      .notEmpty()
      .withMessage('Job title is required'),
  ],

  // 3. Controller: डेटा को सेव करने के लिए
  candidateController.createCandidate
);

// GET /api/candidates: सभी कैंडिडेट्स को फ़ेच करें
router.get('/', candidateController.getCandidates);

// PUT /api/candidates/:id/status: कैंडिडेट के स्टेटस को अपडेट करें
router.put('/:id/status', candidateController.updateStatus);

// DELETE /api/candidates/:id: कैंडिडेट को डिलीट करें
router.delete('/:id', candidateController.deleteCandidate);

// router को एक्सपोर्ट करें
module.exports = router;
