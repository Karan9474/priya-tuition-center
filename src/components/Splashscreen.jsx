import { useEffect, useState } from "react";

export default function SplashScreen({ onFinish }) {
  const [exit, setExit] = useState(false);

  useEffect(() => {
    const exitTimer = setTimeout(() => setExit(true), 900);
    const finishTimer = setTimeout(() => onFinish(), 1700);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-[60] grid place-items-center bg-[radial-gradient(circle_at_20%_20%,rgba(245,158,11,0.2),transparent_36%),radial-gradient(circle_at_90%_10%,rgba(14,116,144,0.22),transparent_35%),#f6f4ef]">
      <div
        className={`flex flex-col items-center gap-4 transition-all duration-700 ${
          exit ? "scale-110 opacity-0" : "scale-100 opacity-100"
        }`}
      >
        <div className="grid h-28 w-28 place-items-center rounded-full border-4 border-cyan-700/20 bg-white shadow-[0_18px_40px_rgba(8,47,73,0.2)]">
          <img src="/logo.png" alt="Priya Tuition" className="h-20 w-20 object-contain" />
        </div>
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-800">Priya Tuition Center</p>
      </div>
    </div>
  );
}
