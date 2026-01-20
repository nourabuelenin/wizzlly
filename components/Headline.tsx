export const Headline = ({ lines }: { lines: string[] }) => (
  <div className="flex flex-col text-center xl:text-start gap-3 md:gap-4 lg:gap-5 rtl:md:gap-10 text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-semibold items-center justify-center xl:m-12 my-6 mx-0 leading-tight">
    {lines.map((line, index) => (
      <p key={index}>{line}</p>
    ))}
  </div>
);
