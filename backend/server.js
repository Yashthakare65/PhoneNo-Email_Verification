require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running!' });
});

const otpStore = {};

app.post('/api/send-otp', (req, res) => {
  const { identifier } = req.body;

  if (!identifier) {
    return res.status(400).json({ error: 'identifier is required' });
  }

  const code = String(Math.floor(100000 + Math.random() * 900000));
  const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes from now

  otpStore[identifier] = { code, expiresAt };

  console.log(`OTP for ${identifier}: ${code}`); // stand-in for real sending, for now

  res.json({ success: true, message: 'OTP generated', otp: code }); // we return it now only because there's no real sender yet
});

app.post('/api/verify-otp', (req, res) => {
  const { identifier, code } = req.body;
  const record = otpStore[identifier];

  if (!record) {
    return res.status(400).json({ success: false, message: 'No OTP was sent to this identifier' });
  }

  if (Date.now() > record.expiresAt) {
    delete otpStore[identifier];
    return res.status(400).json({ success: false, message: 'Code expired, request a new one' });
  }

  if (code !== record.code) {
    return res.status(400).json({ success: false, message: 'Incorrect code' });
  }

  delete otpStore[identifier]; // one-time use — can't be verified twice
  res.json({ success: true, message: 'Verified' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});