import { Link, NavLink } from "react-router-dom";

const classLinks = Array.from({ length: 8 }, (_, i) => ({
  label: `Class ${i + 1}`,
  href: `/class/${i + 1}`,
}));

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-cyan-900/15 bg-white/85 backdrop-blur-xl">
      <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link to="/" className="focus-ring flex items-center gap-3 rounded-2xl px-2 py-1 transition hover:bg-cyan-50">
          <div className="h-11 w-11 overflow-hidden rounded-full border-2 border-cyan-700/20 bg-white shadow-md">
            <img src="/logo.png" alt="Priya Tuition" className="h-full w-full object-contain p-1" />
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-700">Coaching Institute</p>
            <h1 className="text-lg font-extrabold text-slate-900 sm:text-xl">Priya Tuition Center</h1>
          </div>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `focus-ring rounded-xl px-3 py-2 text-sm font-semibold transition ${
                isActive ? "bg-cyan-700 text-white" : "text-slate-700 hover:bg-cyan-50"
              }`
            }
          >
            Home
          </NavLink>
          {classLinks.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                `focus-ring rounded-xl px-3 py-2 text-sm font-medium transition ${
                  isActive ? "bg-amber-400 text-slate-900" : "text-slate-700 hover:bg-amber-50"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <Link
          to="/"
          className="focus-ring inline-flex rounded-full border border-cyan-700/20 bg-cyan-700 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-white transition hover:bg-cyan-800 lg:hidden"
        >
          Home
        </Link>
      </nav>
    </header>
  );
}
