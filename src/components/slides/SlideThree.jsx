import SlideBlock from "./SlideBlock";

export default function SlideThree({ content, layout }) {
  return (
    <div className="grid h-full grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-3 sm:gap-5">
      <SlideBlock data={content?.left} layout={layout} />
      <div className="text-center text-4xl font-black text-cyan-800 sm:text-5xl">{content?.operator}</div>
      <SlideBlock data={content?.right} layout={layout} />
      <div className="text-center text-4xl font-black text-cyan-800 sm:text-5xl">=</div>
      <SlideBlock data={content?.showAnswer ? content?.answer : "?"} layout={content?.showAnswer ? "text" : layout} />
    </div>
  );
}
