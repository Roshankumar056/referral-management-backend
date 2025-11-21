const multer = require('multer');
const path = require('path');

// 5MB फ़ाइल साइज़ लिमिट (in bytes)
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// 1. स्टोरेज इंजन कॉन्फ़िगरेशन
const storage = multer.diskStorage({
  // 'uploads' फ़ोल्डर में सेव करें। यह फ़ोल्डर रूट डायरेक्टरी में होना चाहिए।
  destination: (req, file, cb) => {
    // पहला आर्गुमेंट (null) error के लिए है
    cb(null, 'uploads/');
  },
  // फ़ाइल का नाम (Filename) सेट करें
  filename: (req, file, cb) => {
    // Date.now() + originalname का उपयोग करके एक अद्वितीय नाम बनाएं
    cb(null, Date.now() + '-' + file.originalname);
  },
});

// 2. फ़ाइल फ़िल्टर (File Filter) - केवल .pdf फ़ाइल्स की अनुमति दें
const fileFilter = (req, file, cb) => {
  // MIME type की जाँच करें
  if (file.mimetype === 'application/pdf') {
    // फ़ाइल स्वीकार करें (true)
    cb(null, true);
  } else {
    // फ़ाइल अस्वीकार करें और एक एरर वापस करें (false)
    // MulterError को `new Error()` के बजाय पास करने से express error handling में मदद मिलती है
    cb(new Error('Only .pdf format allowed!'), false);
  }
};

// 3. Multer अपलोड इंस्टेंस
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: MAX_FILE_SIZE, // 5MB की सीमा
  },
});

// 4. `upload` middleware को एक्सपोर्ट करें
module.exports = upload;