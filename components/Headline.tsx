export const Headline = ({ lines }: { lines: string[] }) => (
  <div className="flex flex-col gap-6 rtl:gap-10 text-7xl font-semibold items-center justify-center m-12 leading-tight">
    {lines.map((line, index) => (
      <p key={index}>{line}</p>
    ))}
  </div>
);
