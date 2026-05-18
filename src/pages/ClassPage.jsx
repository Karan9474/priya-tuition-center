import { useMemo } from "react";
import { useParams } from "react-router-dom";

import Card from "../components/Cards";
import GridLayout from "../components/LayoutGridMain";
import PageLayout from "../components/PageLayout";
import { classData } from "../data/ClassData";

export default function ClassPage() {
  const { id } = useParams();
  const modules = classData[id] || [];

  const classLabel = useMemo(() => `Class ${id}`, [id]);

  return (
    <PageLayout>
      <section className="fade-in">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-700">Module Library</p>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
          <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">{classLabel} Learning Modules</h1>
          <span className="rounded-full bg-cyan-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-cyan-800">
            {modules.length} modules
          </span>
        </div>
        <p className="mt-3 max-w-3xl text-slate-600">
          Pick a module to begin lesson slides. Each module is built for classroom projection and fast revision.
        </p>
      </section>

      <section className="mt-8">
        {modules.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-600">
            No modules found for this class.
          </div>
        ) : (
          <GridLayout>
            {modules.map((module, index) => (
              <Card
                key={`${module.name}-${index}`}
                title={module.name}
                subtitle={module.generator ? `${module.generator} pipeline` : "single-topic module"}
                image={module.image || "/modules/default.png"}
                link={`/class/${id}/module/${index + 1}`}
                badge={`M-${index + 1}`}
              />
            ))}
          </GridLayout>
        )}
      </section>
    </PageLayout>
  );
}
