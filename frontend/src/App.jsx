import { useState } from 'react';
import PhoneStep from './components/PhoneStep';
import OtpStep from './components/OtpStep';
import EmailStep from './components/EmailStep';
import SuccessStep from './components/SuccessStep';

function generateDemoCode() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

export default function App() {
  const [step, setStep] = useState('phone');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [phoneDemoCode, setPhoneDemoCode] = useState('');
  const [emailDemoCode, setEmailDemoCode] = useState('');

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
        {step === 'phone' && (
          <PhoneStep
            onSent={(p) => {
              setPhone(p);
              setPhoneDemoCode(generateDemoCode());
              setStep('phoneOtp');
            }}
          />
        )}
        {step === 'phoneOtp' && (
          <OtpStep
            destination={phone}
            demoCode={phoneDemoCode}
            onVerified={() => setStep('email')}
          />
        )}
        {step === 'email' && (
          <EmailStep
            onSent={(e) => {
              setEmail(e);
              setEmailDemoCode(generateDemoCode());
              setStep('emailOtp');
            }}
          />
        )}
        {step === 'emailOtp' && (
          <OtpStep
            destination={email}
            demoCode={emailDemoCode}
            onVerified={() => setStep('done')}
          />
        )}
        {step === 'done' && <SuccessStep phone={phone} email={email} />}
      </div>
    </div>
  );
}