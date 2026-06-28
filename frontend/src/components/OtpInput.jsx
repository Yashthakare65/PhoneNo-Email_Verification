import { useState, useRef } from "react";

export default function OtpInput({ onChange }) {
  const length = 6;
  const [code, setCode] = useState("");
  const refs = useRef([]);

  const handleChage = (i, raw) => {
    const digit = raw.replace(/[^0-9]/g, "").slice(-1);
    const chars = code.split("");
    chars[i] = digit;
    const newCode = chars.join("").slice(0, length);
    setCode(newCode);
    onChange?.(newCode);
    if (digit && i < length - 1) refs.current[i + 1].focus();
  };

  const handleKeyDown = (i, e) => {
    if (e.key === "Backspace" && !code[i] && i > 0) {
      refs.current[i - 1].focus();
    }
  };

  return (
    <div className="flex gap-2">
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => (refs.current[i] = el)}
          type="text"
          value={code[i] || ""}
          onChange={(e) => handleChage(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          className="w-11 h-14 text-center text-xl font-semibold text-slate-800 border-2 border-slate-300 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors"
        />
      ))}
    </div>
  );
}