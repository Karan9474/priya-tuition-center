import { useNavigate } from "react-router-dom";

export default function PageLayout({ children }) {
  const navigate = useNavigate();

  return (
    <section className="page-shell">
      <div className="page-panel soft-scroll p-5 sm:p-6 lg:p-8">{children}</div>
      <button
        onClick={() => navigate(-1)}
        className="focus-ring fixed bottom-6 right-6 inline-flex items-center gap-2 rounded-full border border-cyan-700/20 bg-cyan-700 px-5 py-3 text-sm font-bold uppercase tracking-[0.12em] text-white shadow-xl transition hover:bg-cyan-800"
      >
        <span aria-hidden="true">?</span>
        Back
      </button>
    </section>
  );
}
