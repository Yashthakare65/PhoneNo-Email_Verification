import { useState } from "react";

export default function PhoneStep(){
  const[phone,setPhone]=useState('');

  return(
    <div>
      <h2>Verify your phone</h2>
      <p>We'll text you a 6-digit code.</p>
      <input 
      type="tel"
      placeholder="e.g 9876543210"
      value={phone}
      onChange={(e)=>setPhone(e.target.value)}
      />
      <button>Send Code</button>
    </div>
  )
}