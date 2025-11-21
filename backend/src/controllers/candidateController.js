const Candidate = require('../models/Candidate');
const { validationResult } = require('express-validator');

/**
 * @desc एक नया कैंडिडेट रेफ़रल जोड़ें
 * @route POST /api/candidates
 * @access Public
 */
exports.createCandidate = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, phone, jobTitle } = req.body;

  let resumeUrl = null;
  if (req.file) {
    resumeUrl = req.file.path;
  }

  try {
    const candidate = new Candidate({
      name,
      email,
      phone,
      jobTitle,
      resumeUrl,
    });

    const createdCandidate = await candidate.save();
    res.status(201).json(createdCandidate);

  } catch (error) {
    console.error('कैंडिडेट बनाने में एरर:', error);

    if (error.code === 11000) {
      return res.status(400).json({ msg: 'यह ईमेल पहले ही रेफर किया जा चुका है।' });
    }

    res.status(500).json({ msg: 'सर्वर एरर' });
  }
};


/**
 * @desc सभी कैंडिडेट्स प्राप्त करें (Newest first)
 * @route GET /api/candidates
 * @access Public
 */
exports.getCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find({}).sort({ createdAt: -1 });
    res.json(candidates);
  } catch (error) {
    console.error('कैंडिडेट फ़ेच करने में एरर:', error);
    res.status(500).json({ msg: 'सर्वर एरर' });
  }
};


/**
 * @desc किसी कैंडिडेट का स्टेटस अपडेट करें
 * @route PUT /api/candidates/:id/status
 * @access Public
 */
exports.updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['Pending', 'Reviewed', 'Hired'].includes(status)) {
    return res.status(400).json({ msg: 'अवैध स्टेटस मान' });
  }

  try {
    const updatedCandidate = await Candidate.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedCandidate) {
      return res.status(404).json({ msg: 'कैंडिडेट नहीं मिला' });
    }

    res.json(updatedCandidate);

  } catch (error) {
    console.error('स्टेटस अपडेट करने में एरर:', error);

    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'अवैध कैंडिडेट ID' });
    }

    res.status(500).json({ msg: 'सर्वर एरर' });
  }
};


/**
 * @desc किसी कैंडिडेट को डिलीट करें
 * @route DELETE /api/candidates/:id
 * @access Public
 */
exports.deleteCandidate = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCandidate = await Candidate.findByIdAndDelete(id);

    if (!deletedCandidate) {
      return res.status(404).json({ msg: 'Candidate not found' });
    }

    res.status(200).json({ msg: 'Candidate deleted successfully' });

  } catch (error) {
    console.error('कैंडिडेट डिलीट करने में एरर:', error);

    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Candidate not found' });
    }

    res.status(500).json({ msg: 'Server error' });
  }
};
