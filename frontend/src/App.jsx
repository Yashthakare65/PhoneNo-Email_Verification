import { useState } from 'react';
import PhoneStep from './components/PhoneStep';
import OtpStep from './components/OtpStep';
import EmailStep from './components/EmailStep';
import SuccessStep from './components/SuccessStep';

const API_BASE = 'http://localhost:5000';

async function sendOtp(identifier) {
  const res = await fetch(`${API_BASE}/api/send-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identifier }),
  });
  return res.json();
}

async function verifyOtp(identifier, code) {
  const res = await fetch(`${API_BASE}/api/verify-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identifier, code }),
  });
  return res.json();
}

export default function App() {
  const [step, setStep] = useState('phone');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
        {step === 'phone' && (
          <PhoneStep
            onSent={async (p) => {
              setPhone(p);
              await sendOtp(p);
              setStep('phoneOtp');
            }}
          />
        )}
        {step === 'phoneOtp' && (
          <OtpStep
            destination={phone}
            onVerify={(code) => verifyOtp(phone, code)}
            onVerified={() => setStep('email')}
          />
        )}
        {step === 'email' && (
          <EmailStep
            onSent={async (e) => {
              setEmail(e);
              await sendOtp(e);
              setStep('emailOtp');
            }}
          />
        )}
        {step === 'emailOtp' && (
          <OtpStep
            destination={email}
            onVerify={(code) => verifyOtp(email, code)}
            onVerified={() => setStep('done')}
          />
        )}
        {step === 'done' && <SuccessStep phone={phone} email={email} />}
      </div>
    </div>
  );
}