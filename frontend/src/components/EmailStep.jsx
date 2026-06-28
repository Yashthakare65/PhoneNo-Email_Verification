import { useState } from 'react';

export default function EmailStep({ onSent }) {
  const [email, setEmail] = useState('');
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
    <div>
      <h2 className="text-lg font-semibold text-slate-800 text-center mb-1">Verify your email</h2>
      <p className="text-sm text-slate-500 text-center mb-6">Almost done — one more code.</p>
      <input
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter' && valid) onSent(email); }}
        className="w-full border border-slate-300 rounded-lg px-4 py-3 mb-4 focus:border-indigo-500 focus:outline-none"
      />
      <button
        disabled={!valid}
        onClick={() => onSent(email)}
        className="w-full bg-indigo-600 disabled:bg-slate-200 disabled:text-slate-400 text-white font-medium rounded-lg py-3"
      >
        Send Code
      </button>
    </div>
  );
}