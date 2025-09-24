const express = require('express');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const router = express.Router();

// simple in-memory storage for uploaded docs metadata
const docs = [];

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, '/tmp'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// middleware to check token
const auth = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: 'No token provided' });
  const token = header.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret');
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

router.post('/upload', auth, upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
  const meta = { _id: String(docs.length + 1), filename: req.file.filename, originalname: req.file.originalname, uploadedBy: req.userId };
  docs.push(meta);
  res.status(201).json(meta);
});

router.get('/', auth, (req, res) => {
  // return docs uploaded by the user
  const userDocs = docs.filter(d => d.uploadedBy === req.userId);
  res.json(userDocs);
});

module.exports = router;
