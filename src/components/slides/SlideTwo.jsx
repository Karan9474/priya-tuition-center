import SlideBlock from "./SlideBlock";

export default function SlideTwo({ content, layout }) {
  return (
    <div className="grid h-full grid-cols-1 gap-4 md:grid-cols-2">
      <SlideBlock data={content.left} layout={layout} />
      <SlideBlock data={content.right} layout={layout} />
    </div>
  );
}
