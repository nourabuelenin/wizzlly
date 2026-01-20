import Image from "next/image";
import { LocaleLink } from "./LocaleLink";
import logoImage from "@/public/images/wizlly-logo-nobg.png";
import logoLightImage from "@/public/images/wizlly-logo-light-nobg.png";

type logoProps = {
  lightMode?: boolean;
  className?: string;
};

export default function Logo({
  className = "w-16 h-16 xl:w-22 xl:h-22",
  lightMode,
}: logoProps) {
  return (
    <LocaleLink href="/">
      <Image
        src={lightMode ? logoLightImage : logoImage}
        alt="Wizlly Logo"
        className={`${className}`}
      />
    </LocaleLink>
  );
}
