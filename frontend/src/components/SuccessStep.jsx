export default function SuccessStep({ phone, email }) {
  return (
    <div className="text-center">
      <h2 className="text-lg font-semibold text-slate-800 mb-1">You're verified</h2>
      <p className="text-sm text-slate-500 mb-6">Both your phone and email are confirmed.</p>

      <div className="space-y-2 text-left">
        <div className="flex items-center justify-between bg-emerald-50 rounded-lg px-4 py-3">
          <div>
            <p className="text-xs text-emerald-700">Phone verified</p>
            <p className="text-sm font-medium text-slate-700">{phone}</p>
          </div>
          <span className="text-emerald-500 text-lg">✓</span>
        </div>
        <div className="flex items-center justify-between bg-emerald-50 rounded-lg px-4 py-3">
          <div>
            <p className="text-xs text-emerald-700">Email verified</p>
            <p className="text-sm font-medium text-slate-700">{email}</p>
          </div>
          <span className="text-emerald-500 text-lg">✓</span>
        </div>
      </div>
    </div>
  );
}