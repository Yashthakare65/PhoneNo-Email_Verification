# OTP Verification System

A full-stack web application that verifies a user's **phone number** and **email address** using one-time passwords (OTPs) — real SMS via Twilio and real email via Nodemailer/Gmail.

**Flow:** Enter phone number → receive a 6-digit SMS code → verify it → enter email → receive a 6-digit email code → verify it → see a confirmation screen showing both as verified.

---

## Features

- 📱 Phone number verification via real SMS (Twilio)
- 📧 Email verification via real email (Nodemailer + Gmail)
- 🔢 Auto-advancing 6-digit OTP input boxes (paste support, backspace navigation)
- ⏱️ Codes expire after 5 minutes
- ♻️ Codes are single-use — deleted immediately after a successful verification
- ✅ Clean success screen confirming both verifications
- ⌨️ Enter-key submission on every step
- 🚫 Client-side input validation (phone format, email format)

---

## Tech Stack

**Frontend**
- React (Vite)
- Tailwind CSS

**Backend**
- Node.js + Express
- Nodemailer (email delivery)
- Twilio (SMS delivery)
- dotenv (environment variable management)
- cors (cross-origin requests between frontend and backend)

---

## Project Structure

```
otp-verification-project/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── PhoneStep.jsx     # Phone number input screen
│   │   │   ├── EmailStep.jsx     # Email input screen
│   │   │   ├── OtpInput.jsx      # Reusable 6-digit code input
│   │   │   ├── OtpStep.jsx       # OTP entry + verify screen (used for both phone & email)
│   │   │   └── SuccessStep.jsx   # Final confirmation screen
│   │   └── App.jsx               # Step state machine, wires everything together
│   └── package.json
│
├── backend/
│   ├── server.js                 # Express server, OTP generation, email/SMS sending, verification
│   ├── .env                      # Secrets (not committed — see below)
│   └── package.json
│
└── README.md
```

---

## Prerequisites

- [Node.js](https://nodejs.org) (v18 or higher recommended)
- A Gmail account with an [App Password](https://myaccount.google.com/apppasswords) generated (requires 2-Step Verification enabled)
- A [Twilio](https://www.twilio.com/try-twilio) account (free trial works) with:
  - Account SID
  - Auth Token
  - A Twilio phone number
  - Your own phone number verified as a recipient (trial accounts can only send to verified numbers)

---

## Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/Yashthakare65/PhoneNo-Email_Verification.git
cd PhoneNo-Email_Verification
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/` with the following (use your own real values — never commit this file):

```env
PORT=5000

# Gmail (Nodemailer)
EMAIL_USER=your_gmail_address@gmail.com
EMAIL_PASS=your_16_character_app_password

# Twilio
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=+1xxxxxxxxxx
```

Start the backend:

```bash
node server.js
```

The server runs at `http://localhost:5000`.

### 3. Frontend setup

In a **separate terminal**:

```bash
cd frontend
npm install
npm run dev
```

The app runs at `http://localhost:5173`.

> Both the backend and frontend need to be running at the same time, in two separate terminals.

---

## API Endpoints

| Method | Endpoint            | Body                              | Description                                      |
|--------|----------------------|------------------------------------|---------------------------------------------------|
| GET    | `/api/health`         | —                                  | Health check — confirms the server is running     |
| POST   | `/api/send-otp`       | `{ "identifier": "email or phone" }` | Generates a 6-digit OTP and sends it via email or SMS |
| POST   | `/api/verify-otp`     | `{ "identifier": "...", "code": "123456" }` | Verifies the code against what was sent          |

**Notes:**
- `identifier` containing `@` is treated as an email; otherwise it's treated as a phone number.
- Phone numbers without a `+` country code prefix are assumed to be Indian numbers (`+91`) — adjust this in `server.js` if needed for your region.
- OTPs are stored in memory and expire after 5 minutes. Restarting the server clears all pending codes.

---

## Known Limitations / Future Improvements

- OTPs are stored in memory (`otpStore` object) — not persisted across server restarts. A production version should use a database or Redis.
- No rate limiting on `/api/send-otp` yet — someone could request codes repeatedly. Worth adding before deploying publicly.
- No resend-cooldown enforcement on the backend (only on the frontend UI).
- Phone country code is hardcoded to `+91`. A country-code selector would make this work internationally.
- Twilio trial accounts can only send SMS to pre-verified numbers — fine for development, but requires a paid Twilio plan for real users.

---

## License

This project is open for personal and educational use.