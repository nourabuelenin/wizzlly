import Image from "next/image";
import { LocaleLink } from "./LocaleLink";
import logoImage from "@/public/images/wizlly-logo-nobg.png";
import logoLightImage from "@/public/images/wizlly-logo-light-nobg.png";

type logoProps = {
  lightMode?: boolean;
  className?: string;
};

export default function Logo({ className, lightMode }: logoProps) {
  return (
    <LocaleLink href="/">
      {lightMode ? (
        <Image
          src={logoLightImage}
          alt="Wizlly Logo"
          className={`w-28 h-28 ${className}`}
        />
      ) : (
        <Image
          src={logoImage}
          alt="Wizlly Logo"
          className={`w-28 h-28 ${className}`}
        />
      )}
    </LocaleLink>
  );
}
