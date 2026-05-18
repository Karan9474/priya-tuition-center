import { Link } from "react-router-dom";

export default function Card({ title, image, link, subtitle, badge }) {
  return (
    <Link to={link} className="group fade-in block focus-ring rounded-2xl">
      <article className="relative h-full overflow-hidden rounded-2xl border border-cyan-700/15 bg-white p-4 shadow-[0_14px_26px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_38px_rgba(8,47,73,0.18)]">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-50/60 via-transparent to-amber-50/60 opacity-0 transition group-hover:opacity-100" />

        <div className="relative flex h-full flex-col">
          <div className="mb-4 flex items-start justify-between gap-2">
            {badge ? (
              <span className="rounded-full bg-cyan-100 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-cyan-800">
                {badge}
              </span>
            ) : (
              <span className="rounded-full bg-amber-100 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-amber-900">
                Module
              </span>
            )}
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-600">
              Open
            </span>
          </div>

          <div className="mb-4 grid h-24 place-items-center rounded-xl border border-slate-200 bg-gradient-to-b from-white to-slate-50">
            <img src={image} alt={title} className="h-16 w-16 object-contain transition duration-300 group-hover:scale-105" />
          </div>

          <h2 className="text-lg font-bold text-slate-900">{title}</h2>
          {subtitle && <p className="mt-1 text-sm text-slate-600">{subtitle}</p>}
        </div>
      </article>
    </Link>
  );
}
