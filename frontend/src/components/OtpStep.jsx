import { useState } from 'react';
import OtpInput from './OtpInput';

export default function OtpStep({ destination, demoCode, onVerified }) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleVerify = () => {
    if (code === demoCode) {
      setError('');
      onVerified();
    } else {
      setError("That code didn't match — try again.");
    }
  };

  return (
    <div onKeyDown={(e) => { if (e.key === 'Enter' && code.length === 6) handleVerify(); }}>
      <h2 className="text-lg font-semibold text-slate-800 text-center mb-1">Enter the code</h2>
      <p className="text-sm text-slate-500 text-center mb-6">Sent to {destination}</p>

      <OtpInput onChange={setCode} />

      {error && <p className="text-sm text-red-500 text-center mt-3">{error}</p>}

      <p className="text-xs text-slate-400 text-center mt-4 bg-slate-50 rounded-md py-2">
        Demo code: <span className="font-mono font-semibold">{demoCode}</span>
      </p>

      <button
        onClick={handleVerify}
        className="w-full bg-indigo-600 text-white font-medium rounded-lg py-3 mt-5"
      >
        Verify
      </button>
    </div>
  );
}