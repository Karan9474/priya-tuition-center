export default function GridLayout({ children, columns = "default" }) {
  const gridCols =
    columns === "compact"
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4";

  return <div className={`grid ${gridCols} gap-5 sm:gap-6`}>{children}</div>;
}
