export const Headline = ({ lines }: { lines: string[] }) => (
  <div className="flex flex-col text-center md:text-start gap-3 md:gap-6 rtl:md:gap-10 text-3xl md:text-5xl lg:text-7xl font-semibold items-center justify-center md:m-12 my-6 mx-0 leading-tight">
    {lines.map((line, index) => (
      <p key={index}>{line}</p>
    ))}
  </div>
);
