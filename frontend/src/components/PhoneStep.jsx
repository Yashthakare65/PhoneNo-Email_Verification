import { useState } from "react";

export default function PhoneStep(){
  const[phone,setPhone]=useState('');

  return(
    <div>
      <h2 className="text-lg font-semibold text-slate-800 text-center mb-1">Verify your phone</h2>
      <p className="text-sm text-slate-500 text-center mb-6">We'll text you a 6-digit code.</p>
      <input 
      type="tel"
      placeholder="e.g 9876543210"
      value={phone}
      onChange={(e)=>setPhone(e.target.value)}
      className="w-full border border-slate-300 rounded-lg px-4 py-3 mb-4 focus:border-indigo-500 focus:outline-none"
      />
      <button className="w-full bg-indigo-600 text-white font-medium rounded-lg py-3">Send Code</button>
    </div>
  )
}