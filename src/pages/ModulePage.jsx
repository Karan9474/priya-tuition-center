import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import PageLayout from "../components/PageLayout";
import Slide from "../components/slides/Slides";
import { classData } from "../data/ClassData";
import { generateSlides } from "../utility/slideGenerator";

export default function ModulePage() {
  const { id, moduleId } = useParams();
  const module = classData[id]?.[Number(moduleId) - 1];
  const categories = module?.config?.categories;
  const firstCategory = categories ? Object.keys(categories)[0] : null;
  const [activeCategory, setActiveCategory] = useState(firstCategory);

  const slides = useMemo(() => {
    if (!module) return [];

    const finalConfig = {
      ...module.config,
      ...(categories && activeCategory ? { activeCategory: categories[activeCategory] } : {}),
    };

    return generateSlides({ ...module, config: finalConfig });
  }, [module, categories, activeCategory]);

  if (!module) {
    return (
      <PageLayout>
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-600">
          Module not found.
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <section className="fade-in h-full flex flex-col">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-700">Interactive Classroom</p>
        <h1 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
          Class {id}: {module.name}
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Use next/previous controls to guide students through structured practice slides.
        </p>

        {categories && (
          <div className="mt-5 flex flex-wrap gap-2">
            {Object.entries(categories).map(([key, cat]) => {
              const selected = activeCategory === key;

              return (
                <button
                  key={key}
                  onClick={() => setActiveCategory(key)}
                  className={`focus-ring rounded-full px-4 py-2 text-sm font-semibold transition ${
                    selected
                      ? "bg-cyan-700 text-white shadow-lg"
                      : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        )}

        <div className="mt-5 flex-1 min-h-[540px] rounded-3xl border border-cyan-700/15 bg-[linear-gradient(180deg,#ffffff,#f8fafc)] p-4 shadow-inner sm:p-6">
          <Slide slides={slides} />
        </div>
      </section>
    </PageLayout>
  );
}
