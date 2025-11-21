const mongoose = require('mongoose');

// Candidate Referral System के लिए Mongoose स्कीमा
const candidateSchema = new mongoose.Schema({
  // उम्मीदवार का पूरा नाम (Candidate's Full Name)
  name: {
    type: String,
    required: [true, 'Candidate name is required'],
    trim: true,
  },
  // उम्मीदवार का ईमेल (Candidate's Email) - Unique होना चाहिए
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true, // सुनिश्चित करता है कि डेटाबेस में कोई डुप्लिकेट ईमेल न हो
    lowercase: true,
    trim: true,
  },
  // उम्मीदवार का फ़ोन नंबर (Candidate's Phone Number)
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
  },
  // जिस पद के लिए रेफर किया गया है (Job Title referred for)
  jobTitle: {
    type: String,
    required: [true, 'Job title is required'],
    trim: true,
  },
  // उम्मीदवार की वर्तमान स्थिति (Current Status)
  status: {
    type: String,
    enum: ['Pending', 'Reviewed', 'Hired'], // केवल इन मानों की अनुमति है
    default: 'Pending', // डिफ़ॉल्ट रूप से 'Pending' सेट करें
    required: true,
  },
  // अपलोड किए गए रेज़्यूमे का URL/Path (Resume File URL/Path)
  resumeUrl: {
    type: String,
    required: false, // यह फ़ील्ड वैकल्पिक है
  },
}, {
  // Timestamps: createdAt और updatedAt फ़ील्ड्स को स्वचालित रूप से जोड़ता है
  timestamps: true,
});

// Candidate मॉडल को Mongoose स्कीमा से बनाएं
const Candidate = mongoose.model('Candidate', candidateSchema);

// मॉडल को एक्सपोर्ट करें
module.exports = Candidate;