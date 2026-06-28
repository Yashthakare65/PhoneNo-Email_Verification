import { useState } from 'react';
import OtpInput from './OtpInput';

export default function OtpStep({ destination, onVerify, onVerified }) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    setLoading(true);
    setError('');
    const result = await onVerify(code);
    setLoading(false);
    if (result.success) {
      onVerified();
    } else {
      setError(result.message || 'Verification failed');
    }
  };

  return (
    <div onKeyDown={(e) => { if (e.key === 'Enter' && code.length === 6) handleVerify(); }}>
      <h2 className="text-lg font-semibold text-slate-800 text-center mb-1">Enter the code</h2>
      <p className="text-sm text-slate-500 text-center mb-6">Sent to {destination}</p>

      <OtpInput onChange={setCode} />

      {error && <p className="text-sm text-red-500 text-center mt-3">{error}</p>}

      <button
        onClick={handleVerify}
        disabled={code.length !== 6 || loading}
        className="w-full bg-indigo-600 disabled:bg-slate-200 disabled:text-slate-400 text-white font-medium rounded-lg py-3 mt-5"
      >
        {loading ? 'Verifying...' : 'Verify'}
      </button>
    </div>
  );
}