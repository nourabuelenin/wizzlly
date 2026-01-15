import { LocaleLink } from "./LocaleLink";

type logoProps = {
  className?: string;
};

export default function Logo({ className }: logoProps) {
  return (
    <LocaleLink href="/">
      <div className={`font-semibold text-black text-3xl ${className}`}>W</div>
    </LocaleLink>
  );
}
