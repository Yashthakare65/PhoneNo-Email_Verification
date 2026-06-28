require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const twilio = require('twilio');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

const otpStore = {};

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running!' });
});

app.post('/api/send-otp', async (req, res) => {
  const { identifier } = req.body;

  if (!identifier) {
    return res.status(400).json({ error: 'identifier is required' });
  }

  const code = String(Math.floor(100000 + Math.random() * 900000));
  const expiresAt = Date.now() + 5 * 60 * 1000;
  otpStore[identifier] = { code, expiresAt };

  const isEmail = identifier.includes('@');

  if (isEmail) {
    try {
      await transporter.sendMail({
        from: `"OTP Verification" <${process.env.EMAIL_USER}>`,
        to: identifier,
        subject: 'Your verification code',
        text: `Your code is ${code}. It expires in 5 minutes.`,
      });
    } catch (err) {
      console.error('Email send failed:', err.message);
      return res.status(500).json({ success: false, message: 'Failed to send email' });
    }
  } else {
    const toNumber = identifier.startsWith('+') ? identifier : `+91${identifier}`;
    try {
      await twilioClient.messages.create({
        body: `Your verification code is ${code}. It expires in 5 minutes.`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: toNumber,
      });
    } catch (err) {
      console.error('SMS send failed:', err.message);
      return res.status(500).json({ success: false, message: 'Failed to send SMS' });
    }
  }

  res.json({ success: true, message: 'OTP sent' });
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

  delete otpStore[identifier];
  res.json({ success: true, message: 'Verified' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});