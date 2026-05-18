import { useEffect, useState } from "react";

import McqTestSlide from "./McqTestSlide";
import SlideOne from "./SlideOne";
import SlideThree from "./SlideThree";
import SlideTwo from "./SlideTwo";

const componentMap = {
  one: SlideOne,
  two: SlideTwo,
  three: SlideThree,
  mcqTest: McqTestSlide,
};

export default function Slide({ slides }) {
  const [orderedSlides, setOrderedSlides] = useState([]);
  const [index, setIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const [autoPlay, setAutoPlay] = useState(false);
const [intervalTime, setIntervalTime] = useState(3000); // default 3 sec


useEffect(() => {
  if (!autoPlay) return;

  const timer = setInterval(() => {
    setIndex((curr) =>
      curr < orderedSlides.length - 1 ? curr + 1 : 0
    );
  }, intervalTime);

  return () => clearInterval(timer);
}, [autoPlay, intervalTime, orderedSlides.length]);
  useEffect(() => {
    setOrderedSlides(Array.isArray(slides) ? [...slides] : []);
    setIndex(0);
  }, [slides]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "ArrowRight") setIndex((curr) => Math.min(curr + 1, orderedSlides.length - 1));
      if (event.key === "ArrowLeft") setIndex((curr) => Math.max(curr - 1, 0));
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [orderedSlides.length]);

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  const current = orderedSlides[index];

  if (!current) {
    return (
      <div className="grid h-full w-full place-items-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 text-slate-600">
        No slides available for this module.
      </div>
    );
  }

  const RenderComponent = componentMap[current.type];

  if (!RenderComponent) {
    return (
      <div className="grid h-full w-full place-items-center rounded-2xl border border-dashed border-rose-300 bg-rose-50 text-rose-700">
        Invalid slide type: {current.type}
      </div>
    );
  }

  const atStart = index === 0;
  const atEnd = index === orderedSlides.length - 1;
  const isMcqSlide = current.type === "mcqTest";

  const handleFullscreenToggle = async () => {
    const container = document.getElementById("slide-player-root");
    if (!container) return;

    try {
      if (!document.fullscreenElement) {
        await container.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error("Fullscreen action failed", error);
    }
  };

  return (
    <div id="slide-player-root" className="h-full w-full">
      <div className="relative flex h-full flex-col rounded-2xl border border-cyan-700/20 bg-white p-3 shadow-[0_14px_30px_rgba(15,23,42,0.08)] sm:p-5">
        <button
          onClick={handleFullscreenToggle}
          className="focus-ring absolute right-3 top-3 z-20 inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/95 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-slate-700 hover:bg-slate-50"
          title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
        >
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M1 6V1h5M10 1h5v5M15 10v5h-5M6 15H1v-5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {isFullscreen ? "Exit" : "Full"}
        </button>

        <div className="mb-3 flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2">
          <span className="text-xs font-bold uppercase tracking-[0.14em] text-cyan-800">Slide progress</span>
          <span className="text-sm font-semibold text-slate-700">
            {index + 1} / {orderedSlides.length}
          </span>
        </div>

        <header className="mb-3 text-center">
          <h2 className="text-xl font-extrabold text-slate-900 sm:text-2xl">{current.question || "Practice"}</h2>
        </header>

        <div className="min-h-0 flex-1 overflow-hidden rounded-xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-3 sm:p-4">
          <RenderComponent content={current.content} layout={current.layout} />
        </div>

        <div className="flex items-center justify-center gap-3 mb-3">
  <input
    type="number"
    value={intervalTime / 1000}
    onChange={(e) => setIntervalTime(Number(e.target.value) * 1000)}
    className="w-20 rounded border px-2 py-1 text-center"
    min={1}
  />

  <button
    onClick={() => setAutoPlay((prev) => !prev)}
    className="bg-purple-600 text-white px-4 py-2 rounded"
  >
    {autoPlay ? "Stop Auto" : "Start Auto"}
  </button>
</div>

        {!isMcqSlide && (
          <footer className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setIndex((curr) => Math.max(curr - 1, 0))}
              disabled={atStart}
              className={`focus-ring rounded-full px-5 py-2.5 text-sm font-bold uppercase tracking-[0.1em] transition ${
                atStart
                  ? "cursor-not-allowed bg-slate-200 text-slate-500"
                  : "bg-slate-800 text-white hover:bg-slate-900"
              }`}
            >
              Prev
            </button>

            <button
              onClick={() =>
                setIndex((curr) => Math.min(curr + 1, orderedSlides.length - 1))
              }
              disabled={atEnd}
              className={`focus-ring rounded-full px-5 py-2.5 text-sm font-bold uppercase tracking-[0.1em] transition ${
                atEnd
                  ? "cursor-not-allowed bg-slate-200 text-slate-500"
                  : "bg-cyan-700 text-white hover:bg-cyan-800"
              }`}
            >
              Next
            </button>

            {current.qa && (
              <button
                onClick={() => {
                  if (current.content?.showAnswer) return;

                  setOrderedSlides((prev) => {
                    const updated = [...prev];
                    updated[index] = {
                      ...current,
                      content: {
                        ...current.content,
                        showAnswer: true,
                      },
                    };
                    return updated;
                  });
                }}
                disabled={Boolean(current.content?.showAnswer)}
                className={`focus-ring rounded-full px-5 py-2.5 text-sm font-bold uppercase tracking-[0.1em] transition ${
                  current.content?.showAnswer
                    ? "cursor-not-allowed bg-emerald-100 text-emerald-700"
                    : "bg-emerald-600 text-white hover:bg-emerald-700"
                }`}
              >
                {current.content?.showAnswer ? "Answer shown" : "Show answer"}
              </button>
            )}
          </footer>
        )}
      </div>
    </div>
  );
}
