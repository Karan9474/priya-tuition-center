import SlideBlock from "./SlideBlock";

export default function SlideOne({ content, layout }) {
  return (
    <div className="h-full">
      <SlideBlock data={content} layout={layout} />
    </div>
  );
}
