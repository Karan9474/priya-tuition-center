import Card from "../components/Cards";
import GridLayout from "../components/LayoutGridMain";

const classes = Array.from({ length: 8 }, (_, idx) => ({
  id: idx + 1,
  subtitle: idx < 2 ? "Foundation and speed-building" : "Concept strengthening",
}));

export default function LandingPage() {
  return (
    <section className="page-shell">
      <div className="page-panel soft-scroll px-5 py-6 sm:px-8 sm:py-8">
        <div className="mb-8 rounded-3xl border border-cyan-700/15 bg-[linear-gradient(135deg,rgba(8,47,73,0.95),rgba(14,116,144,0.9))] p-6 text-white shadow-xl sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-200">Smart Practice Dashboard</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-extrabold sm:text-4xl">Learning pages designed for coaching speed, clarity, and confidence</h2>
          <p className="mt-3 max-w-2xl text-cyan-100">
            Open any class to launch interactive modules with visual drills, number fluency practice, and pattern-based activities.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.14em]">
            <span className="rounded-full bg-white/15 px-4 py-2">8 classes</span>
            <span className="rounded-full bg-white/15 px-4 py-2">Activity-first</span>
            <span className="rounded-full bg-white/15 px-4 py-2">Teacher-ready flow</span>
          </div>
        </div>

        <div className="mb-5 flex items-center justify-between">
          <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">Choose a class</h1>
          <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-amber-900">
            Priya Coaching
          </span>
        </div>

        <GridLayout>
          {classes.map((cls) => (
            <Card
              key={cls.id}
              title={`Class ${cls.id}`}
              subtitle={cls.subtitle}
              image={`/classes/c${cls.id}.png`}
              link={`/class/${cls.id}`}
              badge={cls.id <= 2 ? "Beginner" : "Advanced"}
            />
          ))}
        </GridLayout>
      </div>
    </section>
  );
}
